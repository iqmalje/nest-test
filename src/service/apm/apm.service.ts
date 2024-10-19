import { Injectable } from '@nestjs/common';
import { supabase } from 'src/db/supabase-connection';
import {
  APM,
  APMAddresses,
  APMCost,
  APMDetails,
  OperatingHours,
} from 'src/types';

export interface APMInformation {
  apm: APM;
  apmDetail: APMDetails;
  apmAddress: APMAddresses;
  apmCost: APMCost;
  operatingHours: OperatingHours;
}

@Injectable()
export class ApmService {
  async findAll(): Promise<APM[]> {
    const { data, error } = await supabase
      .from('apms')
      .select(
        `
        apmid,
        printername,
        status
        `,
      )
      .limit(50);

    if (error) throw error.message;

    return data.map((apmRAW): APM => {
      return {
        apmid: apmRAW.apmid,
        owned_by: undefined,
        paper_amount: undefined,
        picture_url_2: undefined,
        pictureurl: undefined,
        printername: apmRAW.printername,
        status: apmRAW.status,
      };
    });
  }

  async find(apmid: string): Promise<APMInformation> {
    const { data, error } = await supabase
      .from('apms')
      .select(
        `
        *,
        apmdetails (*),
        apmaddresses (*),
        apm_costs (*),
        operatinghours (*)
        `,
      )
      .eq('apmid', apmid)
      .single();

    if (error) throw error.message;

    return {
      apm: {
        apmid: data.apmid,
        pictureurl: data.pictureurl,
        picture_url_2: data.picture_url_2,
        printername: data.printername,
        paper_amount: data.paper_amount,
        status: data.status,
        owned_by: data.owned_by,
      },
      apmAddress: data.apmaddresses,
      apmCost: data.apm_costs,
      apmDetail: data.apmdetails[0],
      operatingHours: data.operatinghours[0],
    };
  }
}
