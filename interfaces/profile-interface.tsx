export interface Address {
  line_1: string;
  line_2?: string;
  postcode: number;
  city: string;
  district: string;
  state: string;
}

export interface CompanyDetails {
  company_name?: string;
  address?: Address;
  services?: string[];
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