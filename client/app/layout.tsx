import "@/styles/globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import clsx from "clsx";
import { fontCairo } from "@/config/fonts";

export const metadata: Metadata = {
  title: "ESS",
  description: "Developed by ess programming team.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`mx-5 w-auto ${clsx("font-cairo antialiased", fontCairo.className)}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
