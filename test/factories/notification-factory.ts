import { Content } from '@application/entities/entities/content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    content: new Content('Notification Content.'),
    category: 'Undefined',
    recipientId: 'example-recipient-id',
    ...override,
  });
}
