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
  start: number;
  end: number;
}

export interface APM {
  apmid: string;
  printername: string;
  pictureurl: string;
  picture_url_2: string;
  paper_amount: number;
  owned_by: string;
  status: string;
}

export interface APMDetails {
  id: number;
  apmid: string;
  type: string;
  bwprint: boolean;
  colorprint: boolean;
  bothsideprint: boolean;
  papersize: string;
  layout: string;
}

export interface APMAddresses {
  apmid: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
}

export interface APMCost {
  apmid: string;
  black_white_single: number;
  black_white_both: number;
  color_single: number;
  color_both: number;
  service_fee: number;
}

export interface OperatingHours {
  id: number;
  apmid: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}
