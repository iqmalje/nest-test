import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderController } from './controller/order/order.controller';
import { OrderService } from './service/order/order.service';
import { FileService } from './file/file.service';
import { AccountService } from './account/account.service';

@Module({
  imports: [],
  controllers: [AppController, OrderController],
  providers: [AppService, OrderService, FileService, AccountService],
})
export class AppModule {}
