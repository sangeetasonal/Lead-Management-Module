import React from "react";
import { FiFilter, FiSearch, FiPlus } from "react-icons/fi";

export default function Topbar({ onAddLead, onToggleFilters, filtersVisible, onSearch }) {
  return (
    <div className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
    
      <h2 className="text-xl font-semibold text-gray-800">Leads Management</h2>

    
      <div className="flex items-center gap-3">
       
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads..."
            onChange={(e) => onSearch(e.target.value)} 
            className="pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        
        <button
          onClick={onToggleFilters}
          className="flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition"
        >
          <FiFilter className="text-gray-500" />
          <span>{filtersVisible ? "Hide Filters" : "Show Filters"}</span>
        </button>

      
        <button
          onClick={onAddLead}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm shadow-sm"
        >
          <FiPlus size={16} />
          <span>Add Lead</span>
        </button>
      </div>
    </div>
  );
}
