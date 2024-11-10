import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { rutasMiddleware } from './middleware/middleware.rutas';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  });  
  app.useGlobalPipes(new ValidationPipe({whitelist:true,forbidNonWhitelisted: true,transform: true,}))
  app.use(rutasMiddleware);
  const swaggerConfig= new DocumentBuilder().setTitle('API Ecommers').setDescription('Realizado con Nest').setVersion('1.0').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app,swaggerConfig);
  SwaggerModule.setup('api',app,document);
  await app.listen(3000);
}
bootstrap();
