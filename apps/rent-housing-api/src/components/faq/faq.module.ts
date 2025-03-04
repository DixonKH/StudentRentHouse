import { Module } from '@nestjs/common';
import { FaqResolver } from './faq.resolver';
import { FaqService } from './faq.service';
import { MongooseModule } from '@nestjs/mongoose';
import FaqSchema from '../../schemas/Faq.model';
import { AuthModule } from '../auth/auth.module';
import { ViewModule } from '../view/view.module';
import { MemberModule } from '../member/member.module';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Faq', schema: FaqSchema }]),
		AuthModule,
		ViewModule,
		MemberModule, //
	],
	providers: [FaqResolver, FaqService],
	exports: [FaqService],
})
export class FaqModule {}
