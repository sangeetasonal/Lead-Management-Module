import React, { useState } from "react";
import Topbar from "./components/Topbar";
import LeadTable from "./components/LeadTable";
import LeadFormModal from "./components/LeadFormModal";
import FiltersPanel from "./components/FiltersPanel";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null); 
  const [refresh, setRefresh] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});
  const [searchText, setSearchText] = useState("");  

  const handleAddLead = () => {
    setEditingLead(null); // blank form
    setIsModalOpen(true);
  };

  const handleEditLead = (lead) => {
    setEditingLead(lead); // prefill with selected lead
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
       
        <Topbar
          onAddLead={handleAddLead}
          onToggleFilters={() => setShowFilters(!showFilters)}
          filtersVisible={showFilters}
          onSearch={setSearchText}
        />

       
        {showFilters && (
          <div className="px-6">
            <FiltersPanel
              onApply={(newFilters) => setFilters(newFilters)}
              onClear={() => setFilters({})}
            />
          </div>
        )}

       
        <div className="p-6">
         <LeadTable 
  refresh={refresh} 
  filters={filters} 
  searchText={searchText}
  onEdit={handleEditLead}  
/>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <LeadFormModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onLeadSaved={() => setRefresh(!refresh)}
  initialData={editingLead}             
  leadId={editingLead?._id || null}      
/>

    </div>
  );
}
