import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProviderProps } from "react-bootstrap";
import { store, StoreContext, useStore } from "../app/stores/store";
import { initializeUserAndLanguageSettings } from "../lib/userLanguageSettings";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const { userStore } = useStore();

  useEffect(() => {
    initializeUserAndLanguageSettings(userStore);
  }, [userStore]);

  return (
    <NextUIProvider>
      <StoreContext.Provider value={store}>
        {children}
        <Toaster position="top-right" />
      </StoreContext.Provider>
    </NextUIProvider>
  );
}
