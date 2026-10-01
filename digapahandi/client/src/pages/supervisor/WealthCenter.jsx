import { useState, useRef, useCallback } from 'react';
import Webcam from "react-webcam";
import { Download, Search, Filter, Phone, User, Plus, X, IndianRupee, RefreshCw, ArrowLeft, Box, ShoppingCart, TrendingUp, Minus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const WealthCenter = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  
  const [activeTab, setActiveTab] = useState('MCC');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddRecordModalOpen, setIsAddRecordModalOpen] = useState(false);
  const [records, setRecords] = useState([]);
  const [cubeRecords, setCubeRecords] = useState([]);
  
  const [khataStock, setKhataStock] = useState(1000);
  const [khataAddedToday, setKhataAddedToday] = useState(0);
  const [khataSoldToday, setKhataSoldToday] = useState(0);
  const [addQuantity, setAddQuantity] = useState('');
  const [soldQuantity, setSoldQuantity] = useState('');
  const [khataTransactions, setKhataTransactions] = useState([
    { id: 'tx1', type: 'MAKE', qty: 12000, date: '2/23/2026, 6:09:00 AM' },
    { id: 'tx2', type: 'SELL', qty: 10000, date: '2/23/2026, 6:09:10 AM' }
  ]);

  const handleAddKhata = () => {
    if (!addQuantity) return;
    const qty = parseInt(addQuantity) || 0;
    setKhataStock(prev => prev + qty);
    setKhataAddedToday(prev => prev + qty);
    setKhataTransactions([{ id: Date.now().toString(), type: 'MAKE', qty, date: new Date().toLocaleString() }, ...khataTransactions]);
    setAddQuantity('');
  };
  
  const handleSoldKhata = () => {
    if (!soldQuantity) return;
    const qty = parseInt(soldQuantity) || 0;
    if (qty > khataStock) { alert("Not enough stock!"); return; }
    setKhataStock(prev => prev - qty);
    setKhataSoldToday(prev => prev + qty);
    setKhataTransactions([{ id: Date.now().toString(), type: 'SELL', qty, date: new Date().toLocaleString() }, ...khataTransactions]);
    setSoldQuantity('');
  };
  
  const [addRecordSupervisor, setAddRecordSupervisor] = useState('');
  const [addRecordContact, setAddRecordContact] = useState('');
  const [addRecordCube, setAddRecordCube] = useState('');
  const [capturedImage, setCapturedImage] = useState(null);
  const webcamRef = useRef(null);

  const captureImage = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
    }
  }, [webcamRef]);
  
  const [agencyName, setAgencyName] = useState('');
  const [material, setMaterial] = useState('');
  const [weight, setWeight] = useState('');
  const [rate, setRate] = useState('');

  const total = (parseFloat(weight) || 0) * (parseFloat(rate) || 0);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("MRF Agency Sell Record", 14, 15);
    
    autoTable(doc, {
      startY: 25,
      head: [['Field', 'Value']],
      body: [
        ['Agency Name', agencyName],
        ['Material', material],
        ['Weight (KG)', weight],
        ['Rate (Rs/KG)', rate],
        ['Total (Rs)', total]
      ],
    });
    
    doc.save(`agency_sell_${new Date().getTime()}.pdf`);
  };

  const handleSubmit = () => {
    if (!agencyName || !material || !weight || !rate) {
      alert("Please fill out all required fields.");
      return;
    }
    const newRecord = {
      id: Date.now().toString(),
      agencyName,
      material,
      weight,
      rate,
      total
    };
    setRecords([newRecord, ...records]);
    setIsModalOpen(false);
    setAgencyName('');
    setMaterial('');
    setWeight('');
    setRate('');
  };

  const handleAddRecordSubmit = () => {
    if (!addRecordSupervisor || !addRecordContact || !addRecordCube) {
      alert("Please fill out all required fields.");
      return;
    }
    const newRecord = {
      id: Date.now().toString(),
      supervisorName: addRecordSupervisor,
      contactNumber: addRecordContact,
      cubeNumber: addRecordCube,
      type: activeTab,
      image: capturedImage
    };
    setCubeRecords([newRecord, ...cubeRecords]);
    setIsAddRecordModalOpen(false);
    setAddRecordSupervisor('');
    setAddRecordContact('');
    setAddRecordCube('');
    setCapturedImage(null);
  };

  const handleDownloadPDFForRecord = (record) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("MRF Agency Sell Record", 14, 15);
    
    autoTable(doc, {
      startY: 25,
      head: [['Field', 'Value']],
      body: [
        ['Agency Name', record.agencyName],
        ['Material', record.material],
        ['Weight (KG)', record.weight],
        ['Rate (Rs/KG)', record.rate],
        ['Total (Rs)', record.total]
      ],
    });
    
    doc.save(`agency_sell_${record.id}.pdf`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6 pb-10">
      {activeTab === 'MoKhata' ? (
        <div className="flex flex-col rounded-2xl shadow-sm border border-gray-100 overflow-hidden bg-gradient-to-br from-[#c1f5d6] to-[#e6fcf0]">
          <div className="bg-[#f97316] p-4 flex justify-between items-center text-white shadow-sm">
             <div className="flex items-center gap-3">
               <button onClick={() => setActiveTab('MCC')} className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                 <ArrowLeft size={20} />
               </button>
               <h2 className="text-2xl font-bold">Mo Khata</h2>
             </div>
             <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl flex items-center gap-2 font-semibold text-sm transition-colors">
               <Download size={18} />
               Download PDF
             </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#4f46e5] rounded-2xl p-6 text-white shadow-md flex flex-col justify-between">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <Box size={24} />
                </div>
                <p className="text-sm font-medium mb-1">Current Stock</p>
                <h2 className="text-5xl font-bold mb-1">{khataStock}</h2>
                <p className="text-sm opacity-80">Khata</p>
              </div>

              <div className="bg-[#10b981] rounded-2xl p-6 text-white shadow-md flex flex-col justify-between">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <Plus size={24} />
                </div>
                <p className="text-sm font-medium mb-1">Today Made</p>
                <h2 className="text-5xl font-bold mb-1">{khataAddedToday}</h2>
                <p className="text-sm opacity-80">Added</p>
              </div>

              <div className="bg-[#f2310f] rounded-2xl p-6 text-white shadow-md flex flex-col justify-between">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <ShoppingCart size={24} />
                </div>
                <p className="text-sm font-medium mb-1">Today Sold</p>
                <h2 className="text-5xl font-bold mb-1">{khataSoldToday}</h2>
                <p className="text-sm opacity-80">Sold</p>
              </div>
            </div>

            <div className="bg-[#9333ea] rounded-2xl p-6 text-white shadow-md">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <TrendingUp size={20} />
                </div>
                <h3 className="text-xl font-bold">Daily Summary</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-sm opacity-80 mb-1">Net Change Today</p>
                  <h4 className="text-2xl font-bold">{khataAddedToday - khataSoldToday}</h4>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-sm opacity-80 mb-1">Sales Rate</p>
                  <h4 className="text-2xl font-bold">{khataAddedToday > 0 ? Math.round((khataSoldToday / khataAddedToday) * 100) : 0}%</h4>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-sm opacity-80 mb-1">Remaining Stock</p>
                  <h4 className="text-2xl font-bold">{khataStock}</h4>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#10b981] rounded-xl flex items-center justify-center text-white">
                    <Plus size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Add Khata</h3>
                </div>
                <input 
                  type="number"
                  placeholder="Enter quantity"
                  value={addQuantity}
                  onChange={e => setAddQuantity(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 mb-4 focus:outline-none focus:ring-2 focus:ring-[#10b981]"
                />
                <button onClick={handleAddKhata} className="w-full bg-[#10b981] text-white py-3 rounded-xl font-bold shadow-sm hover:bg-emerald-600 transition-colors">
                  Add to Stock
                </button>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#f97316] rounded-xl flex items-center justify-center text-white">
                    <Minus size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Sold Khata</h3>
                </div>
                <input 
                  type="number"
                  placeholder="Enter quantity"
                  value={soldQuantity}
                  onChange={e => setSoldQuantity(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 mb-4 focus:outline-none focus:ring-2 focus:ring-[#f97316]"
                />
                <button onClick={handleSoldKhata} className="w-full bg-[#f2310f] text-white py-3 rounded-xl font-bold shadow-sm hover:bg-red-700 transition-colors">
                  Mark as Sold
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Transactions History</h3>
              <div className="space-y-3">
                {khataTransactions.map(tx => (
                  <div key={tx.id} className="border border-gray-200 rounded-xl p-4 flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2 font-bold text-slate-800">
                        {tx.type === 'MAKE' ? <Plus size={16} className="text-[#8b5cf6]" /> : <Minus size={16} className="text-[#8b5cf6]" />}
                        {tx.type === 'MAKE' ? 'Made' : 'Sold'} : {tx.qty}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{tx.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${tx.type === 'MAKE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {tx.type}
                    </span>
                  </div>
                ))}
                {khataTransactions.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No transactions yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 to-emerald-700 rounded-2xl p-6 text-white shadow-md flex items-center gap-4">
        <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
          <div className="w-8 h-8 border-[3px] border-white rounded-md flex items-center justify-center">
            <div className="w-3 h-3 border-[2px] border-white rounded-sm"></div>
          </div>
        </div>
        <h1 className="text-2xl font-bold">
          {activeTab === 'MCC' ? t('supervisor.wealthCenterTitle') : t('supervisor.wealthCenterTitleMrf')}
        </h1>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          {activeTab === 'MCC' ? (
            <>
              <button onClick={() => setActiveTab('MCC')} className="bg-[#ea580c] text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-sm">
                <div className="w-4 h-4 border-2 border-white rounded-sm flex items-center justify-center"><div className="w-2 h-2 border-[1px] border-white rounded-[1px]"></div></div>
                {t('supervisor.mccLong')}
              </button>
              <button onClick={() => setActiveTab('MRF')} className="bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-sm hover:bg-gray-50">
                <div className="w-4 h-4 border-2 border-gray-400 rounded-sm flex items-center justify-center"><div className="w-2 h-2 border-[1px] border-gray-400 rounded-[1px]"></div></div>
                {t('supervisor.mrfShort')}
              </button>
              <button onClick={() => setActiveTab('MoKhata')} className="bg-[#4f46e5] text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-sm">
                <div className="w-4 h-4 border-2 border-white rounded-sm flex items-center justify-center"><div className="w-2 h-2 border-[1px] border-white rounded-[1px]"></div></div>
                {t('supervisor.moKhata')}
              </button>
              <button onClick={() => setIsAddRecordModalOpen(true)} className="bg-[#ea580c] text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-sm">
                {t('supervisor.addRecord')}
              </button>
            </>
          ) : activeTab === 'MRF' ? (
            <>
              <button onClick={() => setActiveTab('MCC')} className="bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-sm hover:bg-gray-50">
                <div className="w-4 h-4 border-2 border-gray-400 rounded-sm flex items-center justify-center"><div className="w-2 h-2 border-[1px] border-gray-400 rounded-[1px]"></div></div>
                {t('supervisor.mccShort')}
              </button>
              <button onClick={() => setActiveTab('MRF')} className="bg-[#ea580c] text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-sm">
                <div className="w-4 h-4 border-2 border-white rounded-sm flex items-center justify-center"><div className="w-2 h-2 border-[1px] border-white rounded-[1px]"></div></div>
                {t('supervisor.mrfLong')}
              </button>
              <button onClick={() => setIsModalOpen(true)} className="bg-[#10b981] text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-sm">
                <div className="w-4 h-4 border-2 border-white rounded-sm flex items-center justify-center"><div className="w-2 h-2 border-[1px] border-white rounded-[1px]"></div></div>
                {t('supervisor.agency')}
              </button>
              <button onClick={() => setIsAddRecordModalOpen(true)} className="bg-[#ea580c] text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-sm">
                {t('supervisor.addRecord')}
              </button>
            </>
          ) : null}
        </div>
        <button className="bg-white text-gray-700 border border-gray-200 w-11 h-11 rounded-xl flex items-center justify-center shadow-sm hover:bg-gray-50">
          <Download size={18} />
        </button>
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
            <option value="Stored">{t('supervisor.stored')}</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* List Card */}
      {activeTab === 'MCC' ? (
        <div className="space-y-4">
          {cubeRecords.filter(r => r.type === 'MCC' && (statusFilter === 'All Status' || statusFilter === 'Stored') && 
            (r.id.toLowerCase().includes(searchTerm.toLowerCase()) || r.supervisorName.toLowerCase().includes(searchTerm.toLowerCase()) || r.cubeNumber.toLowerCase().includes(searchTerm.toLowerCase()))).length === 0 ? (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-500">
              No records found matching your criteria.
            </div>
          ) : (
            cubeRecords.filter(r => r.type === 'MCC' && (statusFilter === 'All Status' || statusFilter === 'Stored') && 
            (r.id.toLowerCase().includes(searchTerm.toLowerCase()) || r.supervisorName.toLowerCase().includes(searchTerm.toLowerCase()) || r.cubeNumber.toLowerCase().includes(searchTerm.toLowerCase()))).map(record => (
              <div key={record.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-[#ea580c] p-3 rounded-xl text-white">
                        <div className="w-6 h-6 border-2 border-white rounded-sm flex items-center justify-center"><div className="w-2 h-2 border-[1px] border-white rounded-[1px]"></div></div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">Micro Composting Center - {record.id.slice(-5)}</h3>
                        <p className="text-gray-500 text-sm">Cube #{record.cubeNumber}</p>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {t('supervisor.stored')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex items-center gap-3">
                      <User className="text-blue-500" size={20} />
                      <div>
                        <p className="text-xs text-gray-500">{t('supervisor.supervisor')}</p>
                        <p className="font-semibold text-slate-800">{record.supervisorName}</p>
                      </div>
                    </div>
                    <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100 flex items-center gap-3">
                      <Phone className="text-purple-500" size={20} />
                      <div>
                        <p className="text-xs text-gray-500">{t('supervisor.contact')}</p>
                        <p className="font-semibold text-slate-800">{record.contactNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {record.image && (
                  <div className="hidden md:block w-48 bg-gray-900 rounded-xl relative overflow-hidden">
                    <img src={record.image} alt="Capture" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                )}
                {!record.image && (
                  <div className="hidden md:block w-48 bg-gray-900 rounded-xl relative overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      ) : activeTab === 'MRF' ? (
        <div className="space-y-4">
          {cubeRecords.filter(r => r.type === 'MRF' && (statusFilter === 'All Status' || statusFilter === 'Stored') &&
            (r.id.toLowerCase().includes(searchTerm.toLowerCase()) || r.supervisorName.toLowerCase().includes(searchTerm.toLowerCase()) || r.cubeNumber.toLowerCase().includes(searchTerm.toLowerCase()))).map(record => (
            <div key={record.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#ea580c] p-3 rounded-xl text-white">
                      <div className="w-6 h-6 border-2 border-white rounded-sm flex items-center justify-center"><div className="w-2 h-2 border-[1px] border-white rounded-[1px]"></div></div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">Material Recovery Facility - {record.id.slice(-5)}</h3>
                      <p className="text-gray-500 text-sm">Cube #{record.cubeNumber}</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {t('supervisor.stored')}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex items-center gap-3">
                    <User className="text-blue-500" size={20} />
                    <div>
                      <p className="text-xs text-gray-500">{t('supervisor.supervisor')}</p>
                      <p className="font-semibold text-slate-800">{record.supervisorName}</p>
                    </div>
                  </div>
                  <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100 flex items-center gap-3">
                    <Phone className="text-purple-500" size={20} />
                    <div>
                      <p className="text-xs text-gray-500">{t('supervisor.contact')}</p>
                      <p className="font-semibold text-slate-800">{record.contactNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
              {record.image && (
                <div className="hidden md:block w-48 bg-gray-900 rounded-xl relative overflow-hidden">
                  <img src={record.image} alt="Capture" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              )}
              {!record.image && (
                <div className="hidden md:block w-48 bg-gray-900 rounded-xl relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              )}
            </div>
          ))}

          {records.filter(r => (statusFilter === 'All Status' || statusFilter === 'Completed') && 
            (r.agencyName.toLowerCase().includes(searchTerm.toLowerCase()) || r.material.toLowerCase().includes(searchTerm.toLowerCase()))).map(record => (
            <div key={record.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-[#10b981] p-3 rounded-xl text-white">
                  <div className="w-6 h-6 border-2 border-white rounded-sm flex items-center justify-center text-xs">A</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{record.agencyName} - {record.material}</h3>
                  <p className="text-gray-500 text-sm">
                    {record.weight} KG @ ₹{record.rate}/KG — Total: ₹{record.total}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold">
                  Completed
                </span>
                <button 
                  onClick={() => handleDownloadPDFForRecord(record)}
                  className="bg-white text-gray-700 border border-gray-200 w-10 h-10 rounded-xl flex items-center justify-center shadow-sm hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors"
                  title="Download PDF"
                >
                  <Download size={18} />
                </button>
              </div>
            </div>
          ))}

          {records.filter(r => (statusFilter === 'All Status' || statusFilter === 'Completed') && 
            (r.agencyName.toLowerCase().includes(searchTerm.toLowerCase()) || r.material.toLowerCase().includes(searchTerm.toLowerCase()))).length === 0 && 
            cubeRecords.filter(r => r.type === 'MRF' && (statusFilter === 'All Status' || statusFilter === 'Stored') &&
            (r.id.toLowerCase().includes(searchTerm.toLowerCase()) || r.supervisorName.toLowerCase().includes(searchTerm.toLowerCase()) || r.cubeNumber.toLowerCase().includes(searchTerm.toLowerCase()))).length === 0 && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-500">
              No records found matching your criteria.
            </div>
          )}
        </div>
      ) : null}
      </>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="bg-gradient-to-r from-[#e85b03] to-[#e10b0b] p-4 flex justify-between items-center text-white">
              <h2 className="text-xl font-bold">{t('supervisor.mrfAgencySell')}</h2>
              <button onClick={() => setIsModalOpen(false)} className="hover:bg-white/20 p-1 rounded-md transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('supervisor.agencyName')} <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={agencyName}
                  onChange={e => setAgencyName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ea580c] bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('supervisor.material')} <span className="text-red-500">*</span>
                </label>
                <select 
                  value={material}
                  onChange={e => setMaterial(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ea580c] bg-white appearance-none"
                >
                  <option value="">{t('supervisor.selectMaterial')}</option>
                  <option value="Plastic">Plastic</option>
                  <option value="Paper">Paper</option>
                  <option value="Glass">Glass</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('supervisor.weightKg')} <span className="text-red-500">*</span>
                </label>
                <input 
                  type="number" 
                  value={weight}
                  onChange={e => setWeight(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ea580c] bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('supervisor.rateKg')} <span className="text-red-500">*</span>
                </label>
                <input 
                  type="number" 
                  value={rate}
                  onChange={e => setRate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ea580c] bg-white"
                />
              </div>

              <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-2 text-green-800 font-medium">
                <IndianRupee size={18} className="text-green-600" /> 
                {t('supervisor.total')}: ₹ {total}
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
              <button 
                onClick={handleDownloadPDF}
                className="bg-[#e11d48] text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm hover:bg-rose-700 transition-colors"
              >
                {t('supervisor.downloadPdf')}
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="bg-white text-gray-700 border border-gray-300 px-5 py-2.5 rounded-xl font-semibold shadow-sm hover:bg-gray-50 transition-colors"
              >
                {t('supervisor.cancel')}
              </button>
              <button 
                onClick={handleSubmit}
                className="bg-[#ea580c] text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm hover:bg-orange-600 transition-colors"
              >
                {t('supervisor.submitRecord')}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Record Modal */}
      {isAddRecordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="bg-gradient-to-r from-[#ea580c] to-[#e11d48] p-4 flex justify-between items-center text-white">
              <h2 className="text-xl font-bold">
                {activeTab === 'MCC' ? t('supervisor.mccAddRecordTitle') : t('supervisor.mrfAddRecordTitle')}
              </h2>
              <button onClick={() => setIsAddRecordModalOpen(false)} className="hover:bg-white/20 p-1 rounded-md transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-5 overflow-y-auto bg-gray-50/50">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  {t('supervisor.wealthCenterField')}
                </label>
                <input 
                  type="text" 
                  readOnly
                  value="Digapahandi NAC"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-100 text-gray-700 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  {t('supervisor.supervisorName')} <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={addRecordSupervisor}
                  onChange={(e) => setAddRecordSupervisor(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ea580c] bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  {t('supervisor.contactNumber')} <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={addRecordContact}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    if (val.length <= 10) setAddRecordContact(val);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ea580c] bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  {t('supervisor.cubeNumber')} <span className="text-red-500">*</span>
                </label>
                <select 
                  value={addRecordCube}
                  onChange={(e) => setAddRecordCube(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ea580c] bg-white appearance-none"
                >
                  <option value="">{t('supervisor.selectCubeNumber')}</option>
                  <option value="1">Cube 1</option>
                  <option value="2">Cube 2</option>
                  <option value="3">Cube 3</option>
                </select>
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
                onClick={() => setIsAddRecordModalOpen(false)}
                className="bg-white text-gray-700 border border-gray-300 px-5 py-2.5 rounded-xl font-semibold shadow-sm hover:bg-gray-50 transition-colors"
              >
                {t('supervisor.cancel')}
              </button>
              <button 
                onClick={handleAddRecordSubmit}
                className="bg-[#ea580c] text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm hover:bg-orange-600 transition-colors"
              >
                {t('supervisor.submitRecord')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WealthCenter;
