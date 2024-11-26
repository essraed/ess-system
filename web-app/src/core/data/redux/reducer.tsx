import initialState from "./initial.values";

interface State {
  listing_grid: {
    make: string;
    model: string;
    image: string;
    rating: number;
    features: {
      type: string;
      mileage: string;
      fuel: string;
      power: string;
      year: number;
      capacity: number;
    };
    location: string;
    price: string;
  }[];
  header_data?: any; // Adjust types based on your actual data
  listing_list?: any;
  pricingdata?: any;
  ourTeamData?: any;
  testimonialdata?: any;
  contactdata?: any;
  userwallet_data?: any;
  userpayment_data?: any;
  mobileSidebar?: any;
  current_route?: any;
  current_route_array: any[];
}

interface Action {
  type: string;
  payload?: any; // Adjust based on actual payloads
}

const rootReducer = (
  state: State = initialState,
  action: Action
): State => {

  switch (action.type) {
    case "HEADER_DATA":
      return { ...state, header_data: action.payload };
    case "ListingsData":
      return { ...state, listing_grid: action.payload };
    case "Listings_List_Data":
      return { ...state, listing_list: action.payload };
    case "Pricing_Data":
      return { ...state, pricingdata: action.payload };
    case "Our_team_data":
      return { ...state, ourTeamData: action.payload };
    case "testimonial_data":
      return { ...state, testimonialdata: action.payload };
    case "contact_data":
      return { ...state, contactdata: action.payload };
    case "Userwallet_data":
      return { ...state, userwallet_data: action.payload };
    case "UserPayment_data":
      return { ...state, userpayment_data: action.payload };
    case "MOBILE_SIDEBAR":
      return { ...state, mobileSidebar: action.payload };
    case "CURRENT_ROUTE_DATA":
      return { ...state, current_route: action.payload };
    case "CURRENT_ROUTE_ARRAY_DATA":
      return { ...state, current_route_array: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
