import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/service/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  @Render('auth/login')
  async loginRender() {}

  @Post('login')
  async loginAccount(
    @Body() body: { email: string; password: string },
    @Res() response: Response,
  ) {
    try {
      await this.authService.login(body.email, body.password);
      response.redirect('/');
    } catch (error) {
      response.render('auth/login', {
        payload: {
          error: error,
        },
      });
    }
  }
}
