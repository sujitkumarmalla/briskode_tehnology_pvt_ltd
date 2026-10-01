import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff } from 'lucide-react';

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
      if (activeRole === 'Supervisor') navigate('/supervisor');
      else if (activeRole === 'Admin') navigate('/admin/dashboard');
      else navigate('/citizen/dashboard');
    }
  };

  const handlePasswordLogin = () => {
    if (activeRole === 'Supervisor') navigate('/supervisor');
    else if (activeRole === 'Admin') navigate('/admin/dashboard');
  };

  return (
    <div className="flex w-full h-screen overflow-hidden font-sans">
      
      {/* LEFT PANEL */}
      <div className="hidden lg:flex w-1/2 relative flex-col p-10 xl:p-16 justify-between bg-gradient-to-br from-[#1b8d65] to-[#46a683] text-white">
        
        {/* City Skyline */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[45%] bg-no-repeat bg-bottom bg-cover opacity-60 z-0 pointer-events-none" 
          style={{ backgroundImage: 'url(\'data:image/svg+xml;utf8,<svg viewBox="0 0 1000 200" xmlns="http://www.w3.org/2000/svg"><path d="M0 200V150H20V120H40V150H60V90H80V150H100V100H130V150H160V80H190V150H220V110H250V150H290V60H330V150H370V40H400V150H440V80H480V150H530V30H570V150H620V70H670V150H720V100H760V150H810V50H850V150H900V90H950V150H980V120H1000V200H0Z" fill="rgba(255,255,255,0.1)"/></svg>\')' }}
        ></div>

        <div className="z-10">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center shadow-lg border-2 border-white p-1">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-wide uppercase drop-shadow-md">{t('login.nacTitle')}</h1>
              <p className="text-sm opacity-90 drop-shadow">{t('login.municipalServices')}</p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-5xl font-bold mb-4 drop-shadow-md leading-tight">{t('login.swm')}</h2>
            <h3 className="text-xl font-medium mb-2 opacity-95">{t('login.missionTitle')}</h3>
            <p className="text-base opacity-85 max-w-lg leading-relaxed">
              {t('login.missionDesc')}
            </p>
          </div>

          <div className="flex gap-4">
            <div className="bg-[#259368] rounded-xl p-4 w-[110px] flex flex-col items-center text-center shadow-md">
              <div className="h-10 mb-3 flex items-center justify-center">
                <img src="/paper.png" alt="Paper" className="w-10 h-10 object-contain drop-shadow-md" onError={(e) => { e.target.outerHTML = '<span style="font-size: 32px;">📄</span>' }} />
              </div>
              <div className="text-[10px] font-bold px-3 py-1.5 rounded-full mb-1.5 text-white bg-blue-500 shadow-sm w-full uppercase">{t('login.paper')}</div>
              <p className="text-[10px] opacity-90 font-medium text-white">{t('login.recyclable')}</p>
            </div>
            <div className="bg-[#259368] rounded-xl p-4 w-[110px] flex flex-col items-center text-center shadow-md">
              <div className="h-10 mb-3 flex items-center justify-center">
                <img src="/plastic.png" alt="Plastic" className="w-10 h-10 object-contain drop-shadow-md" onError={(e) => { e.target.outerHTML = '<span style="font-size: 32px;">♻️</span>' }} />
              </div>
              <div className="text-[10px] font-bold px-3 py-1.5 rounded-full mb-1.5 text-white bg-amber-500 shadow-sm w-full uppercase">{t('login.plastic')}</div>
              <p className="text-[10px] opacity-90 font-medium text-white">{t('login.recyclable')}</p>
            </div>
            <div className="bg-[#259368] rounded-xl p-4 w-[110px] flex flex-col items-center text-center shadow-md">
              <div className="h-10 mb-3 flex items-center justify-center">
                <img src="/glass.png" alt="Glass" className="w-10 h-10 object-contain drop-shadow-md" onError={(e) => { e.target.outerHTML = '<span style="font-size: 32px;">🗑️</span>' }} />
              </div>
              <div className="text-[10px] font-bold px-3 py-1.5 rounded-full mb-1.5 text-white bg-cyan-500 shadow-sm w-full uppercase">{t('login.glass')}</div>
              <p className="text-[10px] opacity-90 font-medium text-white">{t('login.recyclable')}</p>
            </div>
            <div className="bg-[#259368] rounded-xl p-4 w-[110px] flex flex-col items-center text-center shadow-md">
              <div className="h-10 mb-3 flex items-center justify-center">
                <img src="/organic.png" alt="Organic" className="w-10 h-10 object-contain drop-shadow-md" onError={(e) => { e.target.outerHTML = '<span style="font-size: 32px;">🌱</span>' }} />
              </div>
              <div className="text-[10px] font-bold px-3 py-1.5 rounded-full mb-1.5 text-white bg-emerald-500 shadow-sm w-full uppercase">{t('login.organic')}</div>
              <p className="text-[10px] opacity-90 font-medium text-white">{t('login.recyclable')}</p>
            </div>
          </div>
        </div>

        <div className="z-10 text-[11px] font-medium opacity-80 mt-auto">
          {t('login.copyright')}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 bg-[#f4f7f6] relative flex flex-col items-center justify-center p-4">
        
        {/* Floating Login Card */}
        <div className="w-full max-w-[460px] bg-white rounded-2xl shadow-xl relative flex flex-col border border-gray-100 overflow-hidden">
          <div className="h-[3px] w-full bg-gradient-to-r from-emerald-500 to-amber-400 absolute top-0 left-0"></div>
          
          <div className="px-8 pt-8 pb-6 flex flex-col flex-1">
            <div className="flex justify-end mb-4">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                <select 
                  className="bg-transparent border-none outline-none cursor-pointer text-sm text-slate-700 font-medium"
                  value={i18n.language.split('-')[0]}
                  onChange={(e) => i18n.changeLanguage(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी</option>
                  <option value="or">ଓଡ଼ିଆ</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <div className="w-[80px] h-[80px] rounded-full bg-white shadow-[0_0_30px_rgba(0,0,0,0.08)] flex items-center justify-center border-4 border-slate-50 overflow-hidden p-1">
                <img src="/logo.jpg" alt="Logo" className="w-full h-full object-contain rounded-full" />
              </div>
            </div>

            <div className="flex bg-[#f1f5f9] rounded-lg p-1 w-full mx-auto max-w-[380px] mb-8">
              {['Citizen', 'Supervisor', 'Admin'].map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setActiveRole(role);
                    setOtpSent(false);
                  }}
                  className={`flex-1 py-2 rounded-md text-[13px] font-semibold transition-all ${
                    activeRole === role 
                      ? 'bg-white text-emerald-700 shadow-sm' 
                      : 'bg-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {role === 'Citizen' ? t('login.roleCitizen') : role === 'Supervisor' ? t('login.roleSupervisor') : t('login.roleAdmin')}
                </button>
              ))}
            </div>

            <div className="text-center w-full mb-6">
              <h2 className="text-[22px] font-bold text-slate-800 mb-1.5">
                {activeRole === 'Citizen' ? t('login.roleCitizen') : activeRole === 'Supervisor' ? t('login.roleSupervisor') : t('login.roleAdmin')} Login
              </h2>
              <p className="text-[13px] text-slate-500">{t('login.signInTitle')}</p>
            </div>

            {activeRole === 'Citizen' ? (
              <>
                {!otpSent ? (
                  <>
                    <div className="w-full mb-5">
                      <label className="block text-[13px] font-medium text-slate-700 mb-1.5">{t('login.phoneLabel')}</label>
                      <div className="relative flex items-center">
                        <div className="absolute left-3 text-slate-400">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        </div>
                        <input 
                          type="text" 
                          value={phoneNumber}
                          onChange={handlePhoneChange}
                          placeholder={t('login.phonePlaceholder')} 
                          className={`w-full py-2.5 pl-[38px] pr-4 border ${phoneError ? 'border-red-500' : 'border-slate-200'} rounded-lg text-sm text-slate-800 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all`}
                        />
                      </div>
                      {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
                    </div>
                    
                    <button onClick={handleGetOtp} className="w-full py-3 bg-[#0a8459] text-white rounded-lg text-sm font-semibold hover:bg-[#076846] transition-colors mb-5 shadow-sm">
                      {t('login.getOtp')}
                    </button>
                  </>
                ) : (
                  <>
                    <div className="w-full mb-5">
                      <label className="block text-[13px] font-medium text-slate-700 mb-1.5">{t('login.enterOtpLabel')}</label>
                      <div className="relative flex items-center">
                        <div className="absolute left-3 text-slate-400">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        </div>
                        <input 
                          type="text" 
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder={t('login.enterOtpPlaceholder')} 
                          className="w-full py-2.5 pl-[38px] pr-4 border border-slate-200 rounded-lg text-sm text-slate-800 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                        />
                      </div>
                      <p className="text-xs text-emerald-600 mt-1.5 font-medium">{t('login.otpTesting')}</p>
                    </div>
                    
                    <button onClick={handleVerifyOtp} className="w-full py-3 bg-[#0a8459] text-white rounded-lg text-sm font-semibold hover:bg-[#076846] transition-colors mb-4 shadow-sm">
                      {t('login.verifyLogin')}
                    </button>
                    
                    <button onClick={() => setOtpSent(false)} className="w-full py-1.5 bg-transparent text-slate-500 text-xs font-medium hover:text-slate-700 transition-colors mb-2">
                      {t('login.backToPhone')}
                    </button>
                  </>
                )}
                
                <p className="text-[10px] text-slate-400 text-center leading-relaxed mt-auto">
                  {t('login.terms')}
                </p>
              </>
            ) : (
              <>
                <div className="w-full mb-4">
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">{t('login.usernameLabel')}</label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3 text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                    <input 
                      type="text" 
                      placeholder={t('login.phonePlaceholder')} 
                      className="w-full py-2.5 pl-[38px] pr-4 border border-slate-200 rounded-lg text-sm text-slate-800 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                </div>

                <div className="w-full mb-6">
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">{t('login.passwordLabel')}</label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3 text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    </div>
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      placeholder={t('login.passwordPlaceholder')} 
                      className="w-full py-2.5 pl-[38px] pr-[38px] border border-slate-200 rounded-lg text-sm text-slate-800 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>

                <button onClick={handlePasswordLogin} className="w-full py-3 bg-[#0a8459] text-white rounded-lg text-sm font-semibold hover:bg-[#076846] transition-colors mb-4 shadow-sm">
                  {t('login.loginButton')}
                </button>
              </>
            )}

            <a 
              href="/SBM%202.0.pdf" 
              download="SBM_Guide_By_Government.pdf"
              className="w-full py-3 bg-[#f59e0b] text-white rounded-lg text-[13px] font-semibold hover:bg-[#d97706] transition-colors shadow-sm flex items-center justify-center mt-2"
            >
              {t('login.downloadGuide')}
            </a>
          </div>
        </div>
      </div>

      <button className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-[#0a8459] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-20">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
      </button>

    </div>
  );
}

export default Login;
