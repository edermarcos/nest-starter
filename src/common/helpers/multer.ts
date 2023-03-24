import { BadRequestException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

export const imageFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: (...args: any[]) => void,
) => {
  if (!file) {
    return cb(new BadRequestException('No image file'), false);
  }

  const extension = file.mimetype.split('/')[1];
  const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];

  if (!validExtensions.includes(extension)) {
    return cb(
      new BadRequestException(
        `Invalid file extension. Valid extensions: ${validExtensions.join(
          ', ',
        )}`,
      ),
      false,
    );
  }

  cb(null, true);
};

export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: (...args: any[]) => void,
) => {
  const extension = file.mimetype.split('/')[1];
  const fileName = `${uuid()}.${extension}`;
  cb(null, fileName);
};
