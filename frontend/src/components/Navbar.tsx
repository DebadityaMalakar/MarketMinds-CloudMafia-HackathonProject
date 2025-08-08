import { hover } from "framer-motion";
import ThemeSwitchIcon from "./ThemeSwitchIcon"
import React, { Fragment, useEffect, useState } from "react";

function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for dark mode preference on component mount
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const htmlElement = document.documentElement;
    
    // Set initial state
    setIsDarkMode(htmlElement.classList.contains('dark'));
    
    // Listen for changes
    const handleChange = () => {
      setIsDarkMode(htmlElement.classList.contains('dark'));
    };
    
    // Modern way to observe class changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          handleChange();
        }
      });
    });
    
    observer.observe(htmlElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  return (
    <Fragment>
      {/* Top Nav */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          backgroundColor: "var(--color-background-secondary)",
          borderBottom: "1px solid var(--color-text-muted)",
        }}
      >
        <div style={{ 
          color: isDarkMode ? "white" : "black", 
          fontSize: "1.5rem", 
          fontWeight: "bold" 
        }}>
          MarketMinds
        </div>

        <nav style={{ display: "flex", gap: "1.5rem" }}>
          {["Solutions", "Features", "Partners", "Resources", "Pricing"].map(
            (item) => (
              <a
                key={item}
                href="#"
                style={{
                  color: "var(--color-text-muted)",
                  textDecoration: "none",
                }}
              >
                {item}
              </a>
            )
          )}
        </nav>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <button
            style={{
              backgroundColor: "transparent",
              border: `1px solid var(--color-accent-blue)`,
              color: isDarkMode ? "white" : "black",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              transition: "all 0.2s ease",
            }}
            onClick={() => { window.location.href = "/auth" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-accent-blue)";
              e.currentTarget.style.color = "black";
              e.currentTarget.style.cursor = "pointer";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = isDarkMode ? "white" : "black";
              e.currentTarget.style.cursor = "default";
            }}
          >
            Login
          </button>
          <button
            style={{
              backgroundColor: "var(--color-accent-blue)",
              border: "none",
              color: isDarkMode ? "white" : "black",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-accent-blue)";
              e.currentTarget.style.color = "black";
              e.currentTarget.style.cursor = "pointer";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = isDarkMode ? "white" : "black";
              e.currentTarget.style.cursor = "default";
            }}
          >
            Start Free Trial
          </button>
          <ThemeSwitchIcon 
            style={{ 
              color: isDarkMode ? "white" : "black",
              transition: "color 0.2s ease"
            }} 
          />
        </div>
      </header>
    </Fragment>
  );
}

export default Navbar;