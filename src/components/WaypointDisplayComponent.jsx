import React from 'react';

const WaypointTable = ({ waypoints }) => {
  if (!waypoints || waypoints.length === 0) {
    return <p>No waypoints available.</p>;
  }

  const formatCoordinate = (coord) => {
    // rounded
    return coord.toFixed(6);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
        <thead className="bg-gray-50 rounded-md">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <input type="checkbox" /> {/* Checkbox for select all */}
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
              <span className="sr-only">Options</span>{/*sr-only hides it visually but screen readers can read it*/}
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
                {index.toString().padStart(2, '0')} {/* Pad with leading zero */}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatCoordinate(waypoint.point[0])}, {formatCoordinate(waypoint.point[1])}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {waypoint.distanceToNext ? waypoint.distanceToNext.toFixed(1) : '--'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-gray-500 hover:text-gray-700"> {/*option button*/}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WaypointTable;