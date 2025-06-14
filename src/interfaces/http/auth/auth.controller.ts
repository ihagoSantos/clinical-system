import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';

import { CreateAuthDto } from './dto/login-auth.dto';
import { LoginUseCase } from 'src/application/usecases/auth/login.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase
  ) { }

  @Post('/login')
  @HttpCode(200)
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.loginUseCase.execute(createAuthDto);
  }
}
