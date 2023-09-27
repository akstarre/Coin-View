"use client";

import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Providers } from "./GlobalRedux/provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-slate-800 text-slate-100 container m-0 p-0`}>
        <ThemeProvider>
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
