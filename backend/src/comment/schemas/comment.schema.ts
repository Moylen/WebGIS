import { UserShortSchema } from '../../user/schemas/user-short.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class CommentSchema {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  text: string;

  @Expose()
  @ApiProperty()
  score: number;

  @Expose()
  @Type(() => UserShortSchema)
  @ApiProperty({ type: UserShortSchema })
  creator: UserShortSchema;

  @Expose()
  @ApiProperty()
  createTime: Date;

  @Expose()
  @ApiProperty()
  updateTime: Date;
}
