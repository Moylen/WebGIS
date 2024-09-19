import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { PointModule } from '../point/point.module';
import { UserModule } from '../user/user.module';
import { PointService } from '../point/point.service';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { PointEntity } from '../point/entities/point.entity';
import { HashService } from '../shared/services/hash.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity, UserEntity, PointEntity]),
    PointModule,
    UserModule,
  ],
  controllers: [CommentController],
  providers: [CommentService, PointService, UserService, HashService],
})
export class CommentModule {}
