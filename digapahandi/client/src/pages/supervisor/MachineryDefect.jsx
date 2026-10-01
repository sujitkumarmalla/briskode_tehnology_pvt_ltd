import { useState, useRef, useCallback } from 'react';
import { Search, Filter, Plus, Wrench, X, User, Phone, Calendar, Check, RefreshCw } from 'lucide-react';
import Webcam from "react-webcam";
import { useTranslation } from 'react-i18next';

const MachineryDefect = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defects, setDefects] = useState([]);
  
  const [contactNumber, setContactNumber] = useState('');
  const [machineType, setMachineType] = useState('');
  const [description, setDescription] = useState('');
  
  const [capturedImage, setCapturedImage] = useState(null);
  const webcamRef = useRef(null);

  const captureImage = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
    }
  }, [webcamRef]);

  const handleSubmit = () => {
    if (!contactNumber || !machineType) {
      alert("Please fill out all required fields.");
      return;
    }
    const newDefect = {
      id: Math.random().toString(16).slice(2, 8).toUpperCase(),
      supervisorName: 'test',
      contactNumber,
      machineType,
      description,
      image: capturedImage,
      status: 'started',
      createdAt: new Date().toLocaleString()
    };
    setDefects([newDefect, ...defects]);
    setIsModalOpen(false);
    setContactNumber('');
    setMachineType('');
    setDescription('');
    setCapturedImage(null);
  };

  const handleStatusUpdate = (id, currentStatus) => {
    let nextStatus = 'repaired';
    if (currentStatus === 'started') {
      nextStatus = 'in progress';
    } else if (currentStatus === 'in progress') {
      nextStatus = 'repaired';
    }
    setDefects(defects.map(d => d.id === id ? { ...d, status: nextStatus } : d));
  };

  const totalDefects = defects.length + 4; // Mocked stats + actual
  const started = defects.filter(d => d.status === 'started').length + 1;
  const inProgress = defects.filter(d => d.status === 'in progress').length;
  const repaired = defects.filter(d => d.status === 'repaired').length + 3;

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6 pb-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-2xl p-6 text-white shadow-md flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
            <Wrench size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-1">
              {t('supervisor.machineryDefectTitle')}
            </h1>
            <p className="text-emerald-50 text-sm">
              {t('supervisor.machineryDefectDesc')}
            </p>
          </div>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-white/20 hover:bg-white/30 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-sm transition-colors backdrop-blur-sm">
          {t('supervisor.addDefect')}
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#2563eb] rounded-2xl p-6 text-white shadow-md">
          <p className="text-sm font-medium opacity-90 mb-1">{t('supervisor.totalDefects')}</p>
          <h2 className="text-4xl font-bold">{totalDefects}</h2>
        </div>
        <div className="bg-[#f97316] rounded-2xl p-6 text-white shadow-md">
          <p className="text-sm font-medium opacity-90 mb-1">{t('supervisor.started')}</p>
          <h2 className="text-4xl font-bold">{started}</h2>
        </div>
        <div className="bg-[#8b5cf6] rounded-2xl p-6 text-white shadow-md">
          <p className="text-sm font-medium opacity-90 mb-1">{t('supervisor.inProgress')}</p>
          <h2 className="text-4xl font-bold">{inProgress}</h2>
        </div>
        <div className="bg-[#10b981] rounded-2xl p-6 text-white shadow-md">
          <p className="text-sm font-medium opacity-90 mb-1">{t('supervisor.repaired')}</p>
          <h2 className="text-4xl font-bold">{repaired}</h2>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder={t('supervisor.search')}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#10b981] shadow-sm bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative w-full sm:w-auto">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-48 pl-11 pr-8 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#10b981] shadow-sm bg-white appearance-none cursor-pointer"
          >
            <option value="All Status">{t('supervisor.allStatus')}</option>
            <option value="started">{t('supervisor.started')}</option>
            <option value="in progress">{t('supervisor.inProgress')}</option>
            <option value="repaired">{t('supervisor.repaired')}</option>
          </select>
        </div>
      </div>

      {/* Defect Cards */}
      <div className="space-y-4">
        {defects
          .filter(defect => {
            const matchesSearch = 
              defect.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
              defect.machineType.toLowerCase().includes(searchTerm.toLowerCase()) || 
              defect.supervisorName.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'All Status' || defect.status === statusFilter;
            return matchesSearch && matchesStatus;
          })
          .length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-500">
            No machinery defects match your criteria.
          </div>
        ) : (
          defects
            .filter(defect => {
              const matchesSearch = 
                defect.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                defect.machineType.toLowerCase().includes(searchTerm.toLowerCase()) || 
                defect.supervisorName.toLowerCase().includes(searchTerm.toLowerCase());
              const matchesStatus = statusFilter === 'All Status' || defect.status === statusFilter;
              return matchesSearch && matchesStatus;
            })
            .map(defect => (
            <div key={defect.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6 relative">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-800">DEF-{defect.id}</h3>
                  <p className="text-gray-500 text-sm">{defect.machineType}</p>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${defect.status === 'repaired' ? 'bg-green-50 text-green-600 border-green-200' : defect.status === 'in progress' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-amber-50 text-amber-600 border-amber-200'}`}>
                  {defect.status}
                </span>
              </div>
              
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex items-center gap-3">
                      <User className="text-blue-500" size={20} />
                      <div>
                        <p className="text-xs text-gray-500">Supervisor</p>
                        <p className="font-semibold text-slate-800">{defect.supervisorName}</p>
                      </div>
                    </div>
                    <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100 flex items-center gap-3">
                      <Phone className="text-purple-500" size={20} />
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="font-semibold text-slate-800">{defect.contactNumber}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100 flex items-center gap-3">
                    <Calendar className="text-orange-500" size={20} />
                    <div>
                      <p className="text-xs text-gray-500">Created</p>
                      <p className="font-semibold text-slate-800">{defect.createdAt}</p>
                    </div>
                  </div>
                </div>

                {/* Captured Image */}
                <div className="w-full lg:w-64 h-48 bg-gray-900 rounded-xl relative overflow-hidden flex-shrink-0">
                  {defect.image ? (
                    <img src={defect.image} alt="Defect" className="absolute inset-0 w-full h-full object-cover opacity-90" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-sm">No Image</div>
                  )}
                </div>
              </div>

              {defect.description && (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-sm font-semibold text-gray-600 mb-1">Description:</p>
                  <p className="text-slate-800">{defect.description}</p>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button 
                  onClick={() => handleStatusUpdate(defect.id, defect.status)}
                  disabled={defect.status === 'repaired'}
                  className={`px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-sm transition-colors ${
                    defect.status === 'repaired' ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 
                    defect.status === 'in progress' ? 'bg-blue-600 text-white hover:bg-blue-700' : 
                    'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {defect.status === 'repaired' ? (
                    <>
                      <Check size={18} />
                      Completed
                    </>
                  ) : defect.status === 'in progress' ? (
                    "Mark Completed"
                  ) : (
                    "Mark In Progress"
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="bg-[#0f968c] p-4 flex justify-between items-center text-white">
              <h2 className="text-xl font-bold">Report Machinery Defect</h2>
              <button onClick={() => setIsModalOpen(false)} className="hover:bg-white/20 p-1 rounded-md transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-5 overflow-y-auto bg-gray-50/50">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={contactNumber}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    if (val.length <= 10) setContactNumber(val);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0f968c] bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Machine Type <span className="text-red-500">*</span>
                </label>
                <select 
                  value={machineType}
                  onChange={(e) => setMachineType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0f968c] bg-white appearance-none"
                >
                  <option value="">Select machine type</option>
                  <option value="Sheaving/Screening Machine">Sheaving/Screening Machine</option>
                  <option value="Balling Machine">Balling Machine</option>
                  <option value="Incinerator">Incinerator</option>
                  <option value="Grass Cutter">Grass Cutter</option>
                  <option value="Tree Cutter">Tree Cutter</option>
                  <option value="Grease Gun">Grease Gun</option>
                  <option value="Shredder Machine">Shredder Machine</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Description
                </label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0f968c] bg-white min-h-[80px]"
                ></textarea>
              </div>

              {/* WebCam Capture Box */}
              <div className="mt-4 border-2 border-dashed border-gray-300 rounded-xl overflow-hidden relative flex flex-col min-h-[160px] bg-black">
                {capturedImage ? (
                  <>
                    <img src={capturedImage} alt="captured" className="w-full max-h-[220px] object-cover" />
                    <button onClick={() => setCapturedImage(null)} className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 border border-gray-200 transition-colors" title="Retake Image">
                      <RefreshCw size={18} className="text-gray-600" />
                    </button>
                  </>
                ) : (
                  <>
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      className="w-full max-h-[220px] object-cover"
                    />
                    <button onClick={captureImage} className="absolute bottom-3 right-3 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold shadow-sm hover:bg-blue-700 transition-colors">
                      Capture
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-white">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="bg-white text-gray-700 border border-gray-300 px-5 py-2.5 rounded-xl font-semibold shadow-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                className="bg-[#0f968c] text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm hover:bg-[#0d847b] transition-colors"
              >
                Submit Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MachineryDefect;
