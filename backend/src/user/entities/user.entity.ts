import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../shared/entities/base.entity';
import { PointEntity } from '../../point/entities/point.entity';
import { CommentEntity } from '../../comment/entities/comment.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  passwordHash: string;

  @OneToMany(() => PointEntity, (point) => point.creator, {
    cascade: true,
  })
  points: PointEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.creator, {
    cascade: true,
  })
  comments: CommentEntity[];
}
