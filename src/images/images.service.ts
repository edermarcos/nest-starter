import { handleDBExceptions } from 'src/common/helpers';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateImageDto } from './dto/create-image.dto';
import { Image } from './entities/image.entity';
import { join } from 'path';
import { existsSync } from 'fs';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async create(createImageDto: CreateImageDto) {
    try {
      const image = this.imageRepository.create(createImageDto);
      return await this.imageRepository.save(image);
    } catch (error) {
      handleDBExceptions(error);
    }

    return {};
  }

  async findAll() {
    return this.imageRepository.find();
  }

  async findOne(id: string) {
    const entity = await this.imageRepository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException(`Image with id ${id} not found`);
    }

    return entity;
  }

  async remove(id: string) {
    const entity = await this.findOne(id);
    const result = await this.imageRepository.delete(entity.id);
    return result.affected > 0;
  }

  getPathImage(imageName: string): string {
    const path = join(__dirname, '..', '..', 'static', 'images', imageName);

    if (!existsSync(path)) {
      throw new NotFoundException('Image not found');
    }

    return path;
  }
}
