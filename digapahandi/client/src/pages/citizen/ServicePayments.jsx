import { useState, useRef } from 'react';
import { Upload, X, FileImage } from 'lucide-react';

const ServicePayments = () => {
  const [step, setStep] = useState(1);
  const [paymentProof, setPaymentProof] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    category: '',
    serviceType: '',
    applicant: '',
    mobile: '',
    ward: '',
    houseNo: '',
    address: '',
    pincode: '',
    duration: '',
    amount: 0
  });

  const updateFormData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setPaymentProof({ file, previewUrl });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(5);
  };

  const resetForm = () => {
    setStep(1);
    setPaymentProof(null);
    setFormData({
      category: '',
      serviceType: '',
      applicant: '',
      mobile: '',
      ward: '',
      houseNo: '',
      address: '',
      pincode: '',
      duration: '',
      amount: 0
    });
  };

  const renderStepper = () => {
    if (step === 5) return null;
    return (
      <div className="flex justify-center items-center mb-10 max-w-2xl mx-auto px-4">
        {[1, 2, 3, 4].map((s, index) => (
        <div key={s} className="flex items-center w-full relative">
          <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-bold shadow-sm z-10 relative transition-colors ${
            step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            {s}
          </div>
          {index < 3 && (
            <div className={`flex-1 h-1 mx-2 transition-colors ${
              step > s ? 'bg-blue-600' : 'bg-gray-200'
            }`}></div>
          )}
        </div>
      ))}
    </div>
    );
  };

  const renderStep1 = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4">
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1e293b] mb-2">Select Service Type</h1>
        <p className="text-gray-500">Choose the type of property or establishment</p>
      </div>

      <div className="space-y-6 max-w-3xl mx-auto">
        {/* Residential */}
        <div className="border border-gray-200 rounded-xl p-4 md:p-6">
          <h3 className="font-bold text-lg text-[#27313B] mb-4 flex items-center gap-2">
            <span className="text-blue-600">🏢</span> Residential
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['House Tax', 'Guest House', 'Hostel'].map(service => (
              <div 
                key={service} 
                onClick={() => { updateFormData('category', 'Residential'); updateFormData('serviceType', service); }}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${formData.serviceType === service ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium' : 'border-gray-200 hover:border-blue-300 text-slate-700'}`}
              >
                {service}
              </div>
            ))}
          </div>
        </div>

        {/* Commercial */}
        <div className="border border-gray-200 rounded-xl p-4 md:p-6">
          <h3 className="font-bold text-lg text-[#27313B] mb-4 flex items-center gap-2">
            <span className="text-blue-600">🏬</span> Commercial Establishment
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['Shops', 'Food Court', 'Petrol Pump'].map(service => (
              <div 
                key={service} 
                onClick={() => { updateFormData('category', 'Commercial Establishment'); updateFormData('serviceType', service); }}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${formData.serviceType === service ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium' : 'border-gray-200 hover:border-blue-300 text-slate-700'}`}
              >
                {service}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-end max-w-3xl mx-auto">
        <button onClick={nextStep} disabled={!formData.serviceType} className="bg-blue-600 disabled:opacity-50 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition-colors">
          Next Step
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4">
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1e293b] mb-2">Applicant & Property Information</h1>
        <p className="text-gray-500">Enter your contact and property details to continue</p>
      </div>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
          <input type="text" placeholder="Enter applicant name" value={formData.applicant} onChange={e => updateFormData('applicant', e.target.value)} className="w-full p-3.5 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Mobile Number *</label>
          <input type="text" placeholder="10-digit mobile number" value={formData.mobile} onChange={e => {
            const val = e.target.value.replace(/\D/g, '');
            if (val.length <= 10) updateFormData('mobile', val);
          }} className="w-full p-3.5 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Ward Number *</label>
          <input type="text" placeholder="Enter ward number" value={formData.ward} onChange={e => updateFormData('ward', e.target.value)} className="w-full p-3.5 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">House Number / Plot No *</label>
          <input type="text" placeholder="House/Plot/Flat number" value={formData.houseNo} onChange={e => updateFormData('houseNo', e.target.value)} className="w-full p-3.5 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Address / Area / Colony *</label>
          <input type="text" placeholder="Area or Colony name" value={formData.address} onChange={e => updateFormData('address', e.target.value)} className="w-full p-3.5 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Pincode *</label>
          <input type="text" placeholder="6-digit pincode" value={formData.pincode} onChange={e => updateFormData('pincode', e.target.value)} className="w-full p-3.5 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
        </div>
      </form>
      <div className="mt-8 flex justify-between max-w-3xl mx-auto">
        <button onClick={prevStep} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors">Back</button>
        <button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition-colors">Next Step</button>
      </div>
    </div>
  );

  const renderStep3 = () => {
    const plans = [
      { duration: '1 Month', amount: 500, off: null, sub: null },
      { duration: '3 Months', amount: 1400, off: '7% OFF', sub: 'Rs. 467/month' },
      { duration: '6 Months', amount: 2700, off: '10% OFF', sub: 'Rs. 450/month' },
      { duration: '12 Months (Annual)', amount: 5000, off: '17% OFF', sub: 'Rs. 417/month' }
    ];
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4">
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1e293b] mb-2">Select Payment Duration</h1>
          <p className="text-gray-500">Choose your payment plan</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#f4f7fe] rounded-xl p-4 mb-6 text-slate-700 text-sm">
            <span className="font-semibold">Selected Service:</span> {formData.serviceType} <br/>
            <span className="font-semibold">Location:</span> {formData.houseNo}, {formData.address}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {plans.map(plan => (
              <div 
                key={plan.duration}
                onClick={() => { updateFormData('duration', plan.duration); updateFormData('amount', plan.amount); }}
                className={`relative p-6 md:p-8 rounded-xl border-2 cursor-pointer transition-all text-center flex flex-col items-center justify-center min-h-[160px] ${
                  formData.duration === plan.duration ? 'border-blue-600 bg-blue-50/50 shadow-md' : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {plan.off && <div className="absolute top-4 right-4 bg-gradient-to-br from-[#E47715] to-[#F2A65A] text-white shadow-[0_5px_15px_rgba(228,119,21,0.18)] text-[11px] font-bold px-2.5 py-1 rounded-full tracking-wide">{plan.off}</div>}
                <h3 className="font-bold text-[#27313B] text-lg mb-2">{plan.duration}</h3>
                <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">Rs. {plan.amount.toLocaleString()}</p>
                {plan.sub && <p className="text-sm text-gray-500">{plan.sub}</p>}
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-between">
            <button onClick={prevStep} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors">Back</button>
            <button onClick={nextStep} disabled={!formData.duration} className="bg-blue-600 disabled:opacity-50 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition-colors">Next Step</button>
          </div>
        </div>
      </div>
    );
  };

  const renderStep4 = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4">
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1e293b] mb-2">Payment Summary</h1>
        <p className="text-gray-500">Transfer the amount to the municipal bank account and submit your payment details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side Details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="border border-gray-200 rounded-xl p-6 md:p-8">
            <h3 className="font-bold text-lg text-[#27313B] mb-6 border-b pb-3">Property Details</h3>
            <div className="grid grid-cols-[1fr_2fr] gap-y-4 text-[15px]">
              <div className="text-gray-500">Applicant:</div>
              <div className="font-medium text-[#27313B]">{formData.applicant || '-'}</div>
              <div className="text-gray-500">Mobile:</div>
              <div className="font-medium text-[#27313B]">{formData.mobile || '-'}</div>
              <div className="text-gray-500">Ward Number:</div>
              <div className="font-medium text-[#27313B]">{formData.ward || '-'}</div>
              <div className="text-gray-500">House/Plot Number:</div>
              <div className="font-medium text-[#27313B]">{formData.houseNo || '-'}</div>
              <div className="text-gray-500">Address:</div>
              <div className="font-medium text-[#27313B]">{formData.address || '-'}</div>
              <div className="text-gray-500">Pincode:</div>
              <div className="font-medium text-[#27313B]">{formData.pincode || '-'}</div>
            </div>

            <h3 className="font-bold text-lg text-[#27313B] mt-8 mb-6 border-b pb-3">Service Details</h3>
            <div className="grid grid-cols-[1fr_2fr] gap-y-4 text-[15px]">
              <div className="text-gray-500">Category:</div>
              <div className="font-medium text-[#27313B]">{formData.category}</div>
              <div className="text-gray-500">Service Type:</div>
              <div className="font-medium text-[#27313B]">{formData.serviceType}</div>
              <div className="text-gray-500">Duration:</div>
              <div className="font-medium text-[#27313B]">{formData.duration}</div>
              <div className="text-gray-500">Start Date:</div>
              <div className="font-medium text-[#27313B]">{new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })}</div>
            </div>
          </div>
        </div>

        {/* Right Side Bank & Upload */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#fff9e6] border border-[#fde68a] rounded-xl p-6 md:p-8">
            <h3 className="font-bold text-[#b45309] text-lg mb-4">Bank Transfer Details</h3>
            <div className="space-y-3 text-[15px] text-[#92400e]">
              <p><span className="font-semibold w-32 inline-block">Bank:</span> Indian Overseas Bank</p>
              <p><span className="font-semibold w-32 inline-block">Branch:</span> Digapahandi</p>
              <p><span className="font-semibold w-32 inline-block">Account Name:</span> DIGAPAHANDI NAC ULB</p>
              <p><span className="font-semibold w-32 inline-block">Account Number:</span> 104901000312100</p>
              <p><span className="font-semibold w-32 inline-block">IFSC:</span> IOBA0001049</p>
              <p><span className="font-semibold w-32 inline-block">MICR:</span> 761020501</p>
              <p className="text-lg mt-5 font-bold pt-4 border-t border-[#fde68a]"><span className="font-semibold inline-block mr-2">Amount to Transfer:</span> Rs. {formData.amount.toLocaleString()}</p>
            </div>
            <p className="text-sm text-[#b45309] mt-6">After making the transfer, enter the UTR or transaction number and upload the payment screenshot below.</p>
          </div>

          <div className="border border-gray-200 rounded-xl p-6 md:p-8 bg-white shadow-sm">
            <h3 className="font-bold text-lg text-[#27313B] mb-6">Submit Payment Proof</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Payment Method</label>
                <input type="text" value="Bank Transfer" disabled className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">UTR / Transaction Reference *</label>
                <input type="text" placeholder="Enter bank transfer reference number" className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Payment Date *</label>
                <input type="date" className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Remarks</label>
                <textarea placeholder="Optional note for verification team" rows="3" className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Payment Screenshot *</label>
                
                {!paymentProof ? (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 cursor-pointer transition-colors group"
                  >
                    <Upload className="text-blue-500 mb-3 group-hover:scale-110 transition-transform" size={28} />
                    <p className="font-semibold text-slate-700">Upload payment proof</p>
                    <p className="text-xs text-slate-500 mt-1">JPG, PNG, WEBP up to 5MB</p>
                  </div>
                ) : (
                  <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-4 bg-gray-50">
                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-gray-200 bg-white flex items-center justify-center">
                      {paymentProof.file.type.startsWith('image/') ? (
                        <img src={paymentProof.previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <FileImage className="text-gray-400" size={24} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#27313B] truncate">{paymentProof.file.name}</p>
                      <p className="text-xs text-slate-500">{(paymentProof.file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setPaymentProof(null)} 
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      title="Remove file"
                    >
                      <X size={20} />
                    </button>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  className="hidden" 
                />
              </div>
              <button onClick={handleSubmit} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-lg font-bold shadow-md transition-colors mt-4">
                Submit Payment Details
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-start">
        <button onClick={prevStep} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors">Back</button>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="animate-in fade-in zoom-in-95 duration-500 py-10 flex flex-col items-center justify-center text-center">
      <div className="w-24 h-24 bg-[#FFF3E0] rounded-full flex items-center justify-center mb-6 shadow-sm">
        <div className="w-16 h-16 bg-[#F2A65A] rounded-full flex items-center justify-center text-white shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-[#1e293b] mb-4">Payment Submitted!</h1>
      <p className="text-lg text-gray-600 mb-2 max-w-md">Thank you for choosing us.</p>
      <p className="text-gray-500 mb-8 max-w-md">Your payment details have been sent to the municipal verification team. We will notify you once verified.</p>
      
      <button 
        onClick={resetForm} 
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold shadow-md transition-colors flex items-center gap-2"
      >
        <span className="text-xl leading-none mb-[2px]">+</span> Book Another Service
      </button>
    </div>
  );

  return (
    <div className="py-2">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[#1e293b]">Online Service Booking</h1>
        <p className="text-gray-500 mt-2">Municipal Services Manual Payment Portal</p>
      </div>
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 mb-10">
        {renderStepper()}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
        {step === 5 && renderStep5()}
      </div>
    </div>
  );
};

export default ServicePayments;







