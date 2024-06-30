import { Controller, Get } from '@nestjs/common';
import { RentHousingBatchService } from './rent-housing-batch.service';

@Controller()
export class RentHousingBatchController {
  constructor(private readonly rentHousingBatchService: RentHousingBatchService) {}

  @Get()
  getHello(): string {
    return this.rentHousingBatchService.getHello();
  }
}
