import { Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('seeder')
   seedCategories() {
    return  this.categoriesService.addCategories();
  }

  @Get()
  getCategories() {
   return  this.categoriesService.getCategories();
 }

}
