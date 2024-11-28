import React from "react";
import { Navigate } from "react-router";
import { all_routes } from "./all_routes";

import SignUp from "../authentication/signup";
import Login from "../authentication/login";
import ForgotPassword from "../authentication/forgotpassword";
import ResetPassword from "../authentication/resetpassword";
import HomeOne from "../home/home-one/home-one";
import LetterDashboard from "../letters/LetterDashboard";
import LetterDetails from "../letters/LetterDetails";
import LetterEdit from "../letters/LetterEdit";
import LetterFormIndex from "../letters/create/LetterFormIndex";
import AuthorityDashboard from "../authorities/AuthorityDashboard";
import BookingDetails from "../booking/BookingDetails";
import CategoryDashboard from "../Categories/CategoryDashboard";


import CategoryForm from "../Categories/CategoryForm";
import BookingDashboard from "../booking/BookingDashboard";
import CarDashboard from "../cars/CarDashboard";
import NotificationDashboard from "../notifications/NotificationDashboard";
import WorkingTimeDashboard from "../workingTimes/WorkingTimeDashboard";
import ServiceDetails from "../services/ServiceDetails";
import ServiceDashboard from "../services/ServiceDashboard";
import ServiceCreate from "../services/ServiceCreate";
import ServiceUpdate from "../services/ServiceUpdate";
import ServiceList from "../services/ServiceList";

const routes = all_routes;

export const publicRoutes = [
  {
    path: routes.homeOne,
    element: <HomeOne />,
  },
  {
    path: "/",
    element: <Navigate to="/" />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
  {
    path: routes.serviceList,
    element: <ServiceList />,
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
