"use client";

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
          <ThemeProviders>{children}</ThemeProviders>
        </ReduxProvider>
      </body>
    </html>
  );
}
