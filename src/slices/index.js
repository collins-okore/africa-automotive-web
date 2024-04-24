import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// Authentication
import LoginReducer from "./auth/login/reducer";
import AccountReducer from "./auth/register/reducer";
import ForgetPasswordReducer from "./auth/forgetpwd/reducer";
import ProfileReducer from "./auth/profile/reducer";

//Invoice
import InspectionsReducer from "./inspections/reducer";

// Dashboard Ecommerce
import DashboardEcommerceReducer from "./dashboardEcommerce/reducer";

// API Key
import APIKeyReducer from "./apiKey/reducer";

// Vehicle Make
import VehicleMakeReducer from "./vehicleMake/reducer";

// Vehicle Make
import VehicleModelReducer from "./vehicleModel/reducer";

// Vehicle Body Color
import VehicleBodyColorReducer from "./vehicleBodyColor/reducer";

// Vehicle Body Type
import VehicleBodyTypeReducer from "./vehicleBodyType/reducer";

// Inspection Fee
import InspectionFeeReducer from "./inspectionFee/reducer";

// Currency
import CurrencyReducer from "./currency/reducer";

// Country
import CountryReducer from "./country/reducer";

// Country
import ClientReducer from "./client/reducer";

// Payment Mode
import PaymentModeReducer from "./paymentMode/reducer";

// Payment Type
import PaymentTypeReducer from "./paymentType/reducer";

// User
import UserReducer from "./user/reducer";

// Fuel Type
import FuelTypeReducer from "./vehicleFuelType/reducer";
import TransmissionReducer from "./transmission/reducer";
import PaymentReducer from "./payment/reducer";

// Bank
import BankReducer from "./bank/reducer";

// Transmissions

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Login: LoginReducer,
  Account: AccountReducer,
  ForgetPassword: ForgetPasswordReducer,
  Profile: ProfileReducer,
  Inspections: InspectionsReducer,
  DashboardEcommerce: DashboardEcommerceReducer,
  APIKey: APIKeyReducer,
  VehicleMake: VehicleMakeReducer,
  VehicleModel: VehicleModelReducer,
  VehicleBodyColor: VehicleBodyColorReducer,
  VehicleBodyType: VehicleBodyTypeReducer,
  InspectionFee: InspectionFeeReducer,
  Currency: CurrencyReducer,
  Country: CountryReducer,
  Client: ClientReducer,
  PaymentMode: PaymentModeReducer,
  PaymentType: PaymentTypeReducer,
  User: UserReducer,
  FuelType: FuelTypeReducer,
  Transmission: TransmissionReducer,
  Payment: PaymentReducer,
  Bank: BankReducer,
});

export default rootReducer;
