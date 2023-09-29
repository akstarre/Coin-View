"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleThemeToggle = () => {
    if (theme === "dark" || theme === "system") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    }
  };

  return (
    <div>
      <button onClick={handleThemeToggle}>{theme}</button>
    </div>
  );
};
