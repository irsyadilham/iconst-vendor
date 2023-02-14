export interface Address {
  line_1: string;
  line_2?: string;
  postcode: number;
  city: string;
  district: string;
  state: string;
}

export interface service {
  id: number;
  name: string;
}

export interface CompanyDetails {
  id?: number;
  company_name?: string;
  credential_file_url?: string;
  address?: Address;
  services?: service[];
}

export interface PersonalDetails {
  name: string;
  email: string;
  contact_no: string;
}

export default interface Profile {
  personalDetails: PersonalDetails | null; 
  companyDetails: CompanyDetails | null;
  credential: any;
}