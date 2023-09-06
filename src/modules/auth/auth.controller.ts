// auth.controller.ts

import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from 'src/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body()
    payload: {
      username: string;
      name: string;
      phone: string;
      email: string;
      password: string;
    },
  ) {
    return this.authService.register(
      payload.username,
      payload.name,
      payload.phone,
      payload.email,
      payload.password,
    );
  }

  @Post('login')
  async login(@Body() payload: { phone: string; password: string }) {
    return this.authService.loginByPhone(payload.phone, payload.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMe(@Request() req: { user: User }) {
    // The `@Request()` decorator gives you access to the user object from the JWT token
    return req.user;
  }
}
