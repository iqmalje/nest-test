import { Controller, Get, Query, Render, Req } from '@nestjs/common';
import { Request } from 'express';
import { AccountService } from 'src/service/account/account.service';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get()
  @Render('account/index')
  async search(@Query() query) {
    let data;

    if (query.search) data = await this.accountService.search(query.search);
    else data = await this.accountService.findAll();
    return {
      payload: data,
      query: query.search,
    };
  }

  @Get(':accountId')
  @Render('account/detailed/index')
  async find(@Req() request: Request) {
    const data = await this.accountService.find(request.params.accountId);

    return {
      payload: data,
    };
  }
}