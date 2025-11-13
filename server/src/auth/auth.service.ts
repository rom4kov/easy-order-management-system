import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InsertResult } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { hash, compare } from 'bcrypt-ts';
import { parse } from 'cookie';
import { User } from 'src/users/user.entity';
import { Request } from 'express';

const saltRounds: number = 10;

@Injectable()
export class AuthService {
  passwordHash: string | undefined;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async signUp(signUpData: SignUpDto): Promise<InsertResult> {
    const result = await hash(signUpData.password, saltRounds);
    return await this.usersService.addUser({ ...signUpData, password: result });
  }

  public async signIn(
    username: string,
    pass: string,
  ): Promise<{
    user: User | undefined;
    access_token: string;
    refresh_token: string;
  }> {
    const user: User | null = await this.usersService.findOne(username);

    if (!user) {
      return {
        user: undefined,
        access_token: '',
        refresh_token: '',
      };
    }

    this.passwordHash = user?.password;

    const isMatch = await this.verifyPassword(pass);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    const accessToken: string = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    });

    const refreshPayload = { sub: user.id };
    const refreshToken: string = await this.jwtService.signAsync(
      refreshPayload,
      {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: 86400,
      },
    );

    user.password = '';
    return {
      user: user,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  // async signOut(username: string): Promise<void> {
  //   await this.jwtService.
  // }

  public async verifyPassword(plainPassword: string): Promise<boolean> {
    if (plainPassword && this.passwordHash) {
      return await compare(plainPassword, this.passwordHash);
    }
    return false;
  }

  public async refreshToken(request: Request) {
    let refreshToken = this.extractRefreshTokenFromHeader(request);

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    try {
      const { sub }: { sub: number } = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        },
      );

      const user: User | null = await this.usersService.findOneById(sub);

      if (!user) {
        return {
          user: undefined,
          access_token: '',
          refresh_token: '',
        };
      }

      const payload = { sub: user.id, username: user.username };
      const accessToken: string = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      });

      const refreshPayload = { sub: user.id };
      refreshToken = await this.jwtService.signAsync(refreshPayload, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: 86400,
      });

      user.password = '';
      return {
        user: user,
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  private extractRefreshTokenFromHeader(request: Request): string | undefined {
    const cookies = parse(request.headers.cookie || '');
    return cookies['refresh_token'];
  }
}
