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


interface Store {
    userStore: UserStore,
    documentStore: DocumentStore,
    authorityStore: AuthorityStore,
    carStore: CarStore,
    categoryStore: CategoryStore,
    serviceStore: ServiceStore,
    workingTimeStore: WorkingTimeStore,
    bookingStore: BookingStore,
    notificationStore: NotificationStore,
    contactStore:ContactStore,
    paymentStore:PaymentStore,
}

export const store: Store = {
    userStore: new UserStore(),
    documentStore: new DocumentStore(),
    authorityStore: new AuthorityStore(),
    carStore: new CarStore(),
    categoryStore: new CategoryStore(),
    serviceStore: new ServiceStore(),
    workingTimeStore: new WorkingTimeStore(),
    bookingStore: new BookingStore(),
    notificationStore: new NotificationStore(),
    contactStore: new ContactStore(),
    paymentStore:new PaymentStore(),

}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
