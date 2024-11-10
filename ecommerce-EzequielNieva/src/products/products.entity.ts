import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Category } from '../category/categories.entity';
import { OrderDetail } from '../order/order-detail.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50,unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
  
  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar', nullable: true })
  imgUrl: string = 'default-image-url';

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  @JoinTable()
  orderDetails: OrderDetail[];
}
