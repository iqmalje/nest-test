import { Controller, Get, Query, Render, Req } from '@nestjs/common';
import { Request } from 'express';
import { FileService } from 'src/service/file/file.service';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Get('')
  @Render('file/index')
  async findAll(@Query() query) {
    let data;
    if (query.search) data = await this.fileService.search(query.search);
    else data = await this.fileService.findAll();

    return {
      payload: data,
      query: query.search,
    };
  }

  @Get(':fileid')
  @Render('file/detailed/index')
  async find(@Req() request: Request) {
    const data = await this.fileService.find(request.params.fileid);

    return {
      payload: data,
    };
  }
}
