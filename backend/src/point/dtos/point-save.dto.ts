import { PointTypeEnum } from '../enums/point-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class PointSaveDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsArray({ each: true })
  @IsNotEmpty()
  coordinate: number[];

  @ApiProperty()
  @IsNotEmpty()
  type: PointTypeEnum;
}
