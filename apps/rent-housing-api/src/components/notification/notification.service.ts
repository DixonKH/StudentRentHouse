import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from '../../libs/dto/notification/notification';
import { Model, ObjectId } from 'mongoose';
import { NotificationInput } from '../../libs/dto/notification/notification.input';
import { T } from '../../libs/types/common';
import { NotificationStatus } from '../../libs/enums/notification.enum';

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

	public async getNotification(memberId: ObjectId, notificationId: ObjectId): Promise<Notification> {
		const search: T = {
			_id: notificationId,
			notificationStatus: NotificationStatus.WAIT,
		};
		const notification = await this.notificationModel.findOne(search).exec();
		if (!notification) {
			throw new NotFoundException('Notification not found');
		}
		return notification;
	}
}
