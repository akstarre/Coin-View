"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faMoon } from "@fortawesome/free-regular-svg-icons";

const StyledIcon = tw(FontAwesomeIcon)`

`;

const StyledButton = tw.button`
  w-12
  h-10
  bg-l-light-purple-background
  dark:bg-d-grey-purple-1
  dark:border-[1px]
  dark:border-d-grey-purple-border
  rounded-[10px]
`;

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

  const getIcon = () => {
    if (theme === "dark") {
      return faMoon;
    }
    return faLightbulb;
  };

  return (
    <div>
      <StyledButton onClick={handleThemeToggle}>
        <StyledIcon icon={getIcon()} />
      </StyledButton>
    </div>
  );
};
