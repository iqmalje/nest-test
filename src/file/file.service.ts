import { Injectable } from '@nestjs/common';
import { supabase } from 'src/db/supabase-connection';
import { File } from 'src/types';

@Injectable()
export class FileService {
  async find(fileId: string): Promise<File> {
    const { data, error } = await supabase
      .from('files')
      .select('*')
      .eq('fileid', fileId)
      .single();

    if (error) {
      throw error.message;
    }

    return {
      accountid: data.accountid,
      fileid: data.fileid,
      filename: data.filename,
      pagecount: data.pagecount,
      fileurl: supabase.storage
        .from('files')
        .getPublicUrl(`${data.fileid}/print.pdf`).data.publicUrl,
    };
  }
}
