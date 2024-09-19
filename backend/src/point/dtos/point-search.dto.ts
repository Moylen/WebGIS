import { SearchDto } from '../../shared/dtos/search.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PointSearchDto extends SearchDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  query?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  creatorId?: number;
}
