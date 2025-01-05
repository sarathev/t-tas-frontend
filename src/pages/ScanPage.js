import React, { useState, useEffect } from "react";
import FilterDropdown from "../components/FilterDropdown";
import SearchBar from "../components/SearchBar";
import ScanHistory from "../components/ScanHistory";
import axios from "axios";
import "./ScanPage.css";
import { formatTimeAgo } from "../utils/dateUtils";

const ScanPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all results
  const fetchAllResults = async () => {
    try {
      const response = await axios.get("http://localhost:3000/allResults");
      const results = response.data.map((item, index) => {
        const domainId = Object.keys(item)[0];
        const details = item[domainId];

        return {
          id: details.domainId,
          domainName: details.domain,
          summary: {
            blue: details.summary.blue, // Dynamic counts from backend
            yellow: details.summary.yellow,
            red: details.summary.red,
          },
          scanEngine: "Full Scan",
          lastScan: formatTimeAgo(details.datetime),
          // lastScan: details.datetime,
          initiatedBy: "root",
          status: details.status ? "Completed" : "In Progress",
          progress: details.progress, 
        };
      });
      setData(results);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setLoading(false);
    }
  };

  // Polling mechanism to update results every 3 seconds
  useEffect(() => {
    fetchAllResults();
    const interval = setInterval(fetchAllResults, 9000); // Poll every 3 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="scan-container">
      <div className="search-container">
        <FilterDropdown
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
        <SearchBar
          selectedFilter={selectedFilter}
          fetchAllResults={fetchAllResults} // Pass fetchAllResults
        />
      </div>
      <div className="scan-main">
        <h3>Quick Scan History</h3>

        <ScanHistory
          data={data}
          loading={loading}
          fetchAllResults={fetchAllResults} // Pass fetch function
        />

      </div>
    </div>
  );
};

export default ScanPage;
