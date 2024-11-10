import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Order } from './order.entity';
import { User } from '../users/users.entity';
import { Product } from '../products/products.entity';
import { OrderDetail } from './order-detail.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(OrderDetail)
    private orderDetailsRepository: Repository<OrderDetail>,
  ) {}

  async getOrder(orderId: string): Promise<Order> {
    try{
      const order = await this.ordersRepository.findOne({
        where: { id: orderId },
        relations: ['orderDetail', 'orderDetail.products', 'user'],
      });
  
      if (!order) {
        throw new NotFoundException(`Orden con id ${orderId} no encontrada`);
      }

      if (order.user) {
        delete order.user.password;
        delete order.user.isAdmin;
      }
      
      return order;
    }catch (error) {
      throw new InternalServerErrorException('Error al obtener la orden.');
    }
  }

  async addOrder(userId: string, products: { id: string }[]): Promise<Order> {
    try {
     
      const user = await this.usersRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
  
      let totalPrice: number = 0;
      const selectedProducts = [];
     
      for (const productData of products) {
        
        const product = await this.productsRepository.findOne({
          where: { id: productData.id, stock: MoreThan(0) },
        });
  
        if (!product) {
         
          
          throw new NotFoundException(`Producto con id ${productData.id} no existe o no tiene stock`);
        }
        
        const price = parseFloat(product.price.toString());
        if (isNaN(price)) {
          console.error(`Precio del producto ${productData.id} es inválido:`, product.price);
          throw new BadRequestException(`El precio del producto ${productData.id} no es un número válido`);
        }
  
        selectedProducts.push(product);
       
        totalPrice += price;
  
        product.stock -= 1;
        await this.productsRepository.save(product);
      }
  
     
      if (typeof totalPrice !== 'number' || isNaN(totalPrice)) {
        console.error('totalPrice es inválido:', totalPrice);
        throw new BadRequestException('El precio total no es un número válido');
      }
  
      const formattedTotalPrice = parseFloat(totalPrice.toFixed(2));
  
      const orderDetail = this.orderDetailsRepository.create({
        products: selectedProducts, 
        price: formattedTotalPrice,
      });
      await this.orderDetailsRepository.save(orderDetail);
  
      const order = this.ordersRepository.create({
        user,
        date: new Date(),
        orderDetail,
      });
  
      return await this.ordersRepository.save(order);
  
    } catch (error) {
      
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      
      throw new InternalServerErrorException('Error al procesar la orden.');
    }
  }


  
  }
  
  

