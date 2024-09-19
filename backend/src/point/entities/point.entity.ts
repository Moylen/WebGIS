import { BaseEntity } from '../../shared/entities/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { PointTypeEnum } from '../enums/point-type.enum';
import { CommentEntity } from '../../comment/entities/comment.entity';

@Entity({ name: 'point' })
export class PointEntity extends BaseEntity {
  @Column()
  title: string;

  @Column('decimal', { array: true })
  coordinate: number[][];

  @Column({ enum: PointTypeEnum, default: PointTypeEnum.POINT })
  type: PointTypeEnum;

  @ManyToOne(() => UserEntity, (creator) => creator.points, { nullable: false })
  creator: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.point, { cascade: true })
  comments: CommentEntity[];
}
