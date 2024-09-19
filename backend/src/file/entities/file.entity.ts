import { BaseEntity } from '../../shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'file' })
export class FileEntity extends BaseEntity {
  @Column({ unique: true })
  filePath: string;

  @Column()
  mimeType: string;
}
