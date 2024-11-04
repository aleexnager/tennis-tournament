import React from "react";

const UserTournaments = () => {
  return (
    <div className="bg-gradient-to-br from-primary to-secondary rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Tournaments</h2>
      <div className="p-4">
        <h3 className="text-xl font-semibold my-4">Played</h3>
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-gray-700 text-text">
            <tr>
              <th className="py-2 px-4 text-center">Tournament</th>
              <th className="py-2 px-4 text-center">Points</th>
              <th className="py-2 px-4 text-center">Place</th>
            </tr>
          </thead>
          <tbody className="text-gray-900">
            <tr className="bg-gray-100 hover:bg-gray-200">
              <td className="py-2 px-4 text-center">Winter</td>
              <td className="py-2 px-4 text-center">2</td>
              <td className="py-2 px-4 text-center">3</td>
            </tr>
            <tr className="bg-white hover:bg-gray-200">
              <td className="py-2 px-4 text-center">Summer</td>
              <td className="py-2 px-4 text-center">6</td>
              <td className="py-2 px-4 text-center">7</td>
            </tr>
            <tr className="bg-gray-100 hover:bg-gray-200">
              <td className="py-2 px-4 text-center">Autumn</td>
              <td className="py-2 px-4 text-center">10</td>
              <td className="py-2 px-4 text-center">11</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold my-4">Inscribed</h3>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold my-4">To play</h3>
        <ul>
          <li>A</li>
          <li>B</li>
          <li>C</li>
        </ul>
      </div>
    </div>
  );
};

export default UserTournaments;
