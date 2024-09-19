import { Module } from '@nestjs/common';
import { PointService } from './point.service';
import { PointController } from './point.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointEntity } from './entities/point.entity';
import { UserEntity } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([PointEntity, UserEntity]), UserModule],
  controllers: [PointController],
  providers: [PointService],
})
export class PointModule {}
