import { useState, useEffect } from "react";
import { useRouter, useLocation } from "@tanstack/react-router";
import {
  Home,
  Box,
  TrendingUp,
  BarChart2,
  Settings,
  HelpCircle,
  LogOut,
} from "react-feather";

const Sidebar = () => {
  const router = useRouter();
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const navItems = [
    { icon: <Home size={18} />, label: "Dashboard", path: "/dashboard" },
    { icon: <Box size={18} />, label: "Products", path: "/products" },
    { icon: <TrendingUp size={18} />, label: "Dynamic Pricing", path: "/dynamicpricing" },
    { icon: <BarChart2 size={18} />, label: "Reports", path: "/reports", badge: "0" },
  ];

  const bottomLinks = [
    { icon: <Settings size={18} />, label: "Settings", path: "/settings" },
    { icon: <HelpCircle size={18} />, label: "Help Center", path: "/help" },
    { icon: <LogOut size={18} />, label: "Log out", path: "/logout" },
  ];

  return (
    <aside className="bg-[var(--color-surface)] border-r border-[var(--color-border-muted)] w-64 flex flex-col justify-between">
      <div>
        {/* Logo */}
        <div className="p-6 text-center font-bold text-xl text-[var(--color-accent-yellow)]">
          MarketMinds
        </div>

        {/* Nav */}
        <nav className="px-4 space-y-1">
          {navItems.map((item, i) => (
            <NavItem
              key={i}
              icon={item.icon}
              label={item.label}
              badge={item.badge}
              active={activePath === item.path}
              onClick={() => router.navigate({ to: item.path })}
            />
          ))}
        </nav>

        {/* Trial Warning */}
        <div className="bg-[var(--color-accent-yellow)]/10 border border-[var(--color-accent-yellow)] rounded-lg p-3 mt-6 mx-4 text-sm text-[var(--color-accent-yellow)]">
          <strong>Trial Ending</strong>
          <p>Your free trial ends in 14 days.</p>
          <a href="#" className="underline">
            Explore Plans
          </a>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="px-4 py-4 space-y-1">
        {bottomLinks.map((item, i) => (
          <NavItem
            key={i}
            icon={item.icon}
            label={item.label}
            badge={null}
            active={activePath === item.path}
            onClick={() => router.navigate({ to: item.path })}
          />
        ))}
      </div>
    </aside>
  );
};
{/*@ts-ignore */}
const NavItem = ({ icon, label, active, badge, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition ${
      active
        ? "bg-[var(--color-accent-blue)] text-white"
        : "hover:bg-[var(--color-surface-highlight)]"
    }`}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span>{label}</span>
    </div>
    {badge && (
      <span className="bg-[var(--color-surface-highlight)] text-xs px-2 py-0.5 rounded-full">
        {badge}
      </span>
    )}
  </div>
);

export default Sidebar;
