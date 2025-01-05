import React from "react";
import { AppBar, Toolbar, Tabs, Tab } from "@mui/material";
import "./Header.css";

const Header = ({ selectedTab, setSelectedTab }) => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => setSelectedTab(newValue)}
          textColor="inherit"
          TabIndicatorProps={{
            style: { backgroundColor: "black" }, 
          }}
        >
          <Tab label="Scan" />
          <Tab label="Dashboard" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
