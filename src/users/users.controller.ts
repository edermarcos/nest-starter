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

import { CreateUserDto, UpdateUserDto, LogInDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth, GetUser } from './decorators';
import { UsersService } from './users.service';
import { ValidRoles } from './interfaces';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  logIn(@Body() userLoginDto: LogInDto) {
    return this.usersService.logIn(userLoginDto);
  }

  @Get('test-auth')
  @Auth(ValidRoles.user)
  auth(@GetUser() user: User) {
    return this.usersService.testToken(user);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Auth(ValidRoles.admin)
  findAll(@Query() pagination: PaginationDto) {
    return this.usersService.findAll(pagination);
  }

  @Get(':id')
  @Auth(ValidRoles.user)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
