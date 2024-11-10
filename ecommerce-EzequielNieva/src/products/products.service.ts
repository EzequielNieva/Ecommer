import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.respository';
import { Product } from './products.entity';
import { ProductDto } from 'src/dtos/product.dto';

@Injectable()
export class ProductsService {

  constructor(private readonly productsRepository: ProductsRepository) {}
  
  addProducts() {
    return this.productsRepository.addProducts();
  }
  
   getProducts() {
    return this.productsRepository.getProducts();
  }
  
  updateProduct(id:string,productDto:ProductDto) {
    return  this.productsRepository.updateProduct(id,productDto);
  }
  
  deleteProduct(id: string) {
   return this.productsRepository.deleteProduct(id);
  }

  createProduct(product: ProductDto) {
    return this.productsRepository.createProduct(product);
  }

  getProductsByCategory(name: string) {
    return this.productsRepository.getProductByCategory(name)
  }
  
}
