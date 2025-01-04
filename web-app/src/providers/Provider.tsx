import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { store, StoreContext } from "../app/stores/store";
import { Toaster } from "react-hot-toast";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <NextUIProvider>
      <StoreContext.Provider value={store}>
        {children}
        <Toaster position="top-right" />
      </StoreContext.Provider>
    </NextUIProvider>
  );
}
