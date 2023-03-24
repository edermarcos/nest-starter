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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateUserDto, UpdateUserDto, LogInDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth, GetUser } from './decorators';
import { UsersService } from './users.service';
import { ValidRoles } from './interfaces';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  logIn(@Body() userLoginDto: LogInDto) {
    return this.usersService.logIn(userLoginDto);
  }

  @ApiOperation({
    summary: 'Check a token and returns an user if the token is valid',
  })
  @Get('test-auth')
  @ApiBearerAuth()
  @Auth(ValidRoles.user, ValidRoles.admin)
  auth(@GetUser() user: User) {
    return this.usersService.testToken(user);
  }

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiBearerAuth()
  @Auth(ValidRoles.user)
  findAll(@Query() pagination: PaginationDto) {
    return this.usersService.findAll(pagination);
  }

  @Get(':id')
  @ApiBearerAuth()
  @Auth(ValidRoles.user)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Auth(ValidRoles.user)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Auth(ValidRoles.user, ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
