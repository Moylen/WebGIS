import { PointSchema } from './point.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class PointSearchSchema {
  @Expose()
  @ApiProperty()
  total: number;

  @Expose()
  @Type(() => PointSchema)
  @ApiProperty({ type: [PointSchema] })
  items: PointSchema[];
}
