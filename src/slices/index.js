import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// Authentication
import LoginReducer from "./auth/login/reducer";
import AccountReducer from "./auth/register/reducer";
import ForgetPasswordReducer from "./auth/forgetpwd/reducer";
import ProfileReducer from "./auth/profile/reducer";

//Calendar
import CalendarReducer from "./calendar/reducer";
//Chat
import chatReducer from "./chat/reducer";
//Ecommerce
import EcommerceReducer from "./ecommerce/reducer";

//Project
import ProjectsReducer from "./projects/reducer";

// Tasks
import TasksReducer from "./tasks/reducer";

//Crypto
import CryptoReducer from "./crypto/reducer";

//TicketsList
import TicketsReducer from "./tickets/reducer";
//Crm
import CrmReducer from "./crm/reducer";

//Invoice
import InspectionsReducer from "./inspections/reducer";

//Mailbox
import MailboxReducer from "./mailbox/reducer";

// Dashboard Analytics
import DashboardAnalyticsReducer from "./dashboardAnalytics/reducer";

// Dashboard CRM
import DashboardCRMReducer from "./dashboardCRM/reducer";

// Dashboard Ecommerce
import DashboardEcommerceReducer from "./dashboardEcommerce/reducer";

// Dashboard Cryto
import DashboardCryptoReducer from "./dashboardCrypto/reducer";

// Dashboard Cryto
import DashboardProjectReducer from "./dashboardProject/reducer";

// Dashboard NFT
import DashboardNFTReducer from "./dashboardNFT/reducer";

// Pages > Team
import TeamDataReducer from "./team/reducer";

// File Manager
import FileManagerReducer from "./fileManager/reducer";

// To do
import TodosReducer from "./todos/reducer";

// Job
import JobReducer from "./jobs/reducer";

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

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Login: LoginReducer,
  Account: AccountReducer,
  ForgetPassword: ForgetPasswordReducer,
  Profile: ProfileReducer,
  Calendar: CalendarReducer,
  Chat: chatReducer,
  Projects: ProjectsReducer,
  Ecommerce: EcommerceReducer,
  Tasks: TasksReducer,
  Crypto: CryptoReducer,
  Tickets: TicketsReducer,
  Crm: CrmReducer,
  Inspections: InspectionsReducer,
  Mailbox: MailboxReducer,
  DashboardAnalytics: DashboardAnalyticsReducer,
  DashboardCRM: DashboardCRMReducer,
  DashboardEcommerce: DashboardEcommerceReducer,
  DashboardCrypto: DashboardCryptoReducer,
  DashboardProject: DashboardProjectReducer,
  DashboardNFT: DashboardNFTReducer,
  Team: TeamDataReducer,
  FileManager: FileManagerReducer,
  Todos: TodosReducer,
  Jobs: JobReducer,
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
});

export default rootReducer;
