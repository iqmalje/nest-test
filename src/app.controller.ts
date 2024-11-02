import { Controller, Get, Render, UseFilters, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticationGuard } from './guard/authentication/authentication.guard';
import { AuthFilter } from './filter/auth/auth.filter';

@Controller()
@UseGuards(AuthenticationGuard)
@UseFilters(AuthFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  homePage() {
    return {};
  }
}
