import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './products.entity';
import { Category } from '../category/categories.entity';
import * as data from '../utils/data.json';
import { ProductDto } from 'src/dtos/product.dto';

@Injectable()
export class ProductsRepository {


  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getProducts(){
    try{
      return this.productsRepository.find({ relations: ['category'] });
    }catch (error) {
      throw new InternalServerErrorException('Error al obtener los productos.');
    }
  }

  async getProductByCategory(name: string) {
    try{
      const productByCategory = await this.productsRepository.find({ relations: ['category']});
      const product = productByCategory.filter((produc)=> produc.category.name===name)
      return product;

    }catch (error) {
      throw new InternalServerErrorException('Error traer los productos');
    }
  }

  async addProducts() {
    try{
      const categories = await this.categoriesRepository.find();
      
      for (const element of data) {
        const category = categories.find(
          (category) => category.name === element.category,
        );

        if (!category) {
          throw new BadRequestException(`Categoría ${element.category} no encontrada`);
        }
    
        const product = new Product();
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        product.imgUrl = element.imgUrl;
        product.stock = element.stock;
        product.category = category;
    
        await this.productsRepository
        .createQueryBuilder()
          .insert()
          .into(Product)
          .values(product)
          .orUpdate(['description', 'price', 'imgUrl'], ['name']) 
          .execute();
      }
      return 'Productos agregados';
    }catch (error) {
      throw new InternalServerErrorException('Error al agregar los productos.');
    }
  }

  async updateProductImage(productId: string, secureUrl: string): Promise<void> {
    try {
      const product = await this.productsRepository.findOne({
        where: { id: productId },
      });
  
      if (!product) {
        throw new NotFoundException(`Producto con id ${productId} no existe.`);
      }
      
      product.imgUrl = secureUrl;
      await this.productsRepository.save(product);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; 
      }
      throw new InternalServerErrorException('Error al actualizar la imagen del producto.');
    }
  }

async updateProduct(id: string, productDto) {
  try{
    const productExist = await this.productsRepository.findOne({
      where: { id: id },
    });
    if (!productExist) {
      throw new NotFoundException(`Producto con id ${id} no encontrado.`);
    }
      const { imgUrl, ...product } = productDto;
      await this.productsRepository.update(id,product);
      return 'El producto fue actualizado con exito'
    }catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al actualizar el producto.');
    }
  }
  

  async deleteProduct(id: string) {
    try{
      const productExist = await this.productsRepository.findOne({
        where: { id: id },
      });
      if (!productExist) {
        throw new NotFoundException(`Producto con id ${id} no encontrado.`);
      }
        await this.productsRepository.delete(id);
        return { message: 'El producto se eliminó con exito' };
    }catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al eliminar el producto.');
    }
  }

  async createProduct(product: ProductDto) {
    try {
      const productExist = await this.productsRepository.findOne({
        where: {
          name: product.name,
        },
      });
      if (!productExist) {
        const categoryExist = await this.categoriesRepository.findOne({where: {
          name: product.category
        }})
        if (categoryExist){
          const productToSave: Partial<Product> = {
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            category: categoryExist
          }
          return await this.productsRepository.save(productToSave)
      }
    }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al crear el producto.');
    }
  }
}





  

