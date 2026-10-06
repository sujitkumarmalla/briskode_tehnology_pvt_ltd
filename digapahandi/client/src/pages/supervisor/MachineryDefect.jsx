import { useState, useRef, useCallback } from 'react';
import { Search, Filter, Plus, Wrench, X, User, Phone, Calendar, Check, RefreshCw, AlertCircle, Camera } from 'lucide-react';
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
      supervisorName: 'John Doe',
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

  const filteredDefects = defects.filter(defect => {
    const matchesSearch = 
      defect.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      defect.machineType.toLowerCase().includes(searchTerm.toLowerCase()) || 
      defect.supervisorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || defect.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-600 to-brand-400 p-8 text-white shadow-xl shadow-brand-500/20">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-10 -mb-4 w-24 h-24 bg-black/10 rounded-full blur-xl"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md border border-white/20 shadow-inner">
              <Wrench size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2 tracking-tight">
                {t('supervisor.machineryDefectTitle', 'Machinery Defects')}
              </h1>
              <p className="text-brand-50/80 text-sm font-medium max-w-md">
                {t('supervisor.machineryDefectDesc', 'Log, track, and manage all machinery issues reported by supervisors in the field.')}
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="bg-white text-brand-600 hover:bg-brand-50 hover:scale-105 px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all duration-300"
          >
            <Plus size={20} strokeWidth={3} />
            {t('supervisor.addDefect', 'Report Defect')}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Defects', value: totalDefects, icon: AlertCircle, color: 'text-brand-500', bg: 'bg-brand-50' },
          { label: 'Recently Started', value: started, icon: Wrench, color: 'text-red-500', bg: 'bg-red-50' },
          { label: 'In Progress', value: inProgress, icon: RefreshCw, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Fully Repaired', value: repaired, icon: Check, color: 'text-emerald-500', bg: 'bg-emerald-50' }
        ].map((stat, idx) => (
          <div key={idx} className="glass-card rounded-2xl p-6 flex items-center gap-5 relative overflow-hidden group">
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
              <stat.icon size={28} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 mb-1">{stat.label}</p>
              <h2 className="text-3xl font-bold text-slate-800">{stat.value}</h2>
            </div>
            {/* Decorative background element */}
            <div className={`absolute -right-6 -bottom-6 w-24 h-24 ${stat.bg} rounded-full blur-2xl opacity-50 transition-all duration-300 group-hover:scale-150`}></div>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="glass-card p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder={t('supervisor.search', 'Search by ID, machine type, or supervisor...')}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border-none bg-slate-100/50 focus:bg-white focus:ring-2 focus:ring-brand-500/50 transition-all text-slate-700 font-medium placeholder:text-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative w-full sm:w-56 group">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors" size={18} />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full pl-11 pr-10 py-3.5 rounded-xl border-none bg-slate-100/50 focus:bg-white focus:ring-2 focus:ring-brand-500/50 transition-all text-slate-700 font-medium appearance-none cursor-pointer"
          >
            <option value="All Status">{t('supervisor.allStatus', 'All Status')}</option>
            <option value="started">{t('supervisor.started', 'Started')}</option>
            <option value="in progress">{t('supervisor.inProgress', 'In Progress')}</option>
            <option value="repaired">{t('supervisor.repaired', 'Repaired')}</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      {/* Defect Cards */}
      <div className="space-y-6">
        {filteredDefects.length === 0 ? (
          <div className="glass-card p-12 rounded-3xl text-center flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle size={32} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">No defects found</h3>
            <p className="text-slate-500 max-w-sm mx-auto">
              We couldn't find any machinery defects matching your search criteria. You're all caught up!
            </p>
          </div>
        ) : (
          filteredDefects.map(defect => (
            <div key={defect.id} className="glass-card rounded-3xl p-1 p-6 flex flex-col gap-6 relative group overflow-hidden">
              {/* Highlight bar for status */}
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                defect.status === 'repaired' ? 'bg-emerald-500' : 
                defect.status === 'in progress' ? 'bg-blue-500' : 'bg-brand-500'
              }`}></div>
              
              <div className="flex items-start justify-between pl-2">
                <div className="flex gap-4 items-center">
                  <div className={`p-3 rounded-xl flex items-center justify-center ${
                      defect.status === 'repaired' ? 'bg-emerald-100 text-emerald-600' : 
                      defect.status === 'in progress' ? 'bg-blue-100 text-blue-600' : 'bg-brand-100 text-brand-600'
                    }`}>
                    {defect.status === 'repaired' ? <Check size={24} /> : defect.status === 'in progress' ? <RefreshCw size={24} /> : <AlertCircle size={24} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold text-slate-800">DEF-{defect.id}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        defect.status === 'repaired' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 
                        defect.status === 'in progress' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 
                        'bg-brand-50 text-brand-600 border border-brand-200'
                      }`}>
                        {defect.status}
                      </span>
                    </div>
                    <p className="text-slate-500 font-medium flex items-center gap-2">
                      <Wrench size={14} /> {defect.machineType}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col lg:flex-row gap-8 pl-2">
                <div className="flex-1 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-4 hover:bg-slate-100 transition-colors border border-slate-100">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <User size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Reported By</p>
                        <p className="font-bold text-slate-700">{defect.supervisorName}</p>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-4 hover:bg-slate-100 transition-colors border border-slate-100">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <Phone size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Contact</p>
                        <p className="font-bold text-slate-700">{defect.contactNumber}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-4 hover:bg-slate-100 transition-colors border border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Reported On</p>
                      <p className="font-bold text-slate-700">{defect.createdAt}</p>
                    </div>
                  </div>
                  
                  {defect.description && (
                    <div className="bg-brand-50/50 p-5 rounded-2xl border border-brand-100/50 relative">
                      <div className="absolute -left-1.5 top-5 w-3 h-3 rounded-full bg-brand-300"></div>
                      <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-2">Issue Description</p>
                      <p className="text-slate-700 leading-relaxed font-medium">{defect.description}</p>
                    </div>
                  )}
                </div>

                {/* Captured Image */}
                <div className="w-full lg:w-72 h-56 rounded-2xl relative overflow-hidden flex-shrink-0 shadow-inner group-hover:shadow-md transition-all border border-slate-200 bg-slate-100 flex items-center justify-center">
                  {defect.image ? (
                    <img src={defect.image} alt="Defect" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
                      <Camera size={32} className="opacity-50" />
                      <span className="text-sm font-medium">No Image Provided</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100 mt-2">
                <button 
                  onClick={() => handleStatusUpdate(defect.id, defect.status)}
                  disabled={defect.status === 'repaired'}
                  className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all duration-300 ${
                    defect.status === 'repaired' 
                      ? 'bg-emerald-50 text-emerald-600 cursor-not-allowed border border-emerald-200' 
                      : defect.status === 'in progress' 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30' 
                      : 'bg-brand-500 text-white hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/30'
                  }`}
                >
                  {defect.status === 'repaired' ? (
                    <>
                      <Check size={20} strokeWidth={3} />
                      Resolution Complete
                    </>
                  ) : defect.status === 'in progress' ? (
                    <>
                      <Check size={20} />
                      Mark as Repaired
                    </>
                  ) : (
                    <>
                      <Wrench size={20} />
                      Start Repairs
                    </>
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-md">
          <div className="bg-white rounded-[2rem] w-full max-w-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">
            <div className="bg-gradient-to-r from-brand-600 to-brand-500 p-6 flex justify-between items-center text-white">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Report Machinery Defect</h2>
                <p className="text-brand-100 text-sm font-medium mt-1">Fill out the details to log a new issue</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors backdrop-blur-sm"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-6 overflow-y-auto bg-slate-50/50">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={contactNumber}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      if (val.length <= 10) setContactNumber(val);
                    }}
                    placeholder="Enter 10-digit number"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 bg-white transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Machine Type <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select 
                      value={machineType}
                      onChange={(e) => setMachineType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 bg-white appearance-none transition-all font-medium text-slate-700"
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
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Issue Description
                </label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the defect in detail..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 bg-white min-h-[100px] resize-none transition-all font-medium"
                ></textarea>
              </div>

              {/* WebCam Capture Box */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <Camera size={16} /> Photo Evidence
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-2xl overflow-hidden relative flex flex-col min-h-[200px] bg-slate-900 group">
                  {capturedImage ? (
                    <>
                      <img src={capturedImage} alt="captured" className="w-full max-h-[250px] object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button onClick={() => setCapturedImage(null)} className="px-5 py-2.5 bg-white text-slate-800 rounded-xl font-bold shadow-lg flex items-center gap-2 hover:bg-slate-50 transition-all scale-95 group-hover:scale-100">
                          <RefreshCw size={18} /> Retake Photo
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        className="w-full max-h-[250px] object-cover opacity-80"
                      />
                      <button onClick={captureImage} className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2.5 bg-brand-500 text-white rounded-full font-bold shadow-lg hover:bg-brand-600 transition-all flex items-center gap-2 hover:scale-105 active:scale-95 border-2 border-white/20">
                        <Camera size={18} /> Capture Photo
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-white">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                className="px-8 py-3 bg-brand-500 text-white rounded-xl font-bold shadow-lg shadow-brand-500/30 hover:bg-brand-600 hover:shadow-xl hover:shadow-brand-500/40 transition-all active:scale-95 flex items-center gap-2"
              >
                <Plus size={20} strokeWidth={3} /> Submit Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MachineryDefect;







