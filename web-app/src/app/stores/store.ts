import { createContext, useContext } from "react";
import UserStore from "./userStore";
import DocumentStore from "./documentStore";
import AuthorityStore from "./authorityStore";
import CarStore from "./carStore";
import CategoryStore from "./categoryStore";
import ServiceStore from "./serviceStore";
import WorkingTimeStore from "./workingTimeStore";
import BookingStore from "./bookingStore";
import NotificationStore from "./notificationStore";
import ContactStore from "./contactStore";
import PaymentStore from "./paymentStore";
import LostStore from "./lostStore";
import ComplaintStore from "./complaintStore";
import NationalityStore from "./nationalityStore";
import BlogStore from "./blogStore";
import ClientStore from "./clientStore";
import EventStore from "./eventStore";
import EventPROStore from "./eventPROStore";
import TestimonialStore from "./testimonialStore";


interface Store {
  userStore: UserStore;
  documentStore: DocumentStore;
  authorityStore: AuthorityStore;
  carStore: CarStore;
  blogStore: BlogStore;
  categoryStore: CategoryStore;
  serviceStore: ServiceStore;
  workingTimeStore: WorkingTimeStore;
  bookingStore: BookingStore;
  notificationStore: NotificationStore;
  contactStore: ContactStore;
  paymentStore: PaymentStore;
  lostStore: LostStore;
  complaintStore:ComplaintStore;
  nationalityStore:NationalityStore;
  clientStore:ClientStore;
  eventStore:EventStore;
  eventPROStore:EventPROStore;
  testimonialStore:TestimonialStore;

}

export const store: Store = {
  userStore: new UserStore(),
  documentStore: new DocumentStore(),
  authorityStore: new AuthorityStore(),
  carStore: new CarStore(),
  blogStore:new BlogStore(),
  categoryStore: new CategoryStore(),
  serviceStore: new ServiceStore(),
  workingTimeStore: new WorkingTimeStore(),
  bookingStore: new BookingStore(),
  notificationStore: new NotificationStore(),
  contactStore: new ContactStore(),
  paymentStore: new PaymentStore(),
  lostStore: new LostStore(),
  complaintStore:new ComplaintStore(),
  nationalityStore:new NationalityStore(),
  clientStore:new ClientStore(),
  eventStore:new EventStore(),
  eventPROStore:new EventPROStore(),
  testimonialStore:new TestimonialStore(),

};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
