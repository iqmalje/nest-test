import { Injectable } from '@nestjs/common';
import { supabase } from 'src/db/supabase-connection';
import { Account } from 'src/types';

@Injectable()
export class AccountService {
  async find(userId: string): Promise<Account> {
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('accountid', userId)
      .single();

    if (error) {
      throw error.message;
    }

    return {
      accountId: data.accountid,
      email: data.email,
      fullname: data.fullname,
      phone: data.phone,
      profilepic: data.profilepic,
      status: data.status,
    };
  }
}
