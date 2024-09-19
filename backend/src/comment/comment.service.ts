import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { CommentSaveDto } from './dtos/comment-save.dto';
import { JwtContext } from '../auth/types/jwt-user.type';
import { PointService } from '../point/point.service';
import { UserService } from '../user/user.service';
import { CommentUpdateDto } from './dtos/comment-update.dto';
import { CommentSearchDto } from './dtos/comment-search.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    private readonly pointService: PointService,
    private readonly userService: UserService,
  ) {}

  async createComment(dto: CommentSaveDto, context: JwtContext) {
    const creator = await this.userService.findByIdOrPanic(context.id);
    const point = await this.pointService.findByIdOrPanic(dto.pointId);

    const comment = this.commentRepository.create({
      text: dto.text,
      score: dto.score,
      creator,
      point,
    });

    return await this.commentRepository.save(comment);
  }

  async findByIdOrPanic(id: number) {
    const comment = await this.commentRepository.findOne({
      where: {
        id,
      },
      relations: {
        creator: true,
      },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with id: ${id} not found`);
    }

    return comment;
  }

  async search(dto: CommentSearchDto) {
    const { page = 0, pageSize = 25 } = dto;

    const [items, total] = await this.commentRepository.findAndCount({
      where: {
        point: {
          id: dto.pointId,
        },
      },
      relations: {
        point: true,
        creator: true,
      },
      skip: page * pageSize,
      take: pageSize,
    });

    return { total, items };
  }

  async updateComment(id: number, dto: CommentUpdateDto, context: JwtContext) {
    const comment = await this.findByIdOrPanic(id);

    if (comment.creator.id !== context.id) {
      throw new ForbiddenException('Access denied');
    }

    Object.assign(comment, dto);

    return await this.commentRepository.save(comment);
  }

  async deleteComment(id: number, context: JwtContext) {
    const comment = await this.findByIdOrPanic(id);

    if (comment.creator.id !== context.id) {
      throw new ForbiddenException('Access denied');
    }

    return await this.commentRepository.softRemove(comment);
  }
}
