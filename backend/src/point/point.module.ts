import { Module } from '@nestjs/common';
import { PointService } from './point.service';
import { PointController } from './point.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointEntity } from './entities/point.entity';
import { UserEntity } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { FileEntity } from '../file/entities/file.entity';
import { FileService } from '../file/file.service';
import { FileModule } from '../file/file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PointEntity, UserEntity, FileEntity]),
    UserModule,
    FileModule,
  ],
  controllers: [PointController],
  providers: [PointService, FileService],
})
export class PointModule {}
