import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Notification } from '../../libs/dto/notification/notification';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { NotificationInput } from '../../libs/dto/notification/notification.input';

@Resolver()
export class NotificationResolver {
	constructor(private readonly notificationService: NotificationService) {}
}
