import { Injectable } from '@nestjs/common';
import { supabase } from 'src/db/supabase-connection';
import {
  APM,
  APMAddresses,
  APMCost,
  APMDetails,
  OperatingHours,
} from 'src/types';
import * as fs from 'fs';

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

  async addApm(
    apm: APM,
    apmDetail: APMDetails,
    apmAddress: APMAddresses,
    apmCost: APMCost,
    operatingHours: OperatingHours,
  ) {
    delete apm.apmid;
    delete apm.pictureurl;
    delete apm.picture_url_2;

    const { data, error } = await supabase
      .from('apms')
      .insert(apm)
      .select('apmid')
      .single();

    if (error) {
      throw error.message;
    }

    apm.apmid = data.apmid;

    const bufferFile1 = fs.readFileSync('./uploads/picture1.png');
    const bufferFile2 = fs.readFileSync('./uploads/picture2.png');

    // upload pictures
    await supabase.storage
      .from('apms')
      .upload(`${apm.apmid}/photo1.png`, bufferFile1);
    await supabase.storage
      .from('apms')
      .upload(`${apm.apmid}/photo2.png`, bufferFile2);

    await supabase
      .from('apms')
      .update({
        pictureurl: supabase.storage
          .from('apms')
          .getPublicUrl(`${apm.apmid}/photo1.png`).data.publicUrl,
        picture_url_2: supabase.storage
          .from('apms')
          .getPublicUrl(`${apm.apmid}/photo1.png`).data.publicUrl,
      })
      .eq('apmid', apm.apmid);

    apmDetail.apmid = apm.apmid;
    delete apmDetail.id;
    await supabase.from('apmdetails').insert(apmDetail);

    apmAddress.apmid = apm.apmid;
    await supabase.from('apmaddresses').insert(apmAddress);

    apmCost.apmid = apm.apmid;
    await supabase.from('apm_costs').insert(apmCost);

    operatingHours.apmid = apm.apmid;
    delete operatingHours.id;
    await supabase.from('operatinghours').insert(operatingHours);
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
