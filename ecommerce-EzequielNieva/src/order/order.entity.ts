import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { OrderDetail } from './order-detail.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column({ type: 'date' })
  date: Date;

  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
  @JoinColumn()
  orderDetail: OrderDetail;
}
