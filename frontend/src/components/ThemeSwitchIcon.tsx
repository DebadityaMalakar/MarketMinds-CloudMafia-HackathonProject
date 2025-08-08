import React, { useState, useEffect } from "react";
import { Sun, Moon } from "react-feather"; // npm install react-feather
import { getCurrentTheme, toggleTheme, initTheme } from "../utils/theme";

const ThemeSwitchIcon: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    initTheme();
    setTheme(getCurrentTheme());
  }, []);

  const handleClick = () => {
    const newTheme = toggleTheme();
    setTheme(newTheme);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        color: "var(--color-text-normal)",
        display: "flex",
        alignItems: "center",
      }}
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeSwitchIcon;
