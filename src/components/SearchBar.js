import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import "./SearchBar.css";

const SearchBar = ({ selectedFilter, fetchAllResults }) => {
  const [domain, setDomain] = useState("");

  const handleSubmit = async () => {
    if (!domain) {
      alert("Domain name cannot be empty!");
      return;
    }

    // Alert immediately after starting the scan
    // alert("Scan started successfully! Check the logs for progress.");

    try {
      // Construct API URL
      const apiUrl = `http://localhost:3000/activeScan?domain=${domain}`;

      // Make POST request without waiting for response completion
      axios
        .post(apiUrl)
        .then((response) => {
          console.log("Scan started successfully:", response.data);
        })
        .catch((error) => {
          console.error("Failed to start scan:", error);
          alert("Failed to start scan. Please try again.");
        });

      // Delay of 3 seconds before fetching all results
      setTimeout(() => {
        fetchAllResults(); // Call to fetch all results
      }, 5000);
    } catch (error) {
      console.error("Error initiating the scan:", error);
      alert("Failed to start scan. Please try again.");
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Enter the domain name to perform action"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        className="search-bar-input"
      />
      <div className="search-icon-container" onClick={handleSubmit}>
        <SearchIcon className="search-icon" />
      </div>
    </div>
  );
};

export default SearchBar;
