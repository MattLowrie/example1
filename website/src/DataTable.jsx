import React from 'react';

const DataTable = ({ data, handleSort, sortConfig }) => {
  if (!data.length) {
    return <p>No data to display.</p>;
  }

  const headers = Object.keys(data[0]);

  const getSortIndicator = (key) => {
    if (sortConfig && sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽';
    }
    return '';
  };

  return (
    <table className="data-table">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header} onClick={() => handleSort(header)}>
              {header.charAt(0).toUpperCase() + header.slice(1)}
              {getSortIndicator(header)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {headers.map((header) => (
              <td key={header}>{String(row[header])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
