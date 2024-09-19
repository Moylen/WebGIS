import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FileSchema {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  filePath: string;

  @Expose()
  @ApiProperty()
  mimeType: string;
}
