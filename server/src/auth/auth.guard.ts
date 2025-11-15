import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { Request } from 'express';
import { parse } from 'cookie';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
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
      const { sub }: { sub: number } = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        },
      );
      const user: User | null = await this.usersService.findOneById(sub);
      delete (user as Partial<Pick<User, 'password'>>).password;
      request['user'] = user as Omit<User, 'password'>;
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
