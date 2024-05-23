/* istanbul ignore file */

import compression from '@fastify/compress';
import helmet from '@fastify/helmet';
import { fastifyRequestContext } from '@fastify/request-context';
import {
  ClassSerializerInterceptor,
  INestApplication,
  Logger,
  LogLevel,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { PROJECT_DESCRIPTION, PROJECT_NAME, PROJECT_VERSION } from './config';
import HttpExceptionFilter from './infrastructure/exceptions/http-exception.filter';

const DEFAULT_PORT = 3000;
const DEFAULT_API_PREFIX = '/api';
const DEFAULT_API_VERSION = '1';
const DEFAULT_SWAGGER_PREFIX = '/docs';
const DEFAULT_BOOTSTRAP_LOG_LEVEL = 'error';

/**
 * Setup the Swagger (UI).
 * @param app
 */
export const setupSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle(PROJECT_NAME)
    .setDescription(PROJECT_DESCRIPTION)
    .setVersion(PROJECT_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  const path = process.env.SWAGGER_PREFIX || DEFAULT_SWAGGER_PREFIX;

  SwaggerModule.setup(path, app, document);
};

/**
 * Bootstrap the app.
 */
async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const fastifyAdapter = new FastifyAdapter({
    ignoreTrailingSlash: true,
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
    {
      logger: [
        (process.env.LOG_LEVEL || DEFAULT_BOOTSTRAP_LOG_LEVEL) as LogLevel,
      ],
      abortOnError: false,
    },
  );

  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: process.env.API_VERSION || DEFAULT_API_VERSION,
  });

  app.setGlobalPrefix(process.env.API_PREFIX || DEFAULT_API_PREFIX);

  setupSwagger(app);

  app.register(fastifyRequestContext);

  app.register(compression);
  app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: true,
    }),
  );
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get<Reflector>(Reflector)),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT || DEFAULT_PORT, '0.0.0.0');
  logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
