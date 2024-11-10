import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from '../dtos/createOrder.dto'; 

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async getOrder(orderId: string) {
    return this.ordersRepository.getOrder(orderId);
  }

  async addOrder(createOrderDto: CreateOrderDto) {
    return this.ordersRepository.addOrder(createOrderDto.userId, createOrderDto.products);
  }


}
