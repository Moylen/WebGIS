import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PointEntity } from './entities/point.entity';
import { Repository } from 'typeorm';
import { PointSaveDto } from './dtos/point-save.dto';
import { JwtContext } from '../auth/types/jwt-user.type';
import { UserService } from '../user/user.service';
import { PointSearchDto } from './dtos/point-search.dto';

@Injectable()
export class PointService {
  constructor(
    @InjectRepository(PointEntity)
    private readonly pointRepository: Repository<PointEntity>,
    private readonly userService: UserService,
  ) {}

  async createPoint(
    dto: PointSaveDto,
    context: JwtContext,
  ): Promise<PointEntity> {
    const creator = await this.userService.findByIdOrPanic(context.id);

    const point = this.pointRepository.create({
      ...dto,
      creator,
    });

    return await this.pointRepository.save(point);
  }

  async findByIdOrPanic(id: number): Promise<PointEntity> {
    const point = await this.pointRepository.findOne({
      where: {
        id,
      },
      relations: {
        creator: true,
      },
    });

    if (!point) {
      throw new NotFoundException(`Point with id: ${id} not found`);
    }

    return point;
  }

  async search(dto: PointSearchDto) {
    const { page = 0, pageSize = 25 } = dto;

    const searchQuery = this.pointRepository
      .createQueryBuilder('model')
      .skip(page * pageSize)
      .take(pageSize);

    if (dto.query) {
      searchQuery.andWhere('model.title LIKE :query', {
        query: `%${dto.query}%`,
      });
    }

    if (dto.creatorId) {
      searchQuery.andWhere('model.creatorId = :creatorId', {
        creatorId: dto.creatorId,
      });
    }
    const [items, total] = await searchQuery.getManyAndCount();

    return { total, items };
  }

  async updatePoint(
    dto: PointSaveDto,
    id: number,
    context: JwtContext,
  ): Promise<PointEntity> {
    const point = await this.findByIdOrPanic(id);

    if (point.creator.id !== context.id) {
      throw new ForbiddenException('Access denied');
    }

    Object.assign(point, dto);

    return await this.pointRepository.save(point);
  }

  async deletePoint(id: number, context: JwtContext): Promise<PointEntity> {
    const point = await this.findByIdOrPanic(id);

    if (point.creator.id !== context.id) {
      throw new ForbiddenException('Access denied');
    }

    return await this.pointRepository.softRemove(point);
  }
}
