import { Module } from '@nestjs/common';
import { RentHousingBatchController } from './rent-housing-batch.controller';
import { RentHousingBatchService } from './rent-housing-batch.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import PropertySchema from 'apps/rent-housing-api/src/schemas/Property.model';
import MemberSchema from 'apps/rent-housing-api/src/schemas/Member.model';

@Module({
	imports: [
		ConfigModule.forRoot(),
		DatabaseModule,
		ScheduleModule.forRoot(),
		MongooseModule.forFeature([{ name: 'Property', schema: PropertySchema }]),
		MongooseModule.forFeature([{ name: 'Member', schema: MemberSchema }]),
	],
	controllers: [RentHousingBatchController],
	providers: [RentHousingBatchService],
})
export class RentHousingBatchModule {}
