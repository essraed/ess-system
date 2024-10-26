"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Toaster } from "react-hot-toast";
import { store, StoreContext, useStore } from "@/stores/store";
import { useEffect } from "react";
import LoadingComponent from "@/components/LoadingComponent";
import { initializeUserAndLanguageSettings } from "@/lib/userLanguageSettings";

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
        <NextThemesProvider
          defaultTheme="system"
          attribute="class"
          {...themeProps}
        >
          {children}
          <Toaster position="top-right" />
        </NextThemesProvider>
      </StoreContext.Provider>
    </NextUIProvider>
  );
}
