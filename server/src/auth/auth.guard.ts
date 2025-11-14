import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { parse } from 'cookie';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    // console.log('token:', token);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload: unknown = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      });
      // console.log('payload:', payload);
      request['user'] = payload;
    } catch {
      // console.error('error:', err);
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const cookies = parse(request.headers.cookie || '');
    return cookies['access_token'];
  }
}
