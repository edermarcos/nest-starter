import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth, GetUser } from 'src/users/decorators';
import { User } from 'src/users/entities/user.entity';
import { ERoles } from 'src/users/interfaces';

@ApiBearerAuth()
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth(ERoles.PRODUCT_C, ERoles.ADMIN, ERoles.PRODUCT_ADMIN)
  create(@Body() createProductDto: CreateProductDto, @GetUser() user: User) {
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  @Auth(ERoles.PRODUCT_R, ERoles.ADMIN, ERoles.PRODUCT_ADMIN)
  findAll(@Query() options: PaginationDto) {
    return this.productsService.findAll(options);
  }

  @Get(':id')
  @Auth(ERoles.PRODUCT_R, ERoles.ADMIN, ERoles.PRODUCT_ADMIN)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @Auth(ERoles.PRODUCT_U, ERoles.ADMIN, ERoles.PRODUCT_ADMIN)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Auth(ERoles.PRODUCT_D, ERoles.ADMIN, ERoles.PRODUCT_ADMIN)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
