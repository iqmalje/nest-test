import { Body, Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
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
      const accessToken = await this.authService.login(
        body.email,
        body.password,
      );

      const data = response.cookie('token', accessToken, {
        maxAge: 1000 * 60 * 60,
      });

      response.redirect('/');
    } catch (error) {
      response.render('auth/login', {
        payload: {
          error: error,
        },
      });
    }
  }

  @Post('logout')
  async logout(@Res() response: Response) {
    response.clearCookie('token');
    await this.authService.logout();

    response.redirect('/');
  }
}
