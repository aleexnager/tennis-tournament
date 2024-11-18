import React from "react";

const UserTournamentsInfoTable = () => {
  return (
    <div className="bg-gradient-to-br from-primary to-secondary rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Tournament Statistics</h2>
      <div className="p-4">
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-gray-700 text-text">
            <tr>
              <th className="py-2 px-4 text-center">Tournament</th>
              <th className="py-2 px-4 text-center">Points</th>
              <th className="py-2 px-4 text-center">Sets won</th>
              <th className="py-2 px-4 text-center">Games won</th>
              <th className="py-2 px-4 text-center">Games lost</th>
            </tr>
          </thead>
          <tbody className="text-gray-900">
            <tr className="bg-gray-100 hover:bg-gray-200">
              <td className="py-2 px-4 text-center">Winter</td>
              <td className="py-2 px-4 text-center">2000</td>
              <td className="py-2 px-4 text-center">3</td>
              <td className="py-2 px-4 text-center">4 | 3 | 2 | 5 | 5 | 5</td>
              <td className="py-2 px-4 text-center">5</td>
            </tr>
            <tr className="bg-white hover:bg-gray-200">
              <td className="py-2 px-4 text-center">Summer</td>
              <td className="py-2 px-4 text-center">1500</td>
              <td className="py-2 px-4 text-center">7</td>
              <td className="py-2 px-4 text-center">8</td>
              <td className="py-2 px-4 text-center">9</td>
            </tr>
            <tr className="bg-gray-100 hover:bg-gray-200">
              <td className="py-2 px-4 text-center">Autumn</td>
              <td className="py-2 px-4 text-center">400</td>
              <td className="py-2 px-4 text-center">11</td>
              <td className="py-2 px-4 text-center">12</td>
              <td className="py-2 px-4 text-center">13</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTournamentsInfoTable;
