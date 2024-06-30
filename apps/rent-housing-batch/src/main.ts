import { NestFactory } from '@nestjs/core';
import { RentHousingBatchModule } from './rent-housing-batch.module';

async function bootstrap() {
  const app = await NestFactory.create(RentHousingBatchModule);
  await app.listen(process.env.PORT_BATCH);
}
bootstrap();
