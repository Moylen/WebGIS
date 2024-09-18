import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Context } from '../auth/decorators/context.decorator';
import { JwtContext } from '../auth/types/jwt-user.type';
import { UserShortSchema } from './schemas/user-short.schema';
import { UserSchema } from './schemas/user.schema';
import { TransformInterceptor } from '../shared/interceptors/transform.interceptor';

@ApiBearerAuth()
@ApiTags('User')
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(new TransformInterceptor(UserShortSchema))
  @ApiOkResponse({ type: UserShortSchema })
  @Get(':id')
  async findUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findByIdOrPanic(id);
  }

  @UseInterceptors(new TransformInterceptor(UserSchema))
  @ApiOkResponse({ type: UserSchema })
  @Delete(':id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @Context() context: JwtContext,
  ) {
    return this.userService.deleteUser(id, context);
  }
}
