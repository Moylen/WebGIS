import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserShortSchema {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  username: string;
}
