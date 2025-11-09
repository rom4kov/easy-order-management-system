import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InsertResult } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { hash, compare } from 'bcrypt-ts';
import { User } from 'src/users/user.entity';

const saltRounds: number = 10;

@Injectable()
export class AuthService {
  passwordHash: string | undefined;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpData: SignUpDto): Promise<InsertResult> {
    const result = await hash(signUpData.password, saltRounds);
    return await this.usersService.addUser({ ...signUpData, password: result });
  }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ user: User | undefined; access_token: string }> {
    const user: User | null = await this.usersService.findOne(username);
    console.log('user:', user);
    this.passwordHash = await hash(pass, saltRounds);

    if (!user) return { user: undefined, access_token: 'no user found' };
    const isMatch = await this.verifyPassword(pass);
    console.log('isMatch:', isMatch);

    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    const access_token: string = await this.jwtService.signAsync(payload);
    user.password = '';
    return {
      user: user,
      access_token: access_token,
    };
  }

  // async signOut(username: string): Promise<void> {
  //   await this.jwtService.
  // }

  async verifyPassword(plainPassword: string): Promise<boolean> {
    if (plainPassword && this.passwordHash) {
      return await compare(plainPassword, this.passwordHash);
    }
    return false;
  }
}
