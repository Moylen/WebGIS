import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserSchema } from '../user/schemas/user.schema';
import { LoginSchema } from './schemas/login.schema';
import { TransformInterceptor } from '../shared/interceptors/transform.interceptor';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(new TransformInterceptor(LoginSchema))
  @ApiOkResponse({ type: LoginSchema })
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseInterceptors(new TransformInterceptor(UserSchema))
  @ApiOkResponse({ type: UserSchema })
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
}
