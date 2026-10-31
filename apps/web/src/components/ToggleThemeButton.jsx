import React from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./providers/theme-provider";

const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="secondary"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
};

export default ToggleThemeButton;
