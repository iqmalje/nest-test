import { Injectable } from '@nestjs/common';
import { supabase } from 'src/db/supabase-connection';
import { Account } from 'src/types';

@Injectable()
export class AccountService {
  async findAll(): Promise<Account[]> {
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .limit(50);

    if (error) throw error.message;

    return data.map((accountRAW) => {
      return {
        accountId: accountRAW.accountid,
        fullname: accountRAW.fullname,
        email: accountRAW.email,
        phone: accountRAW.phone,
        profilepic: accountRAW.profilepic,
        status: accountRAW.status,
      };
    });
  }

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

  async search(query: string) {
    console.log(query);
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .or(
        `email.like.%${query}%,fullname.like.%${query}%,phone.like.%${query}%`,
      )
      .limit(50);

    if (error) throw error.message;
    return data.map((accountRAW) => {
      return {
        accountId: accountRAW.accountid,
        fullname: accountRAW.fullname,
        email: accountRAW.email,
        phone: accountRAW.phone,
        profilepic: accountRAW.profilepic,
        status: accountRAW.status,
      };
    });
  }
}
