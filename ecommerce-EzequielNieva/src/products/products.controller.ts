import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards, UsePipes } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Product } from './products.entity';
import { ProductDto } from 'src/dtos/product.dto';
import { Roles } from 'src/decorators/role.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/enums/role.enum';


@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('seeder')
    seedProducts() {
    return this.productsService.addProducts();
  }

  @Get('/category')
  getProductByCategory(@Query('name')name:string){
    return this.productsService.getProductsByCategory(name);
  }

  @Get()
    getProducts() {
    return this.productsService.getProducts();
  }

  @ApiBearerAuth()
  @ApiBody({type: ProductDto})
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(@Param('id', ParseUUIDPipe) id: string,@Body() productDto:ProductDto) {
    const ProductUpdated = this.productsService.updateProduct(
      id,
      productDto,
    );
    return ProductUpdated;
  }

  @ApiBearerAuth()
  @ApiBody({type: ProductDto})
  @Post()
  @UseGuards(AuthGuard)
  createProduct(@Body() product:ProductDto){
    return this.productsService.createProduct(product);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteProduct(@Param('id', ParseUUIDPipe) id: string){
    return this.productsService.deleteProduct(id);
  }
}
