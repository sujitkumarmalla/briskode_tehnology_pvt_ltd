import { useState, useRef, useEffect } from 'react';
import { Camera, X, Check, RefreshCw } from 'lucide-react';

const PostComplaint = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [complaints, setComplaints] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = async () => {
    setIsCameraOpen(true);
    setCapturedImage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Unable to access camera. Please make sure you have granted permission.");
      setIsCameraOpen(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsCameraOpen(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageUrl);
      stopCamera();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!capturedImage) return;
    
    const newComplaint = {
      id: Date.now(),
      image: capturedImage,
      description,
      location,
      status: 'Pending',
      date: new Date().toLocaleDateString()
    };
    
    setComplaints([newComplaint, ...complaints]);
    
    // Reset form
    setCapturedImage(null);
    setDescription('');
    setLocation('');
  };

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-[#0a8459] rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-md">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 drop-shadow-sm">Post a Complaint</h1>
          <p className="text-sm sm:text-base opacity-90 max-w-2xl">
            Capture and submit issues in real time to help keep our city clean!
          </p>
        </div>
        {!isCameraOpen && !capturedImage && (
          <button onClick={startCamera} className="bg-white text-[#0a8459] px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm shrink-0">
            <Camera size={18} />
            Open Camera
          </button>
        )}
      </div>

      {/* Camera / Form Area */}
      {(isCameraOpen || capturedImage) && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800">
              {isCameraOpen ? 'Live Camera' : 'Complaint Details'}
            </h2>
            <button onClick={() => { stopCamera(); setCapturedImage(null); }} className="text-gray-500 hover:bg-gray-100 p-2 rounded-full">
              <X size={20} />
            </button>
          </div>

          {isCameraOpen && !capturedImage && (
            <div className="flex flex-col items-center">
              <div className="w-full max-w-2xl bg-black rounded-xl overflow-hidden relative aspect-video shadow-inner">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  className="w-full h-full object-cover"
                ></video>
                <canvas ref={canvasRef} className="hidden"></canvas>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center pb-4">
                  <button 
                    onClick={captureImage} 
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-[0_0_0_4px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform"
                  >
                    <div className="w-14 h-14 bg-white border-2 border-gray-300 rounded-full"></div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {capturedImage && (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
              <div className="space-y-4">
                <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm relative group">
                  <img src={capturedImage} alt="Captured" className="w-full h-auto object-cover aspect-video" />
                  <button 
                    type="button"
                    onClick={startCamera} 
                    className="absolute top-2 right-2 bg-white/90 backdrop-blur text-gray-800 px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-sm hover:bg-white"
                  >
                    <RefreshCw size={14} /> Retake
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Location *</label>
                  <input 
                    type="text" 
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter landmark or street" 
                    className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-[#0a8459] focus:ring-1 focus:ring-[#0a8459]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
                  <textarea 
                    required
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the issue..." 
                    className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-[#0a8459] focus:ring-1 focus:ring-[#0a8459]"
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-[#0a8459] text-white py-3.5 rounded-lg font-bold shadow-md hover:bg-[#076846] transition-colors flex items-center justify-center gap-2 mt-2">
                  <Check size={18} /> Submit Complaint
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Complaint Summary Area */}
      {!isCameraOpen && !capturedImage && (
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4">Recent Complaints</h2>
          
          {complaints.length === 0 ? (
            <div className="border-2 border-dashed border-gray-300 rounded-2xl bg-white p-12 flex flex-col items-center justify-center text-center min-h-[300px]">
              <div className="text-emerald-500 mb-4 bg-emerald-50 p-4 rounded-full">
                <Camera size={40} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">No complaints submitted yet</h3>
              <p className="text-slate-500 max-w-sm mb-6">
                Capture an image and post your first complaint to help keep the environment clean.
              </p>
              <button onClick={startCamera} className="bg-[#0a8459] text-white px-6 py-2.5 rounded-xl font-semibold shadow-sm hover:bg-[#076846] transition-colors">
                Open Camera
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {complaints.map(comp => (
                <div key={comp.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="h-48 overflow-hidden bg-gray-100">
                    <img src={comp.image} alt="Complaint" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-slate-800 line-clamp-1">{comp.location}</h3>
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
                        {comp.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-2">{comp.description}</p>
                    <p className="text-xs text-slate-400 pt-2 border-t">{comp.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostComplaint;
