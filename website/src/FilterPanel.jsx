import React from 'react';

const FilterPanel = ({ allData, filters, handleFilterChange }) => {
  if (!allData.length) {
    return null;
  }

  const getUniqueValues = (key) => {
    const unique = new Set(allData.map(item => String(item[key])));
    return Array.from(unique).sort();
  };

  const headers = Object.keys(allData[0]);

  return (
    <div className="filter-panel">
      <h3>Filter Data</h3>
      {headers.map((header) => (
        <div key={header} className="filter-group">
          <h4>{header.charAt(0).toUpperCase() + header.slice(1)}</h4>
          <div className="filter-options">
            {getUniqueValues(header).map((value) => (
              <div key={value} className="checkbox-container">
                <input
                  type="checkbox"
                  id={`${header}-${value}`}
                  value={value}
                  checked={filters[header]?.includes(value) || false}
                  onChange={(e) => handleFilterChange(header, value, e.target.checked)}
                />
                <label htmlFor={`${header}-${value}`}>{value}</label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterPanel;
