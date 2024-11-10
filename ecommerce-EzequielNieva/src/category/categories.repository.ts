import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './categories.entity';
import * as data from '../utils/data.json';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getCategories(){
    try{
      return await this.categoriesRepository.find();
    }catch (error) {
      throw new InternalServerErrorException('Error al obtener las categorías');
    }
  }

  async addCategories() {
    try{
      for (const element of data) {
        await this.categoriesRepository
          .createQueryBuilder()
          .insert()
          .into(Category)
          .values({ name: element.category })
          .orIgnore()  
          .execute();
      }
      return 'Categorías agregadas';
    }catch (error) {
      throw new InternalServerErrorException('Error al agregar las categorías');
    }
  }
  
}
