import { Module } from '@nestjs/common';
import { SendNotification } from '@application/entities/use-cases/send-notificatoin';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';
import { CancelNotification } from '@application/entities/use-cases/cancel-notification';
import { CountRecipientNotifications } from '@application/entities/use-cases/count-recipient.notifications';
import { GetRecipientNotifications } from '@application/entities/use-cases/get-recipient-notifications';
import { ReadNotification } from '@application/entities/use-cases/read-notification';
import { UnreadNotification } from '@application/entities/use-cases/unread-notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
