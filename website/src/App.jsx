import React, { useState, useEffect, useMemo } from 'react';
import DataTable from './DataTable';
import FilterPanel from './FilterPanel';
import './App.css';

// A simple CSV parser function
const parseCSV = (text) => {
  const lines = text.trim().split('\\n');
  const header = lines[0].split(',');
  const data = lines.slice(1).map(line => {
    const values = line.split(',');
    return header.reduce((obj, nextKey, index) => {
      let value = values[index];
      // Convert 'True'/'False' strings to booleans
      if (value === 'True') value = true;
      if (value === 'False') value = false;
      obj[nextKey] = value;
      return obj;
    }, {});
  });
  return data;
};

function App() {
  const [allData, setAllData] = useState([]);
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'ascending' });

  useEffect(() => {
    fetch('/data.csv')
      .then(response => response.text())
      .then(text => {
        const parsedData = parseCSV(text);
        setAllData(parsedData);
      });
  }, []);

  const handleFilterChange = (key, value, isChecked) => {
    setFilters(prevFilters => {
      const newFilterGroup = prevFilters[key] ? [...prevFilters[key]] : [];
      if (isChecked) {
        newFilterGroup.push(value);
      } else {
        const index = newFilterGroup.indexOf(value);
        if (index > -1) {
          newFilterGroup.splice(index, 1);
        }
      }
      // If the filter group is empty, remove it from the filters object
      if (newFilterGroup.length === 0) {
        const { [key]: _, ...rest } = prevFilters;
        return rest;
      }
      return { ...prevFilters, [key]: newFilterGroup };
    });
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const filteredData = useMemo(() => {
    let data = [...allData];

    // Apply filters
    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        data = data.filter(row => values.includes(String(row[key])));
      }
    });

    // Apply sorting
    if (sortConfig.key) {
      data.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return data;
  }, [allData, filters, sortConfig]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Employee Data</h1>
      </header>
      <main className="App-main">
        <FilterPanel
          allData={allData}
          filters={filters}
          handleFilterChange={handleFilterChange}
        />
        <DataTable
          data={filteredData}
          handleSort={handleSort}
          sortConfig={sortConfig}
        />
      </main>
    </div>
  );
}

export default App;
