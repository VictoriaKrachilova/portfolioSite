import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import multer from 'multer';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './common/filters/logging-interceptor';
import { TransformResponseInterceptor } from './common/filters/transforme-response-interceptor';

async function bootstrap() {
    const PORT = process.env.PORT|| 5000;
    const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

    const config =  new DocumentBuilder()
        .addBearerAuth()
        .setTitle('Portfolio Site')
        .setDescription('REST API documentation for portfolio publication site')
        .setVersion('1.0.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document)

    // const upload = multer();
    // app.use(upload.any());

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true
        }),
    );

    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalInterceptors(new TransformResponseInterceptor());
    app.useGlobalInterceptors(new LoggingInterceptor());

    await app.listen(PORT, () => console.log(`server started on port ${PORT}`));
}
bootstrap();
