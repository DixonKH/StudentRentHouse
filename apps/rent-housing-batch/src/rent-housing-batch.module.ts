import { Module } from '@nestjs/common';
import { RentHousingBatchController } from './rent-housing-batch.controller';
import { RentHousingBatchService } from './rent-housing-batch.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
	imports: [ConfigModule.forRoot(), DatabaseModule, ScheduleModule.forRoot()],
	controllers: [RentHousingBatchController],
	providers: [RentHousingBatchService],
})
export class RentHousingBatchModule {}
