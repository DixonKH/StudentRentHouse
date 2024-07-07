import { Controller, Get, Logger } from '@nestjs/common';
import { RentHousingBatchService } from './rent-housing-batch.service';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { BATCH_ROLLBACK, BATCH_TOP_AGENTS, BATCH_TOP_PROPERTIES } from './lib/config';

@Controller()
export class RentHousingBatchController {
	private logger: Logger = new Logger('BatchController');
	constructor(private readonly rentHousingBatchService: RentHousingBatchService) {}

	@Timeout(1000)
	handleTimeout() {
		this.logger.debug('BATCH SERVER READY!');
	}

	@Cron('00 00 01 * * *', { name: BATCH_ROLLBACK })
	public async batchRollback() {
		try {
			this.logger['context'] = BATCH_ROLLBACK;
			this.logger.debug('EXECUTED');
			await this.rentHousingBatchService.batchRollback();
		} catch (err) {
			this.logger.error(err);
		}
	}

	@Cron('20 00 01 * * *', { name: BATCH_TOP_PROPERTIES })
	public async batchTopProperties() {
		try {
			this.logger['context'] = BATCH_TOP_PROPERTIES;
			this.logger.debug('EXECUTED');
			await this.rentHousingBatchService.batchTopProperties();
		} catch (err) {
			this.logger.error(err);
		}
	}

	@Cron('40 00 01 * * *', { name: BATCH_TOP_AGENTS })
	public async batchTopAgents() {
		try {
			this.logger['context'] = BATCH_TOP_AGENTS;
			this.logger.debug('EXECUTED');
			await this.rentHousingBatchService.batchTopAgents();
		} catch (err) {
			this.logger.error(err);
		}
	}

	/* 
	@Interval(1000)
	handleInterval() {
		this.logger.debug(`INTERNAL TEST`);
	}
	*/

	@Get()
	getHello(): string {
		return this.rentHousingBatchService.getHello();
	}
}
