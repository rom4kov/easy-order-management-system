import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Request as ExpressRequest } from 'express';

type AuthRequest = ExpressRequest & {
  user: unknown;
};
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
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
  async signIn(@Body() signInDto: SignInDto) {
    const result = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    return result;
  }

  @Public()
  @Get('profile')
  getProfile(@Request() req: AuthRequest) {
    return req.user;
  }
}
