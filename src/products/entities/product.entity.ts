import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
  })
  name: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'float',
  })
  price: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  image: string;

  @Column({
    type: 'int',
    default: 1,
  })
  stock: number;

  @ManyToOne(() => User, (user) => user.products, { eager: true })
  user: User;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true,
  })
  updatedAt: Date;

  beforeUpdate() {
    this.updatedAt = new Date();
  }
}
