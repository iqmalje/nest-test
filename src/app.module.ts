import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderController } from './controller/order/order.controller';
import { OrderService } from './service/order/order.service';
import { FileService } from './service/file/file.service';
import { AccountService } from './service/account/account.service';
import { AccountController } from './controller/account/account.controller';
import { FileController } from './controller/file/file.controller';
import { ApmService } from './service/apm/apm.service';
import { ApmController } from './controller/apm/apm.controller';
import { AuthController } from './controller/auth/auth.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    OrderController,
    AccountController,
    FileController,
    ApmController,
    AuthController,
  ],
  providers: [
    AppService,
    OrderService,
    FileService,
    AccountService,
    ApmService,
  ],
})
export class AppModule {}
