import { handleDBExceptions } from 'src/common/helpers';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateImageDto } from './dto/create-image.dto';
import { Image } from './entities/image.entity';

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
    return this.imageRepository.findOneBy({ id });
  }

  async remove(id: string) {
    return this.imageRepository.delete(id);
  }
}
