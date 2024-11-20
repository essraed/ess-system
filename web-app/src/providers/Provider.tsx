import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProviderProps } from "react-bootstrap";
import { store, StoreContext } from "../app/stores/store";
import { Toaster } from "react-hot-toast";



export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {

  return (
    <NextUIProvider>
      <StoreContext.Provider value={store}>
        {children}
        <Toaster position="top-right" />
      </StoreContext.Provider>
    </NextUIProvider>
  );
}



