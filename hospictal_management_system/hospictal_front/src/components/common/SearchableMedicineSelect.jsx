import React, { useState, useEffect, useRef } from "react";
import { Search, ChevronDown, Check, AlertCircle } from "lucide-react";

export default function SearchableMedicineSelect({
  medicines = [],
  selectedMedicineId = "",
  onChange,
  placeholder = "Search 1,000+ medicines by name or generic formula..."
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const selectedMed = medicines.find((m) => m._id === selectedMedicineId);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredMedicines = medicines
    .filter((m) => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
        m.name.toLowerCase().includes(term) ||
        (m.genericName && m.genericName.toLowerCase().includes(term)) ||
        (m.category && m.category.toLowerCase().includes(term)) ||
        (m.manufacturer && m.manufacturer.toLowerCase().includes(term))
      );
    })
    .slice(0, 50); // Performance optimization: Cap visible results at 50 items

  const handleSelect = (med) => {
    onChange(med._id);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative w-full text-xs font-sans" ref={dropdownRef}>
      {/* Selected Box Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 border border-slate-300 rounded-xl bg-white text-left font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 shadow-sm"
      >
        {selectedMed ? (
          <div className="flex items-center justify-between w-full pr-2">
            <span className="font-extrabold text-blue-700">{selectedMed.name}</span>
            <span className="font-mono text-slate-600">
              ₹{selectedMed.sellingPrice} (Stock: {selectedMed.stockQuantity})
            </span>
          </div>
        ) : (
          <span className="text-slate-400 font-normal">{placeholder}</span>
        )}
        <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-300 rounded-2xl shadow-2xl z-50 overflow-hidden animate-fade-in">
          {/* Live Search Input Box */}
          <div className="p-2 border-b border-slate-200 bg-slate-50 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type to filter 1,000 medicines..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filtered Options List */}
          <div className="max-h-60 overflow-y-auto divide-y divide-slate-100">
            {filteredMedicines.length === 0 ? (
              <div className="p-4 text-center text-slate-500 text-xs font-semibold">
                No medicine matching "{searchTerm}"
              </div>
            ) : (
              filteredMedicines.map((med) => {
                const isSelected = med._id === selectedMedicineId;
                const isLowStock = med.stockQuantity <= 10;
                return (
                  <button
                    type="button"
                    key={med._id}
                    onClick={() => handleSelect(med)}
                    className={`w-full text-left p-3 flex items-center justify-between transition-colors ${
                      isSelected
                        ? "bg-blue-50 text-blue-800 font-bold"
                        : "hover:bg-slate-50 text-slate-800"
                    }`}
                  >
                    <div>
                      <div className="font-extrabold text-slate-900 flex items-center gap-2">
                        {med.name}
                        {isLowStock && (
                          <span className="bg-amber-100 text-amber-800 text-[9px] font-black px-2 py-0.5 rounded flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 text-amber-600" /> Low Stock ({med.stockQuantity})
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium">
                        {med.category} • {med.manufacturer || "Generic"} • {med.unit || "Tablets"}
                      </p>
                    </div>

                    <div className="text-right font-mono flex items-center gap-2">
                      <span className="font-black text-blue-700">₹{med.sellingPrice}</span>
                      {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
