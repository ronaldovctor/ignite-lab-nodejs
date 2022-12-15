import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from '@application/entities/use-cases/send-notificatoin';
import { CreateNotificationBody } from '../dtos/create-notification.body';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@application/entities/use-cases/cancel-notification';
import { ReadNotification } from '@application/entities/use-cases/read-notification';
import { UnreadNotification } from '@application/entities/use-cases/unread-notification';
import { CountRecipientNotifications } from '@application/entities/use-cases/count-recipient.notifications';
import { GetRecipientNotifications } from '@application/entities/use-cases/get-recipient-notifications';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNofitications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const { count } = await this.countRecipientNofitications.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });

    const raw = NotificationViewModel.toHTTP(notification);

    return { notification: raw };
  }
}
