import React, { useState } from 'react';

const WaypointTable = ({ waypoints }) => {
  const [dropdownIndex, setDropdownIndex] = useState(null); // Tracks the index of the dropdown to display

  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index); // Toggle the dropdown for the clicked index
  };

  const handleOptionClick = (option, index) => {
    console.log(`Option "${option}" selected for waypoint at index ${index}`);
    setDropdownIndex(null); // Close the dropdown after selection
  };

  const formatCoordinate = (coord) => {
    return coord.toFixed(6);
  };

  if (!waypoints || waypoints.length === 0) {
    return <p>No waypoints available.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
        <thead className="bg-gray-50 rounded-md">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <input type="checkbox" />
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              WP
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Coordinates
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Distance (m)
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Options</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 rounded-md">
          {waypoints.map((waypoint, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {index.toString().padStart(2, '0')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatCoordinate(waypoint.point[0])}, {formatCoordinate(waypoint.point[1])}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {waypoint.distanceToNext ? waypoint.distanceToNext.toFixed(1) : '--'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => toggleDropdown(index)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                    />
                  </svg>
                </button>

                {/* Render dropdown if the index matches */}
                {dropdownIndex === index && (
                  <div className="absolute z-50 right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleOptionClick('Insert Polygon Before', index)}
                    >
                      Insert Polygon Before
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleOptionClick('Insert Polygon After', index)}
                    >
                      Insert Polygon After
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WaypointTable;
