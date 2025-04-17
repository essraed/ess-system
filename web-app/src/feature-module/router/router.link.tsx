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
import BookingDashboard from "../booking/BookingDashboard";
import CarDashboard from "../cars/CarDashboard";
import NotificationDashboard from "../notifications/NotificationDashboard";
import WorkingTimeDashboard from "../workingTimes/WorkingTimeDashboard";
import ServiceDetails from "../services/ServiceDetails";
import ServiceDashboard from "../services/ServiceDashboard";
import ServiceCreate from "../services/ServiceCreate";
import ServiceUpdate from "../services/ServiceUpdate";
import ServiceList from "../services/ServiceList";
import AboutUs from "../aboutus/aboutus";
import ContactDashboard from "../contacts/ContactDashboard";
import ContactForm from "../contacts/ContactForm";
import BusinessSetup from "../contacts/BusinessSetup";
import PaymentSuccess from "../payment/PaymentSuccess";
// import PaymentFailed from "../payment/PaymentFailed";
import LostForm from "../losts/LostForm";
import LostDashboard from "../losts/LostDashboard";
import ComplaintForm from "../complaints/ComplaintForm";
import ComplaintDashboard from "../complaints/ComplaintDashboard";
import NotificationsDropdown from "../common/NotificationsDropdown";
import UserDashboard from "../users/UserDashboard";
import UserUpdate from "../users/UserUpdate";
import BookingDocument from "../booking/BookingDocument";
import BlogDashboard from "../blog/BlogDashboard";
import EventDashboard from "../Event/EventDashboard";
import Event from "../Event/Event";
import EventPRO from "../EventPRO/EventPRO";
import CategoryList from "../Categories/CategoryList";
import PrivacyPolicy from "../policy/PrivacyPolicy ";
import TrackOrder from "../booking/TrackOrder";


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
    path: routes.admin,
    element: <Login />,
  },
  {
    path: routes.track,
    element: <TrackOrder />,
  },
  {
    path: routes.categories,
    element: <CategoryList />,
  },
  {
    path: routes.serviceList,
    element: <ServiceList />,
  },
  {
    path: routes.allServices,
    element: <ServiceList />,
  },
  {
    path: routes.aboutUs,
    element: <AboutUs />,
  },
  {
    path: routes.contactUs,
    element: <ContactForm />,
  },
  {
    path: routes.businessSetup,
    element: <BusinessSetup />,
  },
  // {
  //   path: routes.event,
  //   element: <Event />,
  // },
  // {
  //   path: routes.eventPRO,
  //   element: <EventPRO />,
  // },
  {
    path: routes.Losts,
    element: <LostForm />,
  },
  {
    path: routes.Complaints,
    element: <ComplaintForm />,
  },
  // services
  {
    path: routes.serivceDetails,
    element: <ServiceDetails />,
  },
  {
    path: routes.bookingDetails,
    element: <BookingDetails />,
  },
  {
    path: routes.bookingDocument,
    element: <BookingDocument />,
  },
  {
    path: routes.paymentSuccess,
    element: <PaymentSuccess />,
  },
  // {
  //   path: routes.paymentFailed,
  //   element: <PaymentFailed />,
  // },
  {
    path: routes.bookingDetails,
    element: <BookingDetails />,
  },
  {
    path: routes.notificationDropdown,
    element: <NotificationsDropdown />,
  },
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

  // booking
  {
    path: routes.bookingDashboard,
    element: <BookingDashboard />,
  },
  // category
  {
    path: routes.categoryDashboard,
    element: <CategoryDashboard />,
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
  // Blog
  {
    path: routes.blogDashboard,
    element: <BlogDashboard />,
  },
  // Blog
  {
    path: routes.EventDashboard,
    element: <EventDashboard />,
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
  // Contacts
  {
    path: routes.contactDashboard,
    element: <ContactDashboard />,
  },
  // Losts
  {
    path: routes.lostDashboard,
    element: <LostDashboard />,
  },

  {
    path: routes.ComplaintDashboard,
    element: <ComplaintDashboard />,
  },
  {
    path: routes.UserDashboard,
    element: <UserDashboard />,
  },
  {
    path: routes.UserEdit,
    element: <UserUpdate />,
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
  {
    path: routes.PrivacyPolicy,
    element: <PrivacyPolicy />,
  },
];
