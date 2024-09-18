import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserSchema {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  username: string;

  @Expose()
  @ApiProperty()
  createTime: Date;

  @Expose()
  @ApiProperty()
  updateTime: Date;
}
