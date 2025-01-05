import React, { useState } from "react";
import Header from "./components/Header";
import ScanPage from "./pages/ScanPage";
import DashboardPage from "./pages/DashboardPage";
import "./App.css";

function App() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div>
      <Header selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab === 0 ? <ScanPage /> : <DashboardPage />}
    </div>
  );
}

export default App;
