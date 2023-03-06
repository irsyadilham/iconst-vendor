import type { Address } from './address';
import type { Service } from './service';

export type AirtimeStatus = {
  active: boolean;
  expired_date: string;
}

export type Vendor = {
  id: number;
  company_name: string;
  credential_file_url: string;
  address: Address;
  services: Service[];
  airtime_status: AirtimeStatus;
  user_id: number;
  rating: number;
}