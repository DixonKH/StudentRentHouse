import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from '../../libs/dto/notification/notification';
import { Model, ObjectId } from 'mongoose';
import { NotificationInput } from '../../libs/dto/notification/notification.input';

@Injectable()
export class NotificationService {
	constructor(@InjectModel('Notification') private readonly notificationModel: Model<Notification>) {}

	public async createNotification(memberId: ObjectId, input: NotificationInput): Promise<Notification> {
		try {
			const result = await this.notificationModel.create(input);
			return result;
		} catch (err) {
			console.error(err);
			throw new Error('Failed to create notification');
		}
	}
}
