import { useTheme } from "next-themes";
import { useState } from "react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("dark");

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
