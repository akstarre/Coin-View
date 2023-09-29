"use client";

import "./globals.css";
import { ReduxProvider } from "./GlobalRedux/provider";
import ThemeProviders from "./ThemeProviders";
import { useState, useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ThemeProviders>{children}</ThemeProviders>
        </ReduxProvider>
      </body>
    </html>
  );
}
