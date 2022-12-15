import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../../test/repositories/in-memory-notifications.repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipients notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const countRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await countRecipientNotifications.execute({
      recipientId: 'example-recipient-id',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'example-recipient-id' }),
        expect.objectContaining({ recipientId: 'example-recipient-id' }),
      ]),
    );
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
