import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentSaveDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  pointId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;

  @Max(5)
  @Min(1)
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  score: number;
}
