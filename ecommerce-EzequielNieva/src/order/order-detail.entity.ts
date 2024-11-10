import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToMany } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../products/products.entity';

@Entity('order_details')
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToOne(() => Order, (order) => order.orderDetail)
  order: Order;

  @ManyToMany(() => Product, (product) => product.orderDetails)
  products: Product[];
  
}
