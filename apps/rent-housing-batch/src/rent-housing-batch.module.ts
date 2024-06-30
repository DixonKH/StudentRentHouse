import { Module } from '@nestjs/common';
import { RentHousingBatchController } from './rent-housing-batch.controller';
import { RentHousingBatchService } from './rent-housing-batch.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [RentHousingBatchController],
  providers: [RentHousingBatchService],
})
export class RentHousingBatchModule {}
