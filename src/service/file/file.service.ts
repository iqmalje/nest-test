import { Injectable } from '@nestjs/common';
import { supabase } from 'src/db/supabase-connection';
import { File } from 'src/types';

@Injectable()
export class FileService {
  async findAll(): Promise<File[]> {
    const { data, error } = await supabase.from('files').select('*').limit(50);

    if (error) throw error.message;

    return data.map((fileRAW): File => {
      const fileurl = supabase.storage
        .from('files')
        .getPublicUrl(`${fileRAW.fileid}/print.pdf`).data.publicUrl;
      return {
        accountid: fileRAW.accountid,
        fileid: fileRAW.fileid,
        filename: fileRAW.filename,
        pagecount: fileRAW.pagecount,
        fileurl: fileurl,
      };
    });
  }

  async find(fileId: string): Promise<File> {
    const { data, error } = await supabase
      .from('files')
      .select('*')
      .eq('fileid', fileId)
      .single();

    if (error) {
      throw error.message;
    }

    //get file extension
    const extension = (data.filename as string).split('.').slice(-1)[0];

    return {
      accountid: data.accountid,
      fileid: data.fileid,
      filename: data.filename,
      pagecount: data.pagecount,
      fileurl: supabase.storage
        .from('files')
        .getPublicUrl(`${data.fileid}/print.${extension}`).data.publicUrl,
    };
  }

  async search(query): Promise<File[]> {
    const { data, error } = await supabase
      .from('files')
      .select('*')
      .like('filename', `%${query}%`)
      .limit(50);

    if (error) throw error.message;

    return data.map((fileRAW): File => {
      const fileurl = supabase.storage
        .from('files')
        .getPublicUrl(`${fileRAW.fileid}/print.pdf`).data.publicUrl;
      return {
        accountid: fileRAW.accountid,
        fileid: fileRAW.fileid,
        filename: fileRAW.filename,
        pagecount: fileRAW.pagecount,
        fileurl: fileurl,
      };
    });
  }
}
