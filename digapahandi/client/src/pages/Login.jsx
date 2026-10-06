import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, Phone, FileText, CheckCircle2, ShieldAlert, ChevronDown } from 'lucide-react';

function Login() {
  const [activeRole, setActiveRole] = useState('Citizen');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setPhoneNumber(value);
      setPhoneError('');
    }
  };

  const handleGetOtp = () => {
    if (phoneNumber.length !== 10) {
      setPhoneError('Invalid phone number');
      return;
    }
    setOtpSent(true);
    setOtp('111111');
  };

  const handleVerifyOtp = () => {
    if (otp === '111111') {
      if (activeRole === 'Supervisor') navigate('/supervisor/dashboard');
      else if (activeRole === 'Admin') navigate('/admin/dashboard');
      else navigate('/citizen/dashboard');
    }
  };

  const handlePasswordLogin = () => {
    if (activeRole === 'Supervisor') navigate('/supervisor/dashboard');
    else if (activeRole === 'Admin') navigate('/admin/dashboard');
  };

  return (
    <div className="flex w-full h-screen overflow-hidden font-['Inter',sans-serif] bg-gray-50">
      
      {/* LEFT PANEL - ORANGE THEME (EXACT REPLICA OF GREEN SCREENSHOT) */}
      <div className="hidden lg:flex w-[55%] relative flex-col p-12 text-white overflow-hidden bg-gradient-to-br from-orange-400 to-orange-600">
        
        {/* Uniform Houses Silhouette SVG */}
        <div className="absolute bottom-0 left-0 w-full h-[45%] pointer-events-none z-0 flex items-end">
          <svg viewBox="0 0 1200 300" preserveAspectRatio="none" className="w-full h-full">
            {/* Foreground Layer: Uniform Houses */}
            <g className="fill-orange-950 opacity-20">
              {/* House 1 */}
              <rect x="30" y="200" width="80" height="80" />
              <polygon points="15,200 70,145 125,200" />
              
              {/* House 2 */}
              <rect x="180" y="200" width="80" height="80" />
              <polygon points="165,200 220,145 275,200" />
              
              {/* House 3 */}
              <rect x="330" y="200" width="80" height="80" />
              <polygon points="315,200 370,145 425,200" />
              
              {/* House 4 */}
              <rect x="480" y="200" width="80" height="80" />
              <polygon points="465,200 520,145 575,200" />
              
              {/* House 5 */}
              <rect x="630" y="200" width="80" height="80" />
              <polygon points="615,200 670,145 725,200" />
              
              {/* House 6 */}
              <rect x="780" y="200" width="80" height="80" />
              <polygon points="765,200 820,145 875,200" />
              
              {/* House 7 */}
              <rect x="930" y="200" width="80" height="80" />
              <polygon points="915,200 970,145 1025,200" />
              
              {/* House 8 */}
              <rect x="1080" y="200" width="80" height="80" />
              <polygon points="1065,200 1120,145 1175,200" />
              
              {/* Ground */}
              <rect x="0" y="280" width="1200" height="20" />
            </g>
          </svg>
        </div>

        <div className="z-10 relative">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center p-1 shadow-md border-2 border-orange-200">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide uppercase text-white">{t('login.nacTitle')}</h1>
              <p className="text-sm font-medium text-orange-100">{t('login.municipalServices')}</p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-5xl font-bold mb-4 text-white tracking-tight">{t('login.swm')}</h2>
            <p className="text-lg text-orange-50 mb-2 font-medium">Join our mission for a cleaner and greener environment</p>
            <p className="text-sm text-orange-100">Building a sustainable future through responsible waste management.</p>
          </div>

          <div className="flex gap-4 flex-wrap mt-8">
            <div className="bg-orange-800/20 backdrop-blur-sm rounded-xl p-5 w-[140px] flex flex-col items-center text-center border border-orange-300/10">
              <span className="text-3xl mb-3 opacity-90">📄</span>
              <div className="text-[11px] font-bold px-4 py-1.5 rounded-full mb-2 text-white bg-blue-500 shadow-sm w-full uppercase">PAPER</div>
              <p className="text-xs font-medium text-orange-100">Recyclable</p>
            </div>
            <div className="bg-orange-800/20 backdrop-blur-sm rounded-xl p-5 w-[140px] flex flex-col items-center text-center border border-orange-300/10">
              <span className="text-3xl mb-3 opacity-90">♻️</span>
              <div className="text-[11px] font-bold px-4 py-1.5 rounded-full mb-2 text-orange-900 bg-yellow-400 shadow-sm w-full uppercase">PLASTIC</div>
              <p className="text-xs font-medium text-orange-100">Recyclable</p>
            </div>
            <div className="bg-orange-800/20 backdrop-blur-sm rounded-xl p-5 w-[140px] flex flex-col items-center text-center border border-orange-300/10">
              <span className="text-3xl mb-3 opacity-90">🗑️</span>
              <div className="text-[11px] font-bold px-4 py-1.5 rounded-full mb-2 text-white bg-cyan-500 shadow-sm w-full uppercase">GLASS</div>
              <p className="text-xs font-medium text-orange-100">Recyclable</p>
            </div>
            <div className="bg-orange-800/20 backdrop-blur-sm rounded-xl p-5 w-[140px] flex flex-col items-center text-center border border-orange-300/10">
              <span className="text-3xl mb-3 opacity-90">🌱</span>
              <div className="text-[11px] font-bold px-4 py-1.5 rounded-full mb-2 text-white bg-green-500 shadow-sm w-full uppercase">ORGANIC</div>
              <p className="text-xs font-medium text-orange-100">Recyclable</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - LOGIN FORM */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-6 bg-[#f4f7f6]">
        
        <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
          {/* Top Gradient Border */}
          <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 to-amber-400"></div>
          
          <div className="px-8 pt-6 pb-8">
            
            {/* Language Selector */}
            <div className="flex justify-end mb-6">
              <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded bg-white border border-gray-200 text-gray-600 shadow-sm hover:bg-gray-50 transition-colors">
                <Globe size={14} className="text-gray-500" />
                <select 
                  className="bg-transparent border-none outline-none cursor-pointer text-xs font-medium appearance-none pl-1 pr-5 z-10 relative"
                  value={i18n.language.split('-')[0]}
                  onChange={(e) => i18n.changeLanguage(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी</option>
                  <option value="or">ଓଡ଼ିଆ</option>
                </select>
                <ChevronDown size={14} className="text-gray-400 absolute right-2 pointer-events-none" />
              </div>
            </div>

            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-white shadow-[0_4px_20px_rgba(249,115,22,0.15)] flex items-center justify-center p-1 border-2 border-orange-50">
                <img src="/logo.jpg" alt="Logo" className="w-full h-full object-contain rounded-full" />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-gray-50 rounded-full p-1 border border-gray-100 shadow-inner">
                {['Citizen', 'Supervisor', 'Admin'].map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setActiveRole(role);
                      setOtpSent(false);
                    }}
                    className={`px-5 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-200 ${activeRole === role
                        ? 'bg-white text-orange-600 shadow-sm border border-gray-200/60'
                        : 'bg-transparent text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    {role === 'Citizen' ? t('login.roleCitizen') : role === 'Supervisor' ? t('login.roleSupervisor') : t('login.roleAdmin')}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {activeRole === 'Citizen' ? t('login.roleCitizen') : activeRole === 'Supervisor' ? t('login.roleSupervisor') : t('login.roleAdmin')} Login
              </h2>
              <p className="text-[13px] text-gray-500">Welcome to the Solid Waste Management System</p>
            </div>

            {activeRole === 'Citizen' ? (
              <>
                {!otpSent ? (
                  <div>
                    <div className="w-full mb-6">
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">{t('login.phoneLabel')}</label>
                      <div className="relative flex items-center">
                        <div className="absolute left-3 text-gray-400">
                          <Phone size={16} />
                        </div>
                        <input
                          type="text"
                          value={phoneNumber}
                          onChange={handlePhoneChange}
                          placeholder="Phone Number (10 digits)"
                          className={`w-full py-2.5 pl-10 pr-4 bg-white border ${phoneError ? 'border-red-400' : 'border-gray-200'} rounded-lg text-sm text-gray-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all`}
                        />
                      </div>
                      {phoneError && <p className="text-red-500 text-xs mt-1 font-medium">{phoneError}</p>}
                    </div>

                    <button onClick={handleGetOtp} className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-semibold transition-colors">
                      {t('login.getOtp')}
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="w-full mb-6">
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">{t('login.enterOtpLabel')}</label>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter 6-digit OTP"
                        className="w-full py-2.5 px-4 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all tracking-widest text-center"
                      />
                      <p className="text-[11px] text-orange-600 mt-1.5 font-medium text-center">(Testing: 111111)</p>
                    </div>

                    <button onClick={handleVerifyOtp} className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-semibold transition-colors mb-3">
                      Verify OTP & Login
                    </button>

                    <button onClick={() => setOtpSent(false)} className="w-full py-2 text-gray-500 hover:text-gray-700 text-xs font-semibold transition-colors">
                      Change Phone Number
                    </button>
                  </div>
                )}
                
                <a
                  href="/SBM%202.0.pdf"
                  download="SWM_Guide.pdf"
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-semibold transition-colors flex items-center justify-center mt-4"
                >
                  Download SWM Guide
                </a>

                <p className="text-[10px] text-gray-400 text-center mt-4">
                  By logging in, you agree to our <a href="#" className="text-orange-500 hover:underline">Terms of Service</a> and <a href="#" className="text-orange-500 hover:underline">Privacy Policy</a>
                </p>
              </>
            ) : (
              <div>
                <div className="w-full mb-4">
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">{t('login.usernameLabel')}</label>
                  <input
                    type="text"
                    placeholder="Enter username or ID"
                    className="w-full py-2.5 px-4 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                  />
                </div>

                <div className="w-full mb-6">
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-semibold text-gray-700">{t('login.passwordLabel')}</label>
                    <a href="#" className="text-[11px] font-medium text-orange-600 hover:underline">Forgot?</a>
                  </div>
                  <input
                    type="password"
                    placeholder="Enter password"
                    className="w-full py-2.5 px-4 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                  />
                </div>

                <button onClick={handlePasswordLogin} className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-semibold transition-colors">
                  Login to Portal
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Help Button */}
      <button className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 z-50">
        <span className="font-bold text-xl">?</span>
      </button>

    </div>
  );
}

export default Login;







