import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../shared/entities/base.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { PointEntity } from '../../point/entities/point.entity';

@Entity({ name: 'comment' })
export class CommentEntity extends BaseEntity {
  @Column()
  text: string;

  @Column()
  score: number;

  @ManyToOne(() => UserEntity, (creator) => creator.comments, {
    nullable: false,
  })
  creator: UserEntity;

  @ManyToOne(() => PointEntity, (point) => point.comments, {
    nullable: false,
  })
  point: PointEntity;
}
