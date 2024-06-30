import { Module } from '@nestjs/common';
import { RentHousingBatchController } from './rent-housing-batch.controller';
import { RentHousingBatchService } from './rent-housing-batch.service';

@Module({
  imports: [],
  controllers: [RentHousingBatchController],
  providers: [RentHousingBatchService],
})
export class RentHousingBatchModule {}
