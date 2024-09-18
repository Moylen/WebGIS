import { BaseEntity } from '../../shared/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { PointTypeEnum } from '../enums/point-type.enum';

@Entity({ name: 'point' })
export class PointEntity extends BaseEntity {
  @Column('int', { array: true })
  coordinate: number[][];

  @Column({ enum: PointTypeEnum, default: PointTypeEnum.POINT })
  type: PointTypeEnum;

  @ManyToOne(() => UserEntity, (creator) => creator.points, { nullable: false })
  creator: UserEntity;
}
