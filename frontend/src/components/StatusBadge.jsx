import React from "react";

export default function StatusBadge({ status }) {
  const colors = {
    "Follow-Up": "bg-orange-100 text-orange-600",
    Qualified: "bg-green-100 text-green-600",
    Converted: "bg-purple-100 text-purple-600",
    New: "bg-blue-100 text-blue-600",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        colors[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}
