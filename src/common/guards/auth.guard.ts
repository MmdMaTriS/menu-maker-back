import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // try {
    //   const request = context.switchToHttp().getRequest();
    //   const token = this.extractTokenFromHeader(request);
    //   if (!token)
    //     throw new UnauthorizedException('عدم مجوز دسترسی به بخش مورد نظر! 403');
    //   const payload = await this.jwtService.verifyAsync(token);
    //   if (!payload || !payload.hasOwnProperty('id'))
    //     throw new UnauthorizedException('عدم مجوز دسترسی به بخش مورد نظر! 403');
    //   request['user'] = payload;
    // } catch {
    //   throw new UnauthorizedException('عدم مجوز دسترسی به بخش مورد نظر! 403');
    // }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
