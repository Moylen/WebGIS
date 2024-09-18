import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dtos/register.dto';
import { HashService } from '../shared/services/hash.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly hashService: HashService,
  ) {}

  async createUser(dto: RegisterDto): Promise<UserEntity> {
    const passwordHash = await this.hashService.hashData(dto.password);

    const user = this.userRepository.create({
      email: dto.email,
      username: dto.username,
      passwordHash,
    });

    return await this.userRepository.save(user);
  }

  async findByIdOrPanic(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    return user;
  }

  async findByEmailOrPanic(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException(`User with email: ${email} not found`);
    }

    return user;
  }

  async checkDuplicateUsers(email: string, username: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: [{ email }, { username }],
    });

    if (user) {
      throw new BadRequestException('This email or username already used');
    }
  }
}
