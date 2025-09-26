import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

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

    app.useGlobalPipes(new ValidationPipe())

    await app.listen(PORT, () => console.log(`server started on port ${PORT}`));
}
bootstrap();
