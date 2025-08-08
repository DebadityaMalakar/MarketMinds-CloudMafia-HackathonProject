// src/pages/Dashboard/index.tsx
import { Fragment, useEffect } from "react";
import Sidebar from "../Sidebar";
import { initTheme } from "../../utils/theme";
import DashboardComponent from "./dashboardComponent";
function Dashboard() {
  useEffect(() => {
    initTheme();
  }, []);

  return (
    <div className="flex h-screen bg-background-primary text-text-normal">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <DashboardComponent />
      </main>
    </div>
  );
}

export default Dashboard;