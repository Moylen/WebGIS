import { BaseEntity } from '../../shared/entities/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { CommentEntity } from '../../comment/entities/comment.entity';
import { FileEntity } from '../../file/entities/file.entity';

@Entity({ name: 'point' })
export class PointEntity extends BaseEntity {
  @Column()
  title: string;

  @Column('decimal', { array: true })
  coordinate: number[];

  // @Column({ enum: PointTypeEnum, default: PointTypeEnum.POINT })
  // type: PointTypeEnum;

  @ManyToOne(() => FileEntity)
  photo: FileEntity;

  @ManyToOne(() => UserEntity, (creator) => creator.points, { nullable: false })
  creator: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.point, { cascade: true })
  comments: CommentEntity[];
}
