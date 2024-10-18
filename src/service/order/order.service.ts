import { Injectable } from '@nestjs/common';
import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from 'src/db/supabase-connection';
import { Order, QueryOptions } from 'src/types';

@Injectable()
export class OrderService {
  async create(order: Order) {
    const { error } = await supabase.from('orders').insert({
      orderid: order.orderId,
      accountid: order.accountId,
      fileid: order.fileId,
      apmid: order.apmId,
      cost: order.cost,
      status: order.status,
      date: order.date,
      rating: order.rating,
      status_reason: order.statusReason,
      has_paid: order.hasPaid,
      target_apm: order.targetApm,
    });

    if (error !== null) {
      // something went wrong
      throw error.message;
    }
  }

  async findAll(options?: QueryOptions) {
    // fetch from database

    let errorDB: PostgrestError;
    let dataDB: Order[];
    if (options) {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('date', { ascending: false })
        .limit(options.limit);

      errorDB = error;
      dataDB = data;
    } else {
      const { data, error } = await supabase.from('orders').select('*');

      errorDB = error;
      dataDB = data;
    }
    if (errorDB !== null) {
      // something went wrong
      throw errorDB.message;
    }

    return dataDB;
  }

  async find(orderId: string): Promise<Order> {
    // try to give the local one first
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('orderid', orderId)
      .single();

    if (error) {
      throw error.message;
    }

    return {
      accountId: data.accountid,
      apmId: data.apmid,
      cost: data.cost,
      date: new Date(Date.parse(data.date)),
      fileId: data.fileid,
      hasPaid: data.has_paid,
      orderId: data.orderid,
      rating: data.rating,
      status: data.status,
      statusReason: data.status_reason,
      targetApm: data.target_apm,
    };
  }

  async findOrderSettings(orderId: string) {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('orderid', orderId)
      .single();

    if (error) throw error.message;

    return data;
  }

  async search(query: string): Promise<Order[]> {
    const { data, error } = await supabase.rpc('search_orders', {
      keyword: query,
    });

    if (error) throw error.message;

    return data;
  }
}
