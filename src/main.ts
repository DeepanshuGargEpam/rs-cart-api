import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import helmet from 'helmet';

import { AppModule } from './app.module';
// import { setupSwagger } from './swagger';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (_, callback) => callback(null, true),
  });
  app.use(helmet());

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  // TODO: setupSwagger(app);

  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  // TODO: event.path normalization for swagger
  // if (event.path === '/api') event.path = '/api/';
  // event.path = event.path.includes('swagger-ui')
  //   ? `/api${event.path}`
  //   : event.path;

  server = server ?? (await bootstrap());

  return server(event, context, callback);
};
