import LetterDashboard from "../letters/LetterDashboard";


export const all_routes = {
  // home routes
  homeOne: "/index",
  homeTwo: "/index-2",
  homeThree: "/index-3",

  // auth routes
  register: "/authentication/register",
  login: "/authentication/login",
  forgotPassword: "/authentication/forgot-password",
  resetPassword: "/authentication/reset-password",

  // // booking routes
  // booking: "/pages/booking",
  // bookingAddon: "/pages/booking-addon",
  // bookingCheckout: "/pages/booking-checkout",
  // bookingDetail: "/pages/booking-detail",
  // bookingPayment: "/pages/booking-payment",
  // bookingSuccess: "/pages/booking-success",
  // invoiceDetails: "/pages/invoice-details",
  // bookingCalendar: "/pages/booking-calendar",

  // // user routes
  // userBookingComplete: "/user/user-booking-complete",
  // userBookingInprogress: "/user/user-booking-inprogress",
  // userBookings: "/user/user-bookings",
  // userMessages: "/user/user-messages",
  // userDashboard: "/user/user-dashboard",
  // userReviews: "/user/user-reviews",
  // userWishlist: "/user/user-wishlist",
  // userPayment: "/user/user-payment",
  // userSettings: "/user/user-settings",
  // userSecurity: "/user/user-security",
  // preference: "/user/user-preferences",
  // notification: "/user/user-notifications",
  // userIntegration: "/user/user-integration",
  // userWallet: "/user/user-wallet",
  // userBookingCancelled: "/user/user-booking-cancelled",
  // userBookingUpcoming: "/user/user-booking-upcoming",
  // BookingCompleteCalendar: "/user/booking-complete-calendar",
  // BookingCancelledCalendar: "/user/booking-cancelled-calendar",
  // BookingInprogressCalendar: "/user/booking-inprogress-calendar",
  // BookingUpcomingCalendar: "/user/booking-upcoming-calendar",
  // BookingCalendar: "/user/bookings-calendar",


  // // blog routes
  // blogList: "/blog/blog-list",
  // blogGrid: "/blog/blog-grid",
  // blogDetails: "/blog/blog-details",


  // letters
  letterDashboard: "/listings/letters",
  letterDetails: "/listings/letters/view/:id",
  letterEdit: "/listings/letters/edit/:id",
  letterCreate: "/listings/letters/add",
  // authoriry
  authorityDashboard: "/listings/authorities",

  // services
  serivceDetails: "/listings/service-details/:id",

  // booging
  bookingDetails: "/listings/booking/view/:id",
  bookingDashboard: "/listings/booking",
  bookingEdit: "/listings/booking/edit/:id",
  bookingCreate: "/listings/booking/add",
  
  //Categoriea
  categoryDashboard:"/listings/categories",
  categoryDetails: "/listings/categories/view/:id",
  categoryEdit: "/listings/categories/edit/:id",
  categoryCreate: "/listings/categories/add",
  //Services
  serviceDashboard:"/listings/services",
  ServiceDetails: "/listings/services/view/:id",
  serviceEdit: "/listings/services/edit/:id",
  serviceCreate: "/listings/services/add",
  //Cars

  carDashboard:"/listings/cars",
  carDetails: "/listings/cars/view/:id",
  carEdit: "/listings/cars/edit/:id",
  carCreate: "/listings/cars/add",

  //Notifications

  notificationDashboard:"/listings/notifications",
  //WorkingTimes

  WorkingTimeDashboard:"/listings/WorkingTimeDashboard"
};
