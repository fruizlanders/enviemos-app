import React from 'react';

const Navbar: React.FC = () => (
  <nav className="bg-gray-800 text-white p-4">
    <div className="flex justify-between items-center">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      <div>
        {/* Add additional navbar items or actions, like a logout button */}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </div>
    </div>
  </nav>
);

export {Navbar};
