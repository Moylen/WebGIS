import { UserShortSchema } from '../../user/schemas/user-short.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { FileSchema } from '../../file/schema/file.schema';

export class PointSchema {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  title: string;

  // @Expose()
  // @ApiProperty()
  // type: PointTypeEnum;

  @Expose()
  @ApiProperty()
  coordinate: number[][];

  @Expose()
  @Type(() => UserShortSchema)
  @ApiProperty()
  creator: UserShortSchema;

  @Expose()
  @Type(() => FileSchema)
  @ApiProperty({ type: FileSchema })
  photo: FileSchema;

  @Expose()
  @ApiProperty()
  createTime: Date;

  @Expose()
  @ApiProperty()
  updateTime: Date;
}
