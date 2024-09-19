import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { QueryRunner, Repository } from 'typeorm';
import { createReadStream, promises as fs } from 'fs';
import { v4 } from 'uuid';
import * as path from 'path';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async uploadFile(
    file: Express.Multer.File,
    qRunner: QueryRunner,
  ): Promise<FileEntity> {
    const fileExt = path.extname(file.originalname);
    const fileName = v4() + fileExt;
    const filePath = path.join('uploads', fileName);

    const fileEntity = qRunner.manager.create(FileEntity, {
      filePath,
      mimeType: file.mimetype,
    });

    try {
      await fs.mkdir(path.resolve(process.cwd(), 'uploads'), {
        recursive: true,
      });
      await fs.writeFile(filePath, file.buffer);

      return await qRunner.manager.save(fileEntity);
    } catch (err) {
      throw err;
    }
  }

  async findByIdOrPanic(id: number): Promise<StreamableFile> {
    const file = await this.fileRepository.findOneBy({ id });

    if (!file) {
      throw new NotFoundException(`File by id: ${id} not found`);
    }

    const stream = createReadStream(file.filePath);
    return new StreamableFile(stream, { type: file.mimeType });
  }
}
