import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { MemberService } from '../member/member.service';
import { PropertyService } from '../property/property.service';
import { BoardArticleService } from '../board-article/board-article.service';
import { CommentInput, CommentsInquiry } from '../../libs/dto/comment/comment.input';
import { Direction, Message } from '../../libs/enums/common.enum';
import { CommentGroup, CommentStatus } from '../../libs/enums/comment.enum';
import { Comments, Comment } from '../../libs/dto/comment/comment';
import { CommentUpdate } from '../../libs/dto/comment/comment.update';
import { T } from '../../libs/types/common';
import { lookupMember } from '../../libs/config';
import { NotificationService } from '../notification/notification.service';
import { NotificationGroup, NotificationType } from '../../libs/enums/notification.enum';
import { Property } from '../../libs/dto/property/property';
import { BoardArticle } from '../../libs/dto/board-article/board-article';

@Injectable()
export class CommentService {
	constructor(
		@InjectModel('Comment') private readonly commentModel: Model<Comment>,
		@InjectModel('Property') private readonly propertyModel: Model<Property>,
		@InjectModel('BoardArticle') private readonly boardArticleModel: Model<BoardArticle>,
		private readonly memberService: MemberService,
		private readonly propertyService: PropertyService,
		private readonly boardArticleService: BoardArticleService,
		private readonly notificationService: NotificationService,
	) {}

	public async createComment(memberId: ObjectId, input: CommentInput): Promise<Comment> {
		input.memberId = memberId;

		let result = null;
		try {
			result = await this.commentModel.create(input);
		} catch (err) {
			console.log('Error Service.model Signup: ', err.message);
			throw new InternalServerErrorException(Message.CREATE_FAILED);
		}

		switch (input.commentGroup) {
			case CommentGroup.PROPERTY:
				const property = await this.propertyModel.findById(input.commentRefId);
				if (!property) throw new InternalServerErrorException('Property not found');
				await this.propertyService.propertyStatsEditor({
					_id: input.commentRefId,
					targetKey: 'propertyComments',
					modifier: 1,
				});

				await this.notificationService.createNotification(memberId, {
					notificationType: NotificationType.COMMENT,
					notificationGroup: NotificationGroup.PROPERTY,
					notificationTitle: 'New Comment for your Properties!',
					notificationDesc: `You have a new comment from ${memberId} `,
					authorId: memberId,
					receiverId: property.memberId,
					propertyId: input.commentRefId,
					articleId: undefined,
				});

				break;
			case CommentGroup.ARTICLE:
				const article = await this.boardArticleModel.findById(input.commentRefId);
				if (!article) throw new InternalServerErrorException('Article not found');
				await this.boardArticleService.boardArticleStatsEditor({
					_id: input.commentRefId,
					targetKey: 'articleComments',
					modifier: 1,
				});
				await this.notificationService.createNotification(memberId, {
					notificationType: NotificationType.COMMENT,
					notificationGroup: NotificationGroup.ARTICLE,
					notificationTitle: 'New Comment for your Articles!',
					notificationDesc: `You have a new comment from ${memberId} `,
					authorId: memberId,
					receiverId: article.memberId,
					propertyId: undefined,
					articleId: input.commentRefId,
				});
				break;
			case CommentGroup.MEMBER:
				await this.memberService.memeberStatsEditor({
					_id: input.commentRefId,
					targetKey: 'memberComments',
					modifier: 1,
				});

				await this.notificationService.createNotification(memberId, {
					notificationType: NotificationType.COMMENT,
					notificationGroup: NotificationGroup.MEMBER,
					notificationTitle: 'New Comment for you',
					notificationDesc: `You have a new comment from ${memberId} `,
					authorId: memberId,
					receiverId: input.commentRefId,
					propertyId: undefined,
					articleId: undefined,
				});
				break;
		}

		// create a notification
		// await this.notificationService.createNotification(memberId, {
		// 	notificationType: NotificationType.COMMENT,
		// 	notificationGroup: NotificationGroup.MEMBER,
		// 	notificationTitle: 'New Comment',
		// 	notificationDesc: `You have a new comment from ${memberId} `,
		// 	authorId: memberId,
		// 	receiverId: input.commentRefId,
		// 	propertyId: input.commentGroup === CommentGroup.PROPERTY ? input.commentRefId : undefined,
		// 	articleId: input.commentGroup === CommentGroup.ARTICLE ? input.commentRefId : undefined,
		// });

		if (!result) throw new InternalServerErrorException(Message.CREATE_FAILED);
		return result;
	}

	public async updateComment(memberId: ObjectId, input: CommentUpdate): Promise<Comment> {
		const { _id } = input;
		const result = await this.commentModel
			.findOneAndUpdate({ _id: _id, memberId: memberId, commentStatus: CommentStatus.ACTIVE }, input, { new: true })
			.exec();
		if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);
		return result;
	}

	public async getComments(memberId: ObjectId, input: CommentsInquiry): Promise<Comments> {
		const { commentRefId } = input.search;
		const match: T = { commentRefId: commentRefId, commentStatus: CommentStatus.ACTIVE };
		const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };

		const result: Comments[] = await this.commentModel
			.aggregate([
				{ $match: match },
				{ $sort: sort },
				{
					$facet: {
						list: [
							{ $skip: (input.page - 1) * input.limit },
							{ $limit: input.limit },
							//meLiked
							lookupMember,
							{ $unwind: '$memberData' },
						],
						metaCounter: [{ $count: 'total' }],
					},
				},
			])
			.exec();
		if (!result.length) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
		return result[0];
	}

	public async removeCommentByAdmin(input: ObjectId): Promise<Comment> {
		const result = await this.commentModel.findOneAndDelete(input).exec();
		if (!result) throw new InternalServerErrorException(Message.REMOVE_FAILED);
		return result;
	}
}
