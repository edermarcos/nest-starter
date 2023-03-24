import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  handleDBExceptions,
  maxPagesPerRequest,
} from '../common/helpers/index';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { PaginationDto } from 'src/common/dtos/index.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto, user: User) {
    try {
      const product = this.productRepository.create({
        ...createProductDto,
        user,
      });
      return await this.productRepository.save(product);
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async findAll(pagination: PaginationDto) {
    const { limit = maxPagesPerRequest, offset = 0 } = pagination;
    const [entities, count] = await this.productRepository.findAndCount({
      take: limit,
      skip: offset,
    });

    return {
      pagination: {
        limit,
        offset,
        pages: Math.ceil(count / limit) || 0,
      },
      entities,
    };
  }

  async findOne(id: string) {
    const entity = await this.productRepository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return entity;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const entity = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });

    if (!entity) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return await this.productRepository.save(entity);
  }

  async remove(id: string) {
    const entity = await this.findOne(id);
    return await this.productRepository.delete(entity.id);
  }
}
