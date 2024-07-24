import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Message } from '../../libs/dto/message/message';
import { MessageInput } from '../../libs/dto/message/message.input';
import { NotificationService } from '../notification/notification.service';
import { NotificationGroup, NotificationType } from '../../libs/enums/notification.enum';

@Injectable()
export class MessageService {
	constructor(
		@InjectModel('Message') private readonly messageModel: Model<Message>,
		private readonly notificationService: NotificationService,
	) {}

	public async createMessage(memberId: ObjectId, input: MessageInput): Promise<Message> {
		try {
			const message = await this.messageModel.create(input);
			await this.notificationService.createNotification(memberId, {
				notificationType: NotificationType.MESSAGE,
				notificationGroup: NotificationGroup.MESSAGE,
				notificationTitle: 'New Message',
				notificationDesc: `You have a new message from ${memberId}`,
				authorId: memberId,
				receiverId: input.messageRefId,
				messageId: message._id,
			});
			return message;
		} catch (error) {
			throw new InternalServerErrorException('Message creation failed');
		}
	}
}
