import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderController } from './controller/order/order.controller';
import { OrderService } from './service/order/order.service';
import { FileService } from './service/file/file.service';
import { AccountService } from './service/account/account.service';
import { AccountController } from './controller/account/account.controller';
import { FileController } from './controller/file/file.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    OrderController,
    AccountController,
    FileController,
  ],
  providers: [AppService, OrderService, FileService, AccountService],
})
export class AppModule {}
