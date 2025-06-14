import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';

import { CreateAuthDto } from './dto/login-auth.dto';
import { AuthService } from 'src/application/usecases/auth/auth.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('/login')
  @HttpCode(200)
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }
}
