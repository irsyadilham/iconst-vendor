import type { Address } from './address';
import type { Service } from './service';
import type { Vendor } from './vendor';
import type { Client } from './client';

type SupportingDocument = {
  file_url: string;
}

type Status = {
  name: string;
}

export type JobVendor = {
  approved: boolean;
  quotation_url: string;
  choosen: boolean;
  vendor: Vendor;
  price: string;
}

export type Job = {
  id: number;
  service: Service;
  title: string;
  duration: number;
  description: string;
  location?: Address;
  supporting_documents: SupportingDocument[];
  status: Status;
  date: string;
  expires_in: number;
  billcode: string;
  paid: boolean;
  vendors: JobVendor[];
  client: Client;
  vendor_completed: boolean;
  client_completed: boolean;
  rating: number;
  is_expired: boolean;
}