import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import useConfiguration from './config/configuration';

const DEFAULT_CORS_OPTIONS = {
  origin: ['http://localhost:3000'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const { application, cors } = useConfiguration();
const { origin, delimiter, ...others } = cors;
const corsOptions = Object.assign({}, DEFAULT_CORS_OPTIONS, others, {
  origin: origin.split(delimiter),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  app.use(helmet());
  app.setGlobalPrefix(application.apiPrefix);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle(application.name)
    .setDescription(application.description)
    .setVersion(application.version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('_docs', app, document);

  await app.listen(application.port);
}
bootstrap();
