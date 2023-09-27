import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleThemeToggle = () => {
    if (currentTheme === "dark") {
      setTheme("light");
    }
    if (currentTheme === "light") {
      setTheme("dark");
    }
  };

  return (
    <div>
      <button onClick={handleThemeToggle}>{theme}</button>
    </div>
  );
};
