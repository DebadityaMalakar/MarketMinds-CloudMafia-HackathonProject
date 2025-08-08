import React, { useState, useEffect } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "react-feather";
import ThemeSwitchIcon from "./ThemeSwitchIcon";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();
  const [activePath, setActivePath] = useState("");

  // Navigation items
  const navItems = [
    { id: "solutions", label: "Solutions", href: "/solutions" },
    { id: "features", label: "Features", href: "/features" },
    { id: "partners", label: "Partners", href: "/partners" },
    { id: "resources", label: "Resources", href: "/resources" },
    { id: "pricing", label: "Pricing", href: "/pricing" },
  ];

  // Check for dark mode preference
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const htmlElement = document.documentElement;
    
    const updateDarkMode = () => {
      const darkMode = htmlElement.classList.contains('dark');
      setIsDarkMode(darkMode);
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          updateDarkMode();
        }
      });
    });

    updateDarkMode();
    observer.observe(htmlElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  // Track active route
  useEffect(() => {
    const unsubscribe = router.subscribe(() => {
      setActivePath(router.state.location.pathname);
    });
    return unsubscribe;
  }, [router]);

  return (
    <header 
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: isDarkMode ? '#1e2030' : '#4A3F35',
        borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 text-2xl font-extrabold"
            style={{ 
              color: isDarkMode ? '#FFB300' : '#FFB300',
              textShadow: isDarkMode ? '0 0 8px rgba(255,179,0,0.3)' : 'none'
            }}
          >
            MarketMinds
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  activePath.startsWith(item.href)
                    ? "text-[#FFB300]"
                    : "text-white hover:text-[#FFB300]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/auth"
              className="px-4 py-2 rounded-md border text-sm font-medium transition-colors"
              style={{
                backgroundColor: 'transparent',
                borderColor: isDarkMode ? '#82aaff' : '#FFB300',
                color: isDarkMode ? '#82aaff' : '#FFB300',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDarkMode ? '#82aaff20' : '#FFB30020';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Login
            </Link>
            <Link
              to="/auth?action=signup"
              className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
              style={{
                backgroundColor: isDarkMode ? '#82aaff' : '#FFB300',
                color: isDarkMode ? '#1e2030' : '#4A3F35',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              Start Free Trial
            </Link>
            <ThemeSwitchIcon 
              style={{ 
                color: isDarkMode ? '#82aaff' : '#FFB300',
                transition: "color 0.2s ease"
              }} 
            />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <ThemeSwitchIcon 
              className="mr-4"
              style={{ 
                color: isDarkMode ? '#82aaff' : '#FFB300',
                transition: "color 0.2s ease"
              }} 
            />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
              style={{ color: isDarkMode ? '#82aaff' : '#FFB300' }}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div 
          className="md:hidden border-t"
          style={{
            backgroundColor: isDarkMode ? '#1e2030' : '#4A3F35',
            borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
          }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  activePath.startsWith(item.href)
                    ? "text-[#FFB300] bg-white/10"
                    : "text-white hover:text-[#FFB300] hover:bg-white/10"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div 
              className="pt-4 pb-2 border-t"
              style={{
                borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
              }}
            >
              <Link
                to="/auth"
                className="block w-full px-4 py-2 mb-2 rounded-md text-center text-sm font-medium border"
                style={{
                  borderColor: isDarkMode ? '#82aaff' : '#FFB300',
                  color: isDarkMode ? '#82aaff' : '#FFB300',
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/auth?action=signup"
                className="block w-full px-4 py-2 rounded-md text-center text-sm font-medium"
                style={{
                  backgroundColor: isDarkMode ? '#82aaff' : '#FFB300',
                  color: isDarkMode ? '#1e2030' : '#4A3F35',
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;