import { CommentSchema } from './comment.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class CommentSearchSchema {
  @Expose()
  @ApiProperty()
  total: number;

  @Expose()
  @Type(() => CommentSchema)
  @ApiProperty()
  items: CommentSchema[];
}
