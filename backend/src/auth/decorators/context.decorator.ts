import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtUser } from '../types/jwt-user.type';

export const Context = createParamDecorator(
  (data: keyof JwtUser, ctx: ExecutionContext): JwtUser => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user[data] : user;
  },
);
