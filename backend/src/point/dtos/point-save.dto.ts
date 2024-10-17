import { PointTypeEnum } from '../enums/point-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PointSaveDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  coordinate: number[];

  @ApiProperty()
  @IsNotEmpty()
  type: PointTypeEnum;
}
