import { OmitType } from '@nestjs/swagger';
import { CommentSaveDto } from './comment-save.dto';

export class CommentUpdateDto extends OmitType(CommentSaveDto, ['pointId']) {}
