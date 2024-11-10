import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { CloudinaryConfig } from '../config/cloudirary'; 
import { Product } from 'src/products/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from 'src/products/products.respository';
import { CategoriesRepository } from 'src/category/categories.repository';
import { Category } from 'src/category/categories.entity';
import { FilesRepository } from './files.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Product,Category])],
  providers: [FilesService,FilesRepository, CloudinaryConfig,ProductsRepository,CategoriesRepository],
  controllers: [FilesController],
})
export class FilesModule {}
