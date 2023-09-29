"use client";

import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ReduxProvider } from "./GlobalRedux/provider";
import { useState, useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={``}>
        <ReduxProvider>
          <ThemeProvider attribute="class">{children}</ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
