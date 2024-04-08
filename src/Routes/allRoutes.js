import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard

import Dashboard from "../pages/Dashboard";

// Inspection
import NewInspection from "../pages/NewInspection";
import Inspections from "../pages/Inspections";
import NewInspections from "../pages/Inspections/NewInspections";
import Inspect from "../pages/Inspections/Inspect";
import CompletedInspections from "../pages/Inspections/CompletedInspections";
import FailedInspections from "../pages/Inspections/FailedInspections";
import ViewInspection from "../pages/Inspections/ViewInspection";
import Payments from "../pages/Payments";
import Verification from "../pages/Verification";
import VehicleMake from "../pages/VehicleMake";
import VehicleModel from "../pages/VehicleModel";
import VehicleBodyColor from "../pages/VehicleBodyColor";
import VehicleBodyType from "../pages/VehicleBodyType";
import Reports from "../pages/Reports";
import InspectionFees from "../pages/InspectionFees";
import PaidInvoices from "../pages/Invoices/PaidInvoices";
import UnpaidInvoices from "../pages/Invoices/UnpaidInvoices";

// Clients
import Clients from "../pages/Clients";

//Chat

// //Ecommerce Pages

//AuthenticationInner pages
import BasicSignIn from "../pages/AuthenticationInner/Login/BasicSignIn";
import CoverSignIn from "../pages/AuthenticationInner/Login/CoverSignIn";
import BasicSignUp from "../pages/AuthenticationInner/Register/BasicSignUp";
import CoverSignUp from "../pages/AuthenticationInner/Register/CoverSignUp";
import BasicPasswReset from "../pages/AuthenticationInner/PasswordReset/BasicPasswReset";

//APi Key

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

// User Profile
import Users from "../pages/Users";

// Print Report Routes
import Receipt from "../pages/PrintReports/Receipt";

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/index", component: <Dashboard /> },
  { path: "/new-inspection", component: <NewInspection /> },
  { path: "/inspections", component: <Inspections /> },
  { path: "/inspections/new", component: <NewInspections /> },
  { path: "/inspections/completed", component: <CompletedInspections /> },
  { path: "/inspections/failed", component: <FailedInspections /> },
  { path: "/inspections/inspect/:id", component: <Inspect /> },
  { path: "/inspections/view/:id", component: <ViewInspection /> },
  { path: "/clients", component: <Clients /> },
  { path: "/payments", component: <Payments /> },
  { path: "/verification", component: <Verification /> },
  { path: "/invoices/paid", component: <PaidInvoices /> },
  { path: "/invoices/unpaid", component: <UnpaidInvoices /> },
  { path: "/vehicle-make", component: <VehicleMake /> },
  { path: "/vehicle-model", component: <VehicleModel /> },
  { path: "/body-type", component: <VehicleBodyType /> },
  { path: "/body-color", component: <VehicleBodyColor /> },
  { path: "/inspection-fees", component: <InspectionFees /> },
  { path: "/reports", component: <Reports /> },
  { path: "/users", component: <Users /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: "*", component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },

  //AuthenticationInner pages
  { path: "/auth-signin-basic", component: <BasicSignIn /> },
  { path: "/auth-signin-cover", component: <CoverSignIn /> },
  { path: "/auth-signup-basic", component: <BasicSignUp /> },
  { path: "/auth-signup-cover", component: <CoverSignUp /> },
  { path: "/auth-pass-reset-basic", component: <BasicPasswReset /> },
];

const printReportRoutes = [
  { path: "/print-report/receipt", component: <Receipt /> },
];
export { authProtectedRoutes, publicRoutes, printReportRoutes };
