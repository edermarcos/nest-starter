import { IsOptional, IsPositive, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { maxPagesPerRequest } from '../helpers';

export class PaginationDto {
  @ApiProperty({ default: maxPagesPerRequest })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({ default: 0 })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number;
}
