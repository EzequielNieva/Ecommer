import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.respository';
import { CategoriesRepository } from 'src/category/categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Category } from 'src/category/categories.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category]), 
  ],
  providers: [ProductsService, ProductsRepository, CategoriesRepository],
  controllers: [ProductsController],
})
export class ProductsModule {}
