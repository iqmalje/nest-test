import {
  Controller,
  Get,
  Query,
  Render,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthFilter } from 'src/filter/auth/auth.filter';
import { AuthenticationGuard } from 'src/guard/authentication/authentication.guard';
import { AccountService } from 'src/service/account/account.service';
import { FileService } from 'src/service/file/file.service';
import { OrderService } from 'src/service/order/order.service';

@Controller('order')
@UseGuards(AuthenticationGuard)
@UseFilters(AuthFilter)
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  @Render('order/index')
  async findAll(@Query() query) {
    let data;
    if (query.search) {
      data = await this.orderService.search(query.search);
      return {
        payload: data,
        query: query,
        startIndex: 0,
      };
    }

    if (query.page) {
      const start = 50 * (query.page - 1);
      const end = start + 49;
      console.log(`start at ${start}, end at ${end}`);
      data = await this.orderService.findAll({
        start: 50 * (query.page - 1),
        end: end,
      });

      return {
        payload: data,
        query: query,
        startIndex: start,
      };
    }

    data = await this.orderService.findAll({
      start: 0,
      end: 49,
    });

    return {
      payload: data,
      query: {
        search: '',
        page: 1,
      },
      startIndex: 0,
    };
  }

  @Get(':orderid')
  @Render('order/detailed/index')
  async find(@Req() request: Request) {
    const data = await this.orderService.find(request.params.orderid);
    const orderSettings = await this.orderService.findOrderSettings(
      request.params.orderid,
    );
    // const fileData = await this.fileService.find(data.fileId);
    // const accountData = await this.accountService.find(data.accountId);
    return {
      payload: {
        order: data,
        settings: orderSettings,
      },
    };
  }
}
