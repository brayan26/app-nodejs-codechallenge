import config from '@app/config';
import { AppModule } from '@context/shared/infrastructure/modules/app.module';
import { AllExceptionsFilter } from '@context/shared/infrastructure/modules/middleware/error.middleware';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';

async function init() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new AllExceptionsFilter(httpAdapter as unknown as HttpAdapterHost),
  );
  await app.listen(config.PORT);
}
init();
