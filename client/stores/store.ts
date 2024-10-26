'use client';

import { createContext, useContext } from "react";
import UserStore from "./userStore";

import DocumentStore from "./documentStore";
import AuthorityStore from "./authorityStore";

interface Store {
    userStore: UserStore,

    documentStore: DocumentStore,
    authorityStore: AuthorityStore,
}

export const store: Store = {
    userStore: new UserStore(),
    documentStore: new DocumentStore,
    authorityStore: new AuthorityStore,
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
