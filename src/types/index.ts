export interface User {
  userID: string;
  name: string;
  age: number;
}

export interface ViewPayload<T> {
  payload: T;
}

export interface Order {
  orderId: string;
  accountId: string;
  fileId: string;
  apmId: string;
  cost: number;
  status: string;
  date: Date;
  rating: number;
  statusReason: string;
  hasPaid: boolean;
  targetApm: string;
}

export interface OrderSettings {
  orderId: string;
  layout: string;
  color: string;
  side: string;
  pagepersheet: string;
  copies: number;
  pages: string;
}

export interface Account {
  accountId: string;
  fullname: string;
  email: string;
  phone: string;
  profilepic: string;
  status: string;
}

export interface File {
  fileid: string;
  filename: string;
  pagecount: number;
  accountid: string;
  fileurl?: string;
}

export interface QueryOptions {
  limit: number;
}
