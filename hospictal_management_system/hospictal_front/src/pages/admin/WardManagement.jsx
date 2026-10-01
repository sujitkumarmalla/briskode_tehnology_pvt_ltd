import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../../utils/api";

export default function WardManagement() {
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // New Ward form state
  const [newWard, setNewWard] = useState({ name: "", totalSeats: "", price: "" });

  useEffect(() => {
    fetchWards();
  }, []);

  const fetchWards = async () => {
    try {
      const res = await API.get("/wards");
      if (res.data.success) {
        setWards(res.data.wards);
      }
    } catch (error) {
      toast.error("Failed to load wards");
    } finally {
      setLoading(false);
    }
  };

  const handleAddWard = async (e) => {
    e.preventDefault();
    if (!newWard.name || !newWard.totalSeats || !newWard.price) {
      toast.error("All fields are required");
      return;
    }
    try {
      const res = await API.post("/wards", {
        name: newWard.name,
        totalSeats: Number(newWard.totalSeats),
        price: Number(newWard.price)
      });
      if (res.data.success) {
        toast.success("Ward added successfully!");
        setNewWard({ name: "", totalSeats: "", price: "" });
        fetchWards();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add ward");
    }
  };

  if (loading) return <div>Loading wards...</div>;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-4">Add New Ward</h3>
        <form onSubmit={handleAddWard} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Ward Name / Type</label>
            <input
              type="text"
              required
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
              placeholder="e.g. General Ward A"
              value={newWard.name}
              onChange={(e) => setNewWard({ ...newWard, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Total Seats</label>
            <input
              type="number"
              required
              min="1"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
              placeholder="e.g. 50"
              value={newWard.totalSeats}
              onChange={(e) => setNewWard({ ...newWard, totalSeats: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Price per day (₹)</label>
            <input
              type="number"
              required
              min="0"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
              placeholder="e.g. 500"
              value={newWard.price}
              onChange={(e) => setNewWard({ ...newWard, price: e.target.value })}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl shadow-md transition-colors"
            >
              + Add Ward
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wards.map((ward) => (
          <div key={ward._id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="text-lg font-black text-slate-900">{ward.name}</h4>
            <p className="text-sm font-bold text-emerald-600 mb-4">₹{ward.price} / day</p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                <span className="block text-xs font-bold text-slate-500 uppercase">Total Seats</span>
                <span className="block text-xl font-black text-slate-800">{ward.totalSeats}</span>
              </div>
              <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100 text-center">
                <span className="block text-xs font-bold text-emerald-700 uppercase">Available</span>
                <span className="block text-xl font-black text-emerald-900">{ward.available}</span>
              </div>
            </div>
            
            <div className="bg-rose-50 p-3 rounded-2xl border border-rose-100 text-center">
              <span className="block text-xs font-bold text-rose-700 uppercase">Occupied Seats</span>
              <span className="block text-xl font-black text-rose-900">{ward.occupied}</span>
            </div>
          </div>
        ))}
        {wards.length === 0 && (
          <div className="col-span-full text-center py-12 text-slate-500 bg-white rounded-3xl border border-slate-200 border-dashed">
            No wards configured yet. Add a new ward to get started.
          </div>
        )}
      </div>
    </div>
  );
}
