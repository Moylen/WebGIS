import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { DataSource, Repository } from 'typeorm';
import { CommentSaveDto } from './dtos/comment-save.dto';
import { JwtContext } from '../auth/types/jwt-user.type';
import { PointService } from '../point/point.service';
import { UserService } from '../user/user.service';
import { CommentUpdateDto } from './dtos/comment-update.dto';
import { CommentSearchDto } from './dtos/comment-search.dto';
import { FileService } from '../file/file.service';
import { FileEntity } from '../file/entities/file.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    private readonly pointService: PointService,
    private readonly userService: UserService,
    private readonly fileService: FileService,
    private readonly dataSource: DataSource,
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

  async uploadPhoto(
    file: Express.Multer.File,
    commentId: number,
    context: JwtContext,
  ): Promise<CommentEntity> {
    const comment = await this.findByIdOrPanic(commentId);

    if (comment.creator.id !== context.id) {
      throw new ForbiddenException('Access denied');
    }

    const qRunner = this.dataSource.createQueryRunner();
    await qRunner.connect();
    await qRunner.startTransaction();
    try {
      comment.photo = await this.fileService.uploadFile(file, qRunner);
      await qRunner.manager.save(comment);
      await qRunner.commitTransaction();

      return comment;
    } catch (err) {
      await qRunner.rollbackTransaction();
      throw err;
    } finally {
      await qRunner.release();
    }
  }

  async findByIdOrPanic(id: number) {
    const comment = await this.commentRepository.findOne({
      where: {
        id,
      },
      relations: {
        creator: true,
        photo: true,
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
