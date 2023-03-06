import type { Address } from './address';
import type { Service } from './service';

export type CompanyDetails = {
  id?: number;
  company_name?: string;
  credential_file_url?: string;
  address?: Address;
  services?: Service[];
  rating?: number;
}

export type PersonalDetails = {
  name: string;
  email: string;
  contact_no: string;
}

export type Register = {
  personalDetails: PersonalDetails | null; 
  companyDetails: CompanyDetails | null;
  credential: any;
}