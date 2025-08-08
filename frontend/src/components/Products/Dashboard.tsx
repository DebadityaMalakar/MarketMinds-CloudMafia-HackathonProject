import Sidebar from "../Sidebar";
import TopBar from "./TopBar";
import ProductsPanel from "./ProductPanel";
import PriceChangesCard from "./PriceChangeCards";
import OutOfStockCard from "./OutOfStackCards";
import PricePositionCard from "./PricePositionCard";
import {  useEffect } from "react";
import { initTheme } from "../../utils/theme";

const Dashboard = () => {

    useEffect(() => {
        initTheme();
    }, []);


  return (
    <div className="flex h-screen bg-[var(--color-background-primary)] text-[var(--color-text-normal)]">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <TopBar />
        <div className="flex flex-1">
          <ProductsPanel />
          <div className="w-72 p-6 space-y-4 bg-[var(--color-surface)] border-l border-[var(--color-border-muted)]">
            <PriceChangesCard />
            <OutOfStockCard />
            <PricePositionCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
