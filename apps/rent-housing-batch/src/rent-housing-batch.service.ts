import { Injectable } from '@nestjs/common';

@Injectable()
export class RentHousingBatchService {
	getHello(): string {
		return 'Welcome to rent-housing Batch API server!';
	}
}
