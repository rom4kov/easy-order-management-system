import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Request,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import type { Request as ExpressRequest, Response } from 'express';
import type { User } from 'src/users/user.entity';

type AuthRequest = ExpressRequest & {
  user: unknown;
};
import { Public } from 'src/decorators/public.decorator';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<User | undefined> {
    const result = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    response.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    return result.user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  signOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
  }

  @Get('me')
  getProfile(@Request() req: AuthRequest) {
    return req.user;
  }
}
