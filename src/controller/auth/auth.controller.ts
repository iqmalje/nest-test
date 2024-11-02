import { Controller, Get, Render } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get('login')
  @Render('auth/login')
  async login() {
    return {
      payload: 'go fuck yourself',
    };
  }
}
