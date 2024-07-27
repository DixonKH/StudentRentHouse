import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Faq } from '../../libs/dto/faq/faq';
import { MemberService } from '../member/member.service';
import { ViewService } from '../view/view.service';

@Injectable()
export class FaqService {
	constructor(
		@InjectModel('Faq') private readonly faqModel: Model<Faq>,
		private readonly memberService: MemberService,
		private viewService: ViewService,
	) {}
}
