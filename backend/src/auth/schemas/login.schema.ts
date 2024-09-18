import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoginSchema {
  @Expose()
  @ApiProperty()
  accessToken: string;
}
