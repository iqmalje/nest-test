import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ApmController } from 'src/controller/apm/apm.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
})
export class FileModule {}
