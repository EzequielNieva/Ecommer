import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { CategoriesModule } from './category/categories.module';
import { OrdersModule } from './order/orders.module';
import { FilesModule } from './files/files.module';
import { JwtModule } from '@nestjs/jwt';
import {config as dotenvConfig} from "dotenv";


dotenvConfig({path : ".env"})

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    load:[typeOrmConfig]
  }),
  TypeOrmModule.forRootAsync({
    inject:[ConfigService],
    useFactory:(configService:ConfigService)=>configService.get("typeorm")}),
    
    AuthModule, ProductsModule, UsersModule, CategoriesModule,ProductsModule,OrdersModule,FilesModule,JwtModule.register({global:true,signOptions:{expiresIn:'1h'},secret: process.env.JWT_SECRET,})],
  controllers: [],
  providers: [],
})
export class AppModule {}
