import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InsertResult } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { hash, compare } from 'bcrypt-ts';
import { User } from 'src/users/user.entity';
import { RefreshTokenDto } from './dto/refresh-token.dto';

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
    this.passwordHash = await hash(pass, saltRounds);

    if (!user)
      return {
        user: undefined,
        access_token: 'no user found',
        refresh_token: 'no user',
      };

    const isMatch = await this.verifyPassword(pass);
    console.log('isMatch:', isMatch);

    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    const accessToken: string = await this.jwtService.signAsync(payload);

    const refreshPayload = { sub: user.id };
    const refreshToken: string = await this.jwtService.signAsync(
      refreshPayload,
      {
        expiresIn: 86400,
      },
    );

    user.password = '';
    console.log('user:', user);
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

  public async refreshToken(refreshTokenDto: RefreshTokenDto) {

  }
}
