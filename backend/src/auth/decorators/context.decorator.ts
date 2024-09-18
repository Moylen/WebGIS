import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtContext } from '../types/jwt-user.type';

export const Context = createParamDecorator(
  (data: keyof JwtContext, ctx: ExecutionContext): JwtContext => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user[data] : user;
  },
);
