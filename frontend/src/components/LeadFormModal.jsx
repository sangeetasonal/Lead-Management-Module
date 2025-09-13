import React, { useState, useEffect } from "react";
import axios from "axios";

export default function LeadFormModal({ 
  isOpen, 
  onClose, 
  onLeadSaved,  
  initialData = null, 
  leadId = null 
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "New",
    qualification: "",
    interestField: "",
    source: "",
    assignedTo: "",
  });

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  // Pre-fill when editing
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        status: "New",
        qualification: "",
        interestField: "",
        source: "",
        assignedTo: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (leadId) {
        // Update existing lead
        await axios.put(`${API_URL}/lead/${leadId}`, formData);
      } else {
        // Add new lead
        await axios.post(`${API_URL}/lead`, formData);
      }
      onLeadSaved();
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || "Error saving lead");
      console.error("Error saving lead:", error.response?.data || error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white w-[720px] rounded-2xl shadow-2xl p-6 border border-gray-200 animate-fadeIn">
       
        <div className="flex justify-between items-center border-b pb-3 mb-5">
          <h2 className="text-xl font-semibold text-gray-800">
            {leadId ? "✏ Edit Lead" : "➕ Add Lead"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition"
          >
            ✕
          </button>
        </div>

       
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
       
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Phone
            </label>
            <input
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option>New</option>
              <option>Follow-Up</option>
              <option>Qualified</option>
              <option>Converted</option>
            </select>
          </div>

        
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Qualification
            </label>
            <input
              name="qualification"
              type="text"
              value={formData.qualification}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Interest Field
            </label>
            <input
              name="interestField"
              type="text"
              value={formData.interestField}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Source
            </label>
            <input
              name="source"
              type="text"
              value={formData.source}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Assigned To
            </label>
            <input
              name="assignedTo"
              type="text"
              value={formData.assignedTo}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          
          <div className="col-span-2 flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium shadow hover:from-blue-600 hover:to-blue-800 transition"
            >
              {leadId ? "Update Lead" : "Save Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
