import { Controller, Get, Query, Render, Req } from '@nestjs/common';
import { Request } from 'express';
import { AccountService } from 'src/account/account.service';
import { FileService } from 'src/file/file.service';
import { OrderService } from 'src/service/order/order.service';

@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
    private fileService: FileService,
    private accountService: AccountService,
  ) {}

  @Get()
  @Render('order/index')
  async findAll(@Query() query) {
    let data;
    if (query.search) {
      data = await this.orderService.search(query.search);
    } else {
      data = await this.orderService.findAll({
        limit: 50,
      });
    }
    return {
      payload: data,
    };
  }

  @Get(':orderid')
  @Render('order/detailed/index')
  async find(@Req() request: Request) {
    const data = await this.orderService.find(request.params.orderid);
    const fileData = await this.fileService.find(data.fileId);
    const accountData = await this.accountService.find(data.accountId);
    return {
      payload: {
        order: data,
        file: fileData,
        account: accountData,
      },
    };
  }
}
