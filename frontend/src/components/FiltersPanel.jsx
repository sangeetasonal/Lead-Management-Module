import React, { useState, useRef, useEffect } from "react";

export default function FiltersPanel({ onApply, onClear }) {
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = ["All statuses", "New", "Qualified", "Converted", "Follow-Up"];

  const handleApply = () => {
    onApply({ status });
    setOpen(false);
  };

  const handleClear = () => {
    setStatus("");
    onClear();
    setOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-5 rounded-2xl shadow-lg border border-gray-200 mt-4">
      
      <h3 className="font-semibold text-gray-800 mb-3 text-lg">🎯 Filter Leads</h3>

      
      <div className="flex flex-col gap-2  relative" ref={dropdownRef}>
        <label className="text-sm font-medium text-gray-600">Status</label>

       
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-60 px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm bg-white text-left focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        >
          {status || "All statuses"}
        </button>

        {/* Options */}
        {open && (
          <div className="absolute top-full mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            {options.map((opt) => (
              <div
                key={opt}
                onClick={() => {
                  setStatus(opt === "All statuses" ? "" : opt);
                  setOpen(false);
                }}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-purple-50 ${
                  (status === opt || (status === "" && opt === "All statuses"))
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-700"
                }`}
              >
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>

      
      <div className="flex justify-end gap-3">
        <button
          onClick={handleClear}
          className="px-4 py-2 border rounded-lg text-sm bg-white hover:bg-gray-50 transition"
        >
          Clear
        </button>
        <button
          onClick={handleApply}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-sm shadow-md hover:opacity-90 transition"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
