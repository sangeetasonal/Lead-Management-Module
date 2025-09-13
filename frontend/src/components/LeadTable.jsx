import React, { useEffect, useState } from "react";
import axios from "axios";
import StatusBadge from "./StatusBadge";
import sortIcon from "../assets/sort.png";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function LeadTable({ refresh, filters, searchText, onEdit }) {
  const [allLeads, setAllLeads] = useState([]);
  const [leads, setLeads] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 10;

  const API_URL = import.meta.env.VITE_BACKEND_URL;

 
  useEffect(() => {
  const fetchLeads = async () => {
    try {
      const res = await axios.get(`${API_URL}/lead`);
      setAllLeads(res.data.data);
    } catch (err) {
      console.error("Error fetching leads:", err);
    }
  };

  fetchLeads();
}, [refresh, API_URL]);


  useEffect(() => {
    let filtered = [...allLeads];

    if (filters.status) {
      filtered = filtered.filter((lead) => lead.status === filters.status);
    }

    if (searchText) {
      const q = searchText.toLowerCase();
      filtered = filtered.filter(
        (lead) =>
          lead.name?.toLowerCase().includes(q) ||
          lead.phone?.toLowerCase().includes(q) ||
          lead.status?.toLowerCase().includes(q) ||
          lead.qualification?.toLowerCase().includes(q) ||
          lead.interestField?.toLowerCase().includes(q) ||
          lead.source?.toLowerCase().includes(q) ||
          lead.assignedTo?.toLowerCase().includes(q) ||
          new Date(lead.updatedAt)
            .toLocaleString("en-US")
            .toLowerCase()
            .includes(q)
      );
    }

    setLeads(filtered);
    setCurrentPage(1); 
  }, [allLeads, filters, searchText]);

  // Sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...leads].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setLeads(sortedData);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <img src={sortIcon} alt="sort" className="w-3 h-3 inline ml-1 opacity-50" />;
    }
    return (
      <img
        src={sortIcon}
        alt="sort"
        className={`w-3 h-3 inline ml-1 transform opacity-100 ${
          sortConfig.direction === "asc" ? "rotate-180" : ""
        }`}
      />
    );
  };

  // Delete Lead
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;

    try {
      await axios.delete(`${API_URL}/lead/${id}`);
      setAllLeads((prev) => prev.filter((lead) => lead._id !== id));
    } catch (err) {
      console.error("Error deleting lead:", err);
    }
  };

  // Pagination
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = leads.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(leads.length / leadsPerPage);

  return (
    <div className="overflow-x-auto bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-xl border border-gray-200">
      
      <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-purple-600 to-indigo-600 rounded-t-2xl">
        <h2 className="text-lg font-semibold text-white">📋 Leads</h2>
        <span className="text-xs text-purple-100">
          Showing {leads.length} {leads.length === 1 ? "lead" : "leads"}
        </span>
      </div>

     
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gradient-to-r from-purple-100 to-indigo-100 text-left text-xs uppercase tracking-wide text-gray-700">
            <th className="p-3 cursor-pointer" onClick={() => handleSort("name")}>
              Name {getSortIcon("name")}
            </th>
            <th className="p-3 cursor-pointer" onClick={() => handleSort("phone")}>
              Contact {getSortIcon("phone")}
            </th>
            <th className="p-3 cursor-pointer" onClick={() => handleSort("status")}>
              Status {getSortIcon("status")}
            </th>
            <th className="p-3 cursor-pointer" onClick={() => handleSort("qualification")}>
              Qualification {getSortIcon("qualification")}
            </th>
            <th className="p-3 cursor-pointer" onClick={() => handleSort("interestField")}>
              Interest {getSortIcon("interestField")}
            </th>
            <th className="p-3 cursor-pointer" onClick={() => handleSort("source")}>
              Source {getSortIcon("source")}
            </th>
            <th className="p-3 cursor-pointer" onClick={() => handleSort("assignedTo")}>
              Assigned To {getSortIcon("assignedTo")}
            </th>
            <th className="p-3 cursor-pointer" onClick={() => handleSort("updatedAt")}>
              Updated At {getSortIcon("updatedAt")}
            </th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentLeads.length > 0 ? (
            currentLeads.map((lead, idx) => (
              <tr
                key={lead._id}
                className={`transition duration-200 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-purple-50`}
              >
                <td className="p-3 text-indigo-600 font-medium cursor-pointer hover:underline">
                  {lead.name}
                </td>
                <td className="p-3 text-gray-700">{lead.phone}</td>
                <td className="p-3">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="p-3 text-gray-700">{lead.qualification}</td>
                <td className="p-3 text-gray-700">{lead.interestField}</td>
                <td className="p-3 text-gray-700">{lead.source}</td>
                <td className="p-3 text-gray-700">{lead.assignedTo}</td>
                <td className="p-3 text-gray-500 text-xs">
                  {new Date(lead.updatedAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
                <td className="p-3 flex justify-center gap-3">
                  <button
                    onClick={() => onEdit && onEdit(lead)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                  >
                    <FiEdit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(lead._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="p-6 text-center text-gray-500 italic bg-white">
                No leads found 🚫
              </td>
            </tr>
          )}
        </tbody>
      </table>

    
{leads.length > leadsPerPage && (
  <div className="flex justify-center items-center gap-2 p-4 flex-wrap">
   
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((prev) => prev - 1)}
      className="px-2 py-1 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 disabled:opacity-50 transition"
    >
      Prev
    </button>

   
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
      <button
        key={num}
        onClick={() => setCurrentPage(num)}
        className={`px-2 py-1 border rounded-lg shadow-sm transition ${
          num === currentPage
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-white border-gray-300 hover:bg-gray-100"
        }`}
      >
        {num}
      </button>
    ))}

    
    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage((prev) => prev + 1)}
      className="px-2 py-1 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 disabled:opacity-50 transition"
    >
      Next
    </button>
  </div>
)}

    </div>
  );
}
