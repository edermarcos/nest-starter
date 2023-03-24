import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Res,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';

import { ImagesService } from './images.service';
import { fileNamer, imageFilter } from 'src/common/helpers';
import { ValidRoles } from 'src/users/interfaces';
import { Auth } from 'src/users/decorators';

@ApiBearerAuth()
@Auth(ValidRoles.user)
@ApiTags('Images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: imageFilter,
      limits: { fileSize: 1024 * 1024 * 2 },
      storage: diskStorage({
        destination: './static/images',
        filename: fileNamer,
      }),
    }),
  )
  create(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No image file');
    }

    return this.imagesService.create({ fileName: file.filename });
  }

  @Get('get/:imageName')
  findImage(@Res() res: Response, @Param('imageName') imageName: string) {
    const path = this.imagesService.getPathImage(imageName);
    res.sendFile(path);
  }

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.imagesService.remove(id);
  }
}
