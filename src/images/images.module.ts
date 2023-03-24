import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { UsersModule } from 'src/users/users.module';
import { Image } from './entities/image.entity';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService],
  imports: [TypeOrmModule.forFeature([Image]), UsersModule],
})
export class ImagesModule {}
