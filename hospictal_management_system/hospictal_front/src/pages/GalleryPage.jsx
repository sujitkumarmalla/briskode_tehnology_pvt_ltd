import { useState } from "react";
import { galleryCategories, galleryItems } from "../data/galleryData";

function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredItems = activeCategory === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-emerald-700 font-extrabold text-[11px] uppercase tracking-widest bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200">
            Hospital Clinical Gallery
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Operation Theatre & Surgical Success Gallery
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Explore real-life photos from our advanced modular Operation Theatres (OT), surgical procedures, successful patient recoveries, and critical care suites.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="bg-white rounded-xl border border-slate-300 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800";
                  }}
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-extrabold px-2.5 py-1 bg-slate-900/90 text-white rounded-md backdrop-blur-xs">
                    {item.date}
                  </span>
                </div>
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-bold px-3 py-1.5 bg-emerald-600 rounded-lg shadow-md flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    <span>View Full Photo</span>
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 font-medium mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox Preview */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-slate-800 hover:bg-rose-600 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div className="relative h-[380px] sm:h-[450px] bg-black">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-5 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded">
                    {selectedImage.date}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-white">{selectedImage.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedImage.description}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default GalleryPage;
