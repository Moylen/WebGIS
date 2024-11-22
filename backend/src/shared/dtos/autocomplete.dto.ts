import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AutocompleteDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  query?: string;
}
