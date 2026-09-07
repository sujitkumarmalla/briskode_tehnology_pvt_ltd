import React, { useState } from "react";
import { UploadCloud, Image as ImageIcon, Loader2, X, Check } from "lucide-react";
import { toast } from "react-toastify";

export default function CloudinaryUpload({ value, onChange, label = "Profile Photo (Cloudinary Upload)" }) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      return toast.error("Please select a valid image file");
    }

    setUploading(true);
    try {
      // Create FormData for Cloudinary API Unsigned Upload
      const formData = new FormData();
      formData.append("file", file);
      // Using Cloudinary demo upload preset or custom configuration
      formData.append("upload_preset", "docs_upload_example_us_preset");

      const cloudName = "demo"; // Default Cloudinary demo cloud name
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (data.secure_url) {
        onChange(data.secure_url);
        toast.success("Photo uploaded via Cloudinary successfully!");
      } else {
        // Fallback: Convert to Data URL if Cloudinary upload preset requires authorization
        const reader = new FileReader();
        reader.onloadend = () => {
          onChange(reader.result);
          toast.success("Photo loaded and processed successfully!");
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.warn("Cloudinary upload notice, using local file reader:", err);
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result);
        toast.success("Photo loaded successfully!");
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFileUpload(file);
  };

  return (
    <div className="space-y-2">
      <label className="block font-semibold text-slate-700 text-xs flex items-center justify-between">
        <span>{label}</span>
        <span className="text-[10px] font-bold text-blue-600 flex items-center gap-1">
          <UploadCloud className="w-3.5 h-3.5" /> Powered by Cloudinary
        </span>
      </label>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Preview Thumbnail */}
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-100 flex-shrink-0 flex items-center justify-center group shadow-sm">
          {value ? (
            <>
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => onChange("")}
                className="absolute inset-0 bg-slate-950/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove photo"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <ImageIcon className="w-6 h-6 text-slate-400" />
          )}
        </div>

        {/* Upload Action Area */}
        <div className="flex-1 w-full space-y-2">
          <div className="flex items-center gap-2">
            <label className="flex-1 cursor-pointer bg-slate-50 hover:bg-slate-100 border border-dashed border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-600 font-semibold flex items-center justify-center gap-2 transition-colors">
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  <span>Uploading to Cloudinary...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4 text-blue-600" />
                  <span>Select Image to Upload via Cloudinary</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                disabled={uploading}
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Direct Photo URL Input Option */}
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Or paste Cloudinary image URL..."
            className="w-full p-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-mono text-slate-700 bg-white"
          />
        </div>
      </div>
    </div>
  );
}
