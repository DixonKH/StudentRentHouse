import { IsNotEmpty, IsOptional } from 'class-validator';

import { NotificationStatus } from '../../enums/notification.enum';
import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class NotificationUpdate {
	@IsNotEmpty()
	@Field(() => String)
	_id: string;

	@IsOptional()
	@Field(() => NotificationStatus, { nullable: true })
	notificationStatus?: NotificationStatus;
}
