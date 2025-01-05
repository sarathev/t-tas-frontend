import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./ScanHistory.css";
import axios from "axios";

const ScanHistory = ({ data, loading, fetchAllResults }) => {
  const [selectedRows, setSelectedRows] = useState([]); // Track selected rows

  // Toggle row selection
  const handleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Delete selected scans
  const handleDelete = async () => {
    if (selectedRows.length === 0) {
      alert("No scans selected for deletion.");
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedRows.length} scans?`
    );

    if (!confirmDelete) return;

    try {
      await axios.delete("http://localhost:3000/deleteScans", {
        data: { domainIds: selectedRows },
      });

      alert("Selected scans deleted successfully.");
      fetchAllResults(); 
      setSelectedRows([]); 
    } catch (error) {
      console.error("Failed to delete scans:", error);
      alert("Failed to delete scans. Please try again.");
    }
  };

  return (
    <div className="scan-history">
      <div className="scan-history-header">
        <div className="scan-filters">
          <button className="filter-btn">Filter</button>
          <input type="text" placeholder="Search.." className="search-bar" />
        </div>
        <div className="action-buttons">
          <button className="stop-scans">Stop Multiple Scans</button>
          <button className="delete-scans" onClick={handleDelete}>
            Delete Multiple Scans
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <table className="scan-table">
          <thead>
            <tr>
              <th></th>
              <th>Domain Name</th>
              <th>Summary</th>
              <th>Scan Engine Used</th>
              <th>Last Scan</th>
              <th>Initiated By</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item.id)} 
                    onChange={() => handleRowSelection(item.id)} 
                  />
                </td>
                <td>{item.domainName}</td>
                <td>
                    <div className="summary">
                        <span className="summary-box blue">{item.summary.blue}</span>
                        <span className="summary-box yellow">{item.summary.yellow}</span>
                        <span className="summary-box red">{item.summary.red}</span>
                    </div>
                    </td>

                <td>
                  <span className="scan-engine">{item.scanEngine}</span>
                </td>
                <td>{item.lastScan}</td>
                <td>{item.initiatedBy}</td>
                <td>
                  {item.status === "In Progress" ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span className="status in-progress">
                      <CircularProgress size={16} /> &nbsp;
                        
                        In Progress</span>
                    </div>
                  ) : (
                    <span className="status completed">Completed</span>
                  )}
                </td>
                <td>
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </td>
                <td>
                  <button className="view-results">View Results</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="pagination">
        <span>Showing page 1 of 1</span>
      </div>
    </div>
  );
};

export default ScanHistory;
