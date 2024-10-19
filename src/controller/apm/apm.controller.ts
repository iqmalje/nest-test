import { Controller, Get, Render, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApmService } from 'src/service/apm/apm.service';

@Controller('apm')
export class ApmController {
  constructor(private apmService: ApmService) {}

  @Get('')
  @Render('apm/index')
  async findAll() {
    return {
      payload: await this.apmService.findAll(),
    };
  }

  @Get(':apmid')
  @Render('apm/detailed/index')
  async find(@Req() request: Request) {
    return {
      payload: await this.apmService.find(request.params.apmid),
    };
  }
}
