"use client";
import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";

//adding comment to stage commit, can't find branch in github

export default function Providers({ children }: { children: any }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
