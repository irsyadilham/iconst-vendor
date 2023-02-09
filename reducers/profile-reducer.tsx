import Profile  from '../interfaces/profile-interface';

export const initialState: Profile = {
  personalDetails: null,
  companyDetails: null,
  companyAddress: null,
  services: [],
  locations: []
};

export interface Action {
  type: string;
  payload?: any;
}

export default (state: Profile, action: Action): Profile => {
  switch(action.type) {
    case 'PERSONAL_DETAILS_ADD':
      return {
        ...state,
        personalDetails: action.payload
      }
    case 'COMPANY_DETAILS_ADD':
      return {
        ...state,
        companyDetails: action.payload
      }
    case 'COMPANY_ADDRESS_ADD':
      return {
        ...state,
        companyAddress: action.payload
      }
    case 'SERVICES_ADD':
      return {
        ...state,
        services: action.payload
      }
    case 'LOCATIONS_ADD':
      return {
        ...state,
        locations: action.payload
      }
    default:
      return state;
  }
}