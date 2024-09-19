import { UserShortSchema } from '../../user/schemas/user-short.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { FileSchema } from '../../file/schema/file.schema';

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
