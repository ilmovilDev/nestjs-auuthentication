import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DEFAULT_PORT } from './common/constants/default-port';

async function bootstrap() {

    const { PORT } = process.env;

    const app = await NestFactory.create(AppModule);

    const logger = new Logger('Bootstrap');

    app.setGlobalPrefix('api/v1');

    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
        enableImplicitConversion: true,
        }
    }));
    
    const config = new DocumentBuilder()
        .setTitle('AUTH API')
        .setDescription('AUTH, Application for user authentication.')
        .setVersion('0.0.1')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
    
    await app.listen( PORT || DEFAULT_PORT );
    logger.log(`App running on port ${ process.env.PORT }`);
}
bootstrap();
