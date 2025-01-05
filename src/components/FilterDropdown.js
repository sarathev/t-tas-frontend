import React, { useState, useRef, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./FilterDropdown.css";

const FilterDropdown = ({ selectedFilter, setSelectedFilter }) => {
  const options = [
    { value: "whois", label: "Whois" },
    { value: "list-subdomains", label: "List Sub-domains" },
    { value: "scan", label: "Scan" },
    { value: "owasp-zap", label: "Dynamic Web App Scan (OWSAP ZAP)" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false); 
  const dropdownRef = useRef(null); 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter options
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (value) => {
    setSelectedFilter(value);
    setIsOpen(false); 
  };

  return (
    <div className="dropdown-wrapper" ref={dropdownRef}>
      <div
        className="dropdown-button"
        onClick={() => setIsOpen(!isOpen)} 
      >
        {selectedFilter || "All filters"}
        <ArrowDropDownIcon className="dropdown-arrow" /> 
      </div>

      {isOpen && (
        <div className="dropdown-container">
          <div className="dropdown-search-container">
            <SearchIcon className="dropdown-search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="dropdown-search"
            />
          </div>

          <div className="dropdown-options">
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                className="dropdown-option"
                onClick={() => handleOptionClick(option.label)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
