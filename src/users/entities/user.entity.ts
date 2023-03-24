import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'John' })
  @Column({
    type: 'text',
  })
  name: string;

  @ApiProperty({ example: 'Doe' })
  @Column({
    type: 'text',
    name: 'last_name',
  })
  lastName: string;

  @ApiProperty({ example: 'user@gmail.com' })
  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @ApiProperty({ example: '86D8!IltUj6v' })
  @Column({
    type: 'text',
    select: false,
  })
  password: string;

  @Column({
    default: true,
    name: 'is_active',
  })
  isActive: boolean;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @Column({
    type: 'text',
    array: true,
    default: ['user'],
  })
  roles: string[];

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true,
  })
  updatedAt: Date;
}
