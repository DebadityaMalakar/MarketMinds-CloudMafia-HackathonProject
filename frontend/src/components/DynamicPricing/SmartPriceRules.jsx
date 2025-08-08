import Sidebar from "../Sidebar";
import TopBarRules from "./TopBarRules";
import RulesList from "./RuleList";
import { useEffect } from "react";
import { initTheme } from "../../utils/theme";
const SmartPriceRules = () => {
    useEffect(() => {
        initTheme();
    }, []);
  return (
    <div className="flex h-screen bg-[var(--color-background-primary)] text-[var(--color-text-normal)]">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <TopBarRules />
        <RulesList />
      </div>
    </div>
  );
};

export default SmartPriceRules;
