"use client";

import { Navbar } from "@/components/Navbar";
import { NavbarCoinInfo } from "@/components/NavbarCoinInfo";
import "./globals.css";
import ThemeProviders from "./ThemeProviders";
import { ReduxProvider } from "./GlobalRedux/provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ThemeProviders>
            <NavbarCoinInfo />
            <Navbar />
            {children}
          </ThemeProviders>
        </ReduxProvider>
      </body>
    </html>
  );
}
