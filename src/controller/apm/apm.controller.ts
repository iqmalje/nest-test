import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Req,
  Res,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { AuthFilter } from 'src/filter/auth/auth.filter';
import { AuthenticationGuard } from 'src/guard/authentication/authentication.guard';
import multerOptions from 'src/multer/multer.config';
import { ApmService } from 'src/service/apm/apm.service';
import {
  APM,
  APMAddresses,
  APMCost,
  APMDetails,
  OperatingHours,
} from 'src/types';

@Controller('apm')
@UseGuards(AuthenticationGuard)
@UseFilters(AuthFilter)
export class ApmController {
  constructor(private apmService: ApmService) {}

  @Get('')
  @Render('apm/index')
  async findAll() {
    return {
      payload: await this.apmService.findAll(),
    };
  }

  @Get('detail/:apmid')
  @Render('apm/detailed/index')
  async find(@Req() request: Request) {
    return {
      payload: await this.apmService.find(request.params.apmid),
    };
  }

  @Get('add')
  @Render('apm/add-apm/index')
  addNewAPMRender() {}

  @Post('add')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'pictureurl', maxCount: 1 },
        { name: 'picture_url_2', maxCount: 1 },
      ],
      multerOptions,
    ),
  )
  async addNewAPM(
    @Body() body: APM & APMDetails & APMAddresses & APMCost & OperatingHours,
    @UploadedFiles()
    files: {
      pictureurl: Express.Multer.File;
      picture_url_2: Express.Multer.File;
    },
    @Res() response: Response,
  ) {
    const apm: APM = {
      apmid: '',
      owned_by: body.owned_by,
      paper_amount: body.paper_amount,
      pictureurl: '',
      picture_url_2: '',
      printername: body.printername,
      status: body.status,
    };

    const apmDetail: APMDetails = {
      apmid: '',
      bothsideprint: body.bothsideprint ?? false,
      bwprint: body.bwprint ?? false,
      colorprint: body.colorprint ?? false,
      layout: body.layout,
      id: 0,
      papersize: body.papersize,
      type: body.type,
    };

    const apmAddress: APMAddresses = {
      address1: body.address1,
      address2: body.address2,
      apmid: '',
      city: body.city,
      state: body.city,
      lat: body.lat,
      lng: body.lng,
    };

    const apmCosts: APMCost = {
      apmid: '',
      black_white_both: body.black_white_both,
      black_white_single: body.black_white_single,
      color_both: body.color_both,
      color_single: body.color_single,
      service_fee: body.service_fee,
    };

    const operatingHours: OperatingHours = {
      apmid: '',
      id: 0,
      monday: body.monday,
      friday: body.friday,
      saturday: body.saturday,
      sunday: body.sunday,
      thursday: body.thursday,
      tuesday: body.tuesday,
      wednesday: body.wednesday,
    };

    try {
      await this.apmService.addApm(
        apm,
        apmDetail,
        apmAddress,
        apmCosts,
        operatingHours,
      );
      response.redirect('/apm');
    } catch (error) {
      response.render('error', {
        payload: {
          error: error,
        },
      });
    }
  }
}
