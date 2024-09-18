import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dtos/register.dto';
import { UserEntity } from '../user/entities/user.entity';
import { LoginDto } from './dtos/login.dto';
import { HashService } from '../shared/services/hash.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwt-payload.type';
import { LoginSchema } from './schemas/login.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<LoginSchema> {
    const user = await this.userService.findByEmailOrPanic(dto.email);

    const passwordMatch = await this.hashService.verifyData(
      user.passwordHash,
      dto.password,
    );
    if (!passwordMatch) {
      throw new ForbiddenException('Wrong email or password');
    }

    const accessToken = await this.generateToken(user.id);

    return { accessToken } as LoginSchema;
  }

  async register(dto: RegisterDto): Promise<UserEntity> {
    await this.userService.checkDuplicateUsers(dto.email, dto.username);

    return await this.userService.createUser(dto);
  }

  private async generateToken(userId: number): Promise<string> {
    const payload: JwtPayload = { sub: userId };
    return await this.jwtService.signAsync(payload);
  }
}
