import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export type UserDeviceType = Record<'userAgent' | 'ip', string>;
export const UserDevice = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserDeviceType => {
    const request: Request = ctx.switchToHttp().getRequest();
    return {
      userAgent: request.headers['user-agent'],
      ip: request.ip,
    };
  },
);
