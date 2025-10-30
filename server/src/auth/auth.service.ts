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

  private token: string;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpData: SignUpDto): Promise<InsertResult> {
    console.log('auth.service.ts signUpData:', signUpData);
    const result = await hash(signUpData.password, saltRounds);
    console.log('auth.service.ts result:', result);
    return await this.usersService.addUser({ ...signUpData, password: result });
  }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    console.log('signin route request');
    const user: User | null = await this.usersService.findOne(username);
    console.log('user', user);
    console.log(process.env.JWT_SECRET);
    this.passwordHash = await hash(pass, saltRounds);

    if (!user) return { access_token: 'no user found' };
    const isMatch = await this.verifyPassword(pass);
    console.log(isMatch);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    console.log('payload:', payload);
    const access_token: string = await this.jwtService.signAsync(payload);
    console.log('access_token:', access_token);
    return {
      access_token: access_token,
    };
  }

  async verifyPassword(plainPassword: string): Promise<boolean> {
    if (plainPassword && this.passwordHash) {
      return await compare(plainPassword, this.passwordHash);
    }
    return false;
  }
}
