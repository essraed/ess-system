import React from "react";
import { Navigate } from "react-router";
import { all_routes } from "./all_routes";

import SignUp from "../authentication/signup";
import Login from "../authentication/login";
import ForgotPassword from "../authentication/forgotpassword";
import ResetPassword from "../authentication/resetpassword";
import BookingCheckout from "../booking/booking-checkout";
import Booking from "../booking/booking";
import Contact from "../contact/contact";
import BookingDetail from "../booking/booking-detail";
import BookingPayment from "../booking/booking-payment";
import BookingSuccess from "../booking/booking-success";
import HomeOne from "../home/home-one/home-one";
import InvoiceDetails from "../booking/invoice";
import LetterDashboard from "../letters/LetterDashboard";
import LetterDetails from "../letters/LetterDetails";
import LetterEdit from "../letters/LetterEdit";
import LetterFormIndex from "../letters/create/LetterFormIndex";
import AuthorityDashboard from "../authorities/AuthorityDashboard";
import BookingDetails from "../booking/BookingDetails";
import CategoryDashboard from "../Categories/CategoryDashboard";
import ServiceDashboard from "../Services/ServiceDashboard";
import ServiceCreate from "../Services/ServiceCreate";
import ServiceUpdate from "../Services/ServiceUpdate";
import CategoryForm from "../Categories/CategoryForm";
import BookingDashboard from "../booking/BookingDashboard";
import ServiceDetails from "../Services/ServiceDetails";
import CarDashboard from "../cars/CarDashboard";
import NotificationDashboard from "../notifications/NotificationDashboard";
import WorkingTimeDashboard from "../workingTimes/WorkingTimeDashboard";

// import BookingCalendar from "../user/bookings-calendar";

const routes = all_routes;

export const publicRoutes = [
  {
    path: routes.homeOne,
    element: <HomeOne />,
  },
  {
    path: "/",
    element: <Navigate to="/index" />,
  },
  {
    path: "*",
    element: <Navigate to="/index" />,
  },

  // {
  //   path: routes.contactUs,
  //   element: <Contact />,
  // },
];

export const listingroutes = [
  // letters
  {
    path: routes.letterDashboard,
    element: <LetterDashboard />,
  },
  {
    path: routes.letterDetails,
    element: <LetterDetails />,
  },
  {
    path: routes.letterEdit,
    element: <LetterEdit />,
  },
  {
    path: routes.letterCreate,
    element: <LetterFormIndex />,
  },
  // authority
  {
    path: routes.authorityDashboard,
    element: <AuthorityDashboard />,
  },
  // services
  {
    path: routes.serivceDetails,
    element: <ServiceDetails />,
  },
  // booking
  {
    path: routes.bookingDashboard,
    element: <BookingDashboard />,
  },
  {
    path: routes.bookingDetails,
    element: <BookingDetails />,
  },
  // category
  {
    path: routes.categoryDashboard,
    element: <CategoryDashboard />,
  },
  {
    path: routes.categoryCreate,
    element: <CategoryForm />,
  },
  // Service
  {
    path: routes.serviceDashboard,
    element: <ServiceDashboard />,
  },
  {
    path: routes.serviceCreate,
    element: <ServiceCreate />,
  },
  {
    path: routes.serviceEdit,
    element: <ServiceUpdate />,
  },
  // Car
  {
    path: routes.carDashboard,
    element: <CarDashboard />,
  },
  // Notification
  {
    path: routes.notificationDashboard,
    element: <NotificationDashboard />,
  },
  // WorkingTime
  {
    path: routes.WorkingTimeDashboard,
    element: <WorkingTimeDashboard />,
  },
];

// export const pageroutes = [
//   {
//     path: routes.bookingCheckout,
//     element: <BookingCheckout />,
//   },
//   {
//     path: routes.booking,
//     element: <Booking />,
//   },
//   {
//     path: routes.invoiceDetails,
//     element: <InvoiceDetails />,
//   },
//   {
//     path: routes.bookingCheckout,
//     element: <BookingCheckout />,
//   },
//   {
//     path: routes.bookingDetail,
//     element: <BookingDetail />,
//   },
//   {
//     path: routes.bookingPayment,
//     element: <BookingPayment />,
//   },
//   {
//     path: routes.bookingSuccess,
//     element: <BookingSuccess />,
//   },
// ];

export const authenticationRoute = [
  {
    path: routes.register,
    element: <SignUp />,
  },
  {
    path: routes.login,
    element: <Login />,
  },
  {
    path: routes.forgotPassword,
    element: <ForgotPassword />,
  },
  {
    path: routes.resetPassword,
    element: <ResetPassword />,
  },
];
