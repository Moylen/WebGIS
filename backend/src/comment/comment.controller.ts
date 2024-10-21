import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommentSaveDto } from './dtos/comment-save.dto';
import { Context } from '../auth/decorators/context.decorator';
import { JwtContext } from '../auth/types/jwt-user.type';
import { CommentSearchDto } from './dtos/comment-search.dto';
import { CommentUpdateDto } from './dtos/comment-update.dto';
import { CommentSchema } from './schemas/comment.schema';
import { TransformInterceptor } from '../shared/interceptors/transform.interceptor';
import { CommentSearchSchema } from './schemas/comment-search.schema';

@ApiBearerAuth()
@ApiTags('Comment')
@UseGuards(JwtAuthGuard)
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseInterceptors(new TransformInterceptor(CommentSchema))
  @ApiOkResponse({ type: CommentSchema })
  @Post()
  async createComment(
    @Body() dto: CommentSaveDto,
    @Context() context: JwtContext,
  ) {
    return this.commentService.createComment(dto, context);
  }

  @UseInterceptors(new TransformInterceptor(CommentSearchSchema))
  @ApiOkResponse({ type: CommentSearchSchema })
  @Get('/search')
  async search(@Query() dto: CommentSearchDto) {
    return this.commentService.search(dto);
  }

  @UseInterceptors(new TransformInterceptor(CommentSchema))
  @ApiOkResponse({ type: CommentSchema })
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.findByIdOrPanic(id);
  }

  @UseInterceptors(new TransformInterceptor(CommentSchema))
  @ApiOkResponse({ type: CommentSchema })
  @Put(':id')
  async updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CommentUpdateDto,
    @Context() context: JwtContext,
  ) {
    return this.commentService.updateComment(id, dto, context);
  }

  @UseInterceptors(new TransformInterceptor(CommentSchema))
  @ApiOkResponse({ type: CommentSchema })
  @Delete(':id')
  async deleteComment(
    @Param('id', ParseIntPipe) id: number,
    @Context() context: JwtContext,
  ) {
    return this.commentService.deleteComment(id, context);
  }
}
