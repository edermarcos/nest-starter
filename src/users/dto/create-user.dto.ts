import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

import { LogInDto } from './log-in.dto';

export class CreateUserDto extends LogInDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString({ each: true })
  @IsOptional()
  readonly roles: string[];
}
