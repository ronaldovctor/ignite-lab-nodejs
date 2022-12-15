import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../../test/repositories/in-memory-notifications.repository';
import { CancelNotification } from './cancel-notification';
import { CountRecipientNotifications } from './count-recipient.notifications';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Count recipients notifications', () => {
  it('should be able to coutn recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'example-recipient-id' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'example-recipient-id' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'example-recipient-id-2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'example-recipient-id',
    });

    expect(count).toEqual(2);
  });

  it('should not be able to cancel a notification when it does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
