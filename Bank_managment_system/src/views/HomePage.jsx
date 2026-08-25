import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  ArrowRight, 
  MapPin, 
  CreditCard, 
  PhoneCall, 
  Star,
  Sparkles,
  Building2,
  CheckCircle2,
  FileCheck2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

import hero1 from '../assets/hero/hero1.jpg';
import hero2 from '../assets/hero/hero2.jpg';
import hero3 from '../assets/hero/hero3.jpg';
import hero4 from '../assets/hero/hero4.jpg';
import hero5 from '../assets/hero/hero5.jpg';

const heroSlides = [
  {
    image: hero1,
    title: 'Apex Bank Enterprise Branch',
    caption: 'Modern Architecture & Customer Banking Hub'
  },
  {
    image: hero2,
    title: 'Comprehensive Banking Solutions',
    caption: 'Branch Network, Loan Desks & Digital Kiosks'
  },
  {
    image: hero3,
    title: '24/7 Smart ATM Kiosk',
    caption: 'Round-the-clock Cash Withdrawal & Passbook Center'
  },
  {
    image: hero4,
    title: 'Next-Gen Automated Teller Machine',
    caption: 'Secure Deposit, PIN & Instant Fund Transfer Kiosk'
  },
  {
    image: hero5,
    title: 'Dedicated Cashier & Services Desk',
    caption: 'Fast Token Cash Counter & Valued Customer Care'
  }
];

export const HomePage = () => {
  const { openAuthModal, t, currentLang } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleSelectSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const ratesSchedule = [
    { type: t('savingsAccount'), rate: '4.00% p.a.', desc: t('savingsDesc') },
    { type: t('fixedDeposit'), rate: '7.50% p.a.', desc: t('fdDesc') },
    { type: t('kisanLoan'), rate: '4.00% Net Rate', desc: t('kisanDesc') },
    { type: t('studyLoan'), rate: '6.50% p.a.', desc: t('studyDesc') }
  ];

  const testimonials = [
    { name: 'Ramesh Patel', role: 'Kisan Agri Farmer', text: currentLang === 'or' ? 'ଏପେକ୍ସ ବ୍ୟାଙ୍କ ମୋର କୃଷି ଋଣ ୨୪ ଘଣ୍ଟା ମଧ୍ୟରେ ଅନୁମୋଦନ କଲା। ୪.୦% ସବସିଡି ସୁଧ ହାର ଯୋଗୁଁ ମୋର ଫସଲ ସୁରକ୍ଷିତ ରହିଲା।' : 'ApexBank disbursed my Kisan crop loan within 24 hours. The 4.0% subsidized interest rate saved my harvest during the Kharif season.' },
    { name: 'Dr. Ananya Sen', role: 'M.Tech Research Scholar', text: currentLang === 'or' ? 'ଓଟିପି ସୁରକ୍ଷିତ ପାଠପଢ଼ା ଋଣ ପୋର୍ଟାଲ ଯୋଗୁଁ IIT ବମ୍ବେ ଫିସ ଦେବା ଅତି ସହଜ ହେଲା।' : 'The OTP verified Study Loan portal made tuition payment to IIT Bombay effortless. Staff verified my documents seamlessly.' },
    { name: 'Vikram Mehta', role: 'Managing Director, Apex Traders', text: currentLang === 'or' ? 'ଷ୍ଟାଫ୍ ଅନୁମୋଦନ ବ୍ୟବସ୍ଥା ଆମ ବ୍ୟବସାୟର ବଡ଼ ଆକାଉଣ୍ଟ ଟ୍ରାନ୍ସଫର ପାଇଁ ଅତ୍ୟନ୍ତ ସୁରକ୍ଷିତ।' : 'The maker-checker dual control transfer system provides unmatched security for our high-value corporate transfers.' }
  ];

  return (
    <div className="min-h-screen bg-[#6E6E6E] text-slate-100 flex flex-col selection:bg-lightgreen-400/30 selection:text-lightgreen-300">
      <Navbar />

      {/* HERO SECTION WITH SLOW-MOTION SLIDING BACKGROUND PHOTOS */}
      <section className="pt-32 pb-24 px-6 lg:px-12 relative overflow-hidden bg-slate-950 border-b border-slate-700 min-h-[90vh] flex items-center">
        {/* Slow Motion Slideshow Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              initial={{ opacity: 0, scale: 1.12, x: direction > 0 ? '5%' : '-5%' }}
              animate={{ opacity: 1, scale: 1.0, x: '0%' }}
              exit={{ opacity: 0, scale: 1.05, x: direction > 0 ? '-5%' : '5%' }}
              transition={{
                opacity: { duration: 1.8, ease: 'easeInOut' },
                x: { duration: 1.8, ease: 'easeInOut' },
                scale: { duration: 6, ease: 'easeOut' }
              }}
              className="absolute inset-0"
            >
              <img
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `/hero/hero${currentSlide + 1}.jpg`;
                }}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>

          {/* Balanced Light Overlays to Keep Photos Bright & Vibrant */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-slate-950/80 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-slate-950/60 z-10" />
        </div>

        <div className="max-w-6xl mx-auto text-center space-y-8 relative z-20 w-full">
          {/* Active Image Indicator Badge */}
          <motion.div
            key={`badge-${currentSlide}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/80 border border-lightgreen-400/60 text-lightgreen-400 text-xs font-bold shadow-2xl backdrop-blur-md"
          >
            <ShieldCheck className="w-4 h-4 text-lightgreen-400" />
            <span>{t('heroBadge')}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-lightgreen-400 animate-ping ml-1" />
            <span className="text-slate-200 font-normal border-l border-slate-700 pl-2 ml-1">
              {heroSlides[currentSlide].title}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight drop-shadow-xl"
          >
            {t('heroTitleLine1')} <br />
            <span className="text-lightgreen-400 drop-shadow-md">{t('heroTitleLine2')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto text-slate-100 text-sm md:text-base leading-relaxed drop-shadow-md font-medium bg-slate-950/40 p-4 rounded-2xl border border-white/10 backdrop-blur-sm"
          >
            {t('heroSubtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <button
              onClick={() => openAuthModal('login')}
              className="green-btn px-8 py-4 rounded-2xl text-sm font-extrabold flex items-center gap-2.5 w-full sm:w-auto justify-center"
            >
              {t('portalLogin')} <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => openAuthModal('register')}
              className="white-btn px-8 py-4 rounded-2xl text-sm font-bold flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              {t('openAccount')}
            </button>
          </motion.div>

          {/* Live Metrics Ticker Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 max-w-4xl mx-auto">
            <div className="glass-card p-4 rounded-2xl text-left border-l-4 border-l-lightgreen-400">
              <div className="text-xs text-slate-400 font-bold uppercase">Authentication</div>
              <div className="text-lg font-extrabold text-white font-mono mt-1">OTP Verified</div>
              <div className="text-[10px] text-lightgreen-400">Account No + IFSC Code</div>
            </div>

            <div className="glass-card p-4 rounded-2xl text-left border-l-4 border-l-emerald-400">
              <div className="text-xs text-slate-400 font-bold uppercase">Transfers Queue</div>
              <div className="text-lg font-extrabold text-emerald-400 font-mono mt-1">Staff Approved</div>
              <div className="text-[10px] text-slate-300">Maker-Checker Policy</div>
            </div>

            <div className="glass-card p-4 rounded-2xl text-left border-l-4 border-l-blue-400">
              <div className="text-xs text-slate-400 font-bold uppercase">Loan Programs</div>
              <div className="text-lg font-extrabold text-blue-400 font-mono mt-1">Study &amp; Agri</div>
              <div className="text-[10px] text-slate-300">Admin Final Approval</div>
            </div>

            <div className="glass-card p-4 rounded-2xl text-left border-l-4 border-l-purple-400">
              <div className="text-xs text-slate-400 font-bold uppercase">RBI Compliance</div>
              <div className="text-lg font-extrabold text-purple-400 font-mono mt-1">CRR 4.5% / SLR 18%</div>
              <div className="text-[10px] text-slate-300">Net NDTL Ledger</div>
            </div>
          </div>

          {/* Photo Thumbnail Selector Bar */}
          <div className="pt-6 space-y-3">
            <div className="flex items-center justify-center gap-3">
              {heroSlides.map((slide, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSlide(idx)}
                  className={`relative overflow-hidden rounded-xl transition-all duration-300 border-2 ${
                    idx === currentSlide
                      ? 'border-lightgreen-400 scale-110 shadow-lg shadow-lightgreen-400/40 ring-2 ring-lightgreen-400/50'
                      : 'border-slate-700 opacity-60 hover:opacity-100 hover:border-slate-500'
                  }`}
                  title={slide.title}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `/hero/hero${idx + 1}.jpg`;
                    }}
                    className="w-16 h-10 object-cover"
                  />
                  {idx === currentSlide && (
                    <div className="absolute inset-0 bg-lightgreen-400/20" />
                  )}
                </button>
              ))}
            </div>

            <div className="text-[11px] font-semibold text-slate-200 bg-slate-950/90 px-4 py-1.5 rounded-full border border-slate-700/80 backdrop-blur-md inline-flex items-center gap-2 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-lightgreen-400 animate-pulse" />
              <span>{heroSlides[currentSlide].caption}</span>
              <span className="text-slate-400 font-mono">({currentSlide + 1} of {heroSlides.length})</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: LIVE INTEREST RATES SCHEDULE */}
      <section className="py-20 px-6 lg:px-12 bg-slate-950/90 border-b border-slate-800">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-lightgreen-400 uppercase tracking-widest px-3 py-1 rounded-full bg-lightgreen-400/10 border border-lightgreen-400/30">
              Live Rates Schedule
            </span>
            <h2 className="text-3xl font-extrabold text-white">{t('liveRatesTitle')}</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              {t('liveRatesSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {ratesSchedule.map((r, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl space-y-3 border-t-2 border-t-lightgreen-400">
                <div className="text-xs font-bold text-slate-400 uppercase">{r.type}</div>
                <div className="text-3xl font-extrabold text-lightgreen-400 font-mono">{r.rate}</div>
                <div className="text-[11px] text-slate-300 leading-relaxed">{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: ABOUT APEXBANK & NETWORK */}
      <section id="about" className="py-20 px-6 lg:px-12 bg-slate-900 border-b border-slate-800">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-lightgreen-400 uppercase tracking-widest px-3 py-1 rounded-full bg-lightgreen-400/10 border border-lightgreen-400/30">
              National Footprint
            </span>
            <h2 className="text-3xl font-extrabold text-white">{t('aboutTitle')}</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">{t('aboutSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-2xl space-y-3 text-center">
              <MapPin className="w-8 h-8 text-lightgreen-400 mx-auto" />
              <div className="text-3xl font-extrabold text-white font-mono">450+</div>
              <div className="text-sm font-bold text-slate-200">Cyber Branches</div>
              <div className="text-xs text-slate-400">Full-service digital and staff assisted branches</div>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-3 text-center">
              <CreditCard className="w-8 h-8 text-emerald-400 mx-auto" />
              <div className="text-3xl font-extrabold text-white font-mono">1,200+</div>
              <div className="text-sm font-bold text-slate-200">Smart Cash ATMs</div>
              <div className="text-xs text-slate-400">Instant deposit, withdrawal, and passbook kiosks</div>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-3 text-center">
              <PhoneCall className="w-8 h-8 text-blue-400 mx-auto" />
              <div className="text-3xl font-extrabold text-white font-mono">24 / 7</div>
              <div className="text-sm font-bold text-slate-200">Hotline Support</div>
              <div className="text-xs text-slate-400">Toll-free customer care: <strong>1800-APEX-BANK</strong></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: CUSTOMER TESTIMONIALS */}
      <section className="py-20 px-6 lg:px-12 bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-lightgreen-400 uppercase tracking-widest px-3 py-1 rounded-full bg-lightgreen-400/10 border border-lightgreen-400/30">
              Customer Reviews
            </span>
            <h2 className="text-3xl font-extrabold text-white">{t('reviewsTitle')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((tItem, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl space-y-4">
                <div className="flex text-lightgreen-400 gap-1">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-lightgreen-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">"{tItem.text}"</p>
                <div className="pt-2 border-t border-slate-800">
                  <div className="text-xs font-bold text-white">{tItem.name}</div>
                  <div className="text-[10px] text-lightgreen-400 font-semibold">{tItem.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: 3 DISTINCT WORKSPACES */}
      <section id="roles" className="py-20 px-6 lg:px-12 bg-[#6E6E6E] border-b border-slate-700">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-widest px-3 py-1 rounded-full bg-slate-900 border border-slate-700">
              Role Architectures
            </span>
            <h2 className="text-3xl font-extrabold text-white">{t('rolesTitle')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-2xl space-y-4 border-l-4 border-l-red-500">
              <h3 className="text-base font-bold text-white">👑 Admin Role</h3>
              <p className="text-xs text-slate-300">Final Loan Approval (Study &amp; Agri), User Approval, PIN Lockout Overrides, System Health &amp; RBI Reserve Engine.</p>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-4 border-l-4 border-l-blue-500">
              <h3 className="text-base font-bold text-white">💼 Staff / Manager Role</h3>
              <p className="text-xs text-slate-300">Customer KYC &amp; Account Number + IFSC Assignment, Fund Transfer Approval Queue, Loan Forwarding Desk, Locker Manager.</p>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-4 border-l-4 border-l-lightgreen-400">
              <h3 className="text-base font-bold text-white">👤 Customer Role</h3>
              <p className="text-xs text-slate-300">OTP Login (Acc No + IFSC), OTP Balance Unlock, Fund Transfer Submission, Study Loan &amp; Agri Loan Applications, Card Freeze Controls.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: RBI REGULATORY COMPLIANCE */}
      <section id="compliance" className="py-20 px-6 lg:px-12 bg-slate-950 border-b border-slate-800">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-lightgreen-400 uppercase tracking-widest px-3 py-1 rounded-full bg-lightgreen-400/10 border border-lightgreen-400/30">
              Statutory Regulatory Compliance
            </span>
            <h2 className="text-3xl font-extrabold text-white">Reserve Bank of India Compliance Engine</h2>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Automated real-time calculation and verification of mandatory CRR (4.5%), SLR (18.0%), NDTL Net Reserve Ledgers, and BASEL III CRAR metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-2xl space-y-3 border-t-2 border-t-lightgreen-400">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">Cash Reserve Ratio</span>
                <span className="text-[10px] font-bold text-lightgreen-400 bg-lightgreen-400/10 px-2 py-0.5 rounded border border-lightgreen-400/30">CRR 4.5%</span>
              </div>
              <div className="text-2xl font-extrabold text-white font-mono">₹8,32,410</div>
              <p className="text-[11px] text-slate-400">Maintained in unencumbered cash balance with Reserve Bank of India.</p>
              <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Reserve Verified ✓
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-3 border-t-2 border-t-blue-400">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">Statutory Liquidity</span>
                <span className="text-[10px] font-bold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded border border-blue-400/30">SLR 18.0%</span>
              </div>
              <div className="text-2xl font-extrabold text-white font-mono">₹33,29,640</div>
              <p className="text-[11px] text-slate-400">Invested in approved Government Securities (G-Secs) and Treasury Bills.</p>
              <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Liquid Assets Verified ✓
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-3 border-t-2 border-t-purple-400">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">Priority Sector (PSL)</span>
                <span className="text-[10px] font-bold text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded border border-purple-400/30">42.0% Achieved</span>
              </div>
              <div className="text-2xl font-extrabold text-white font-mono">Kisan Agri Loans</div>
              <p className="text-[11px] text-slate-400">Subvention interest crop loans disbursed directly to registered farmers.</p>
              <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Target Surpassed (≥40%) ✓
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 border-l-4 border-l-lightgreen-400">
            <div className="flex items-center gap-4">
              <FileCheck2 className="w-8 h-8 text-lightgreen-400 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white">Quarterly RBI Statutory Return Filing (Form A)</h4>
                <p className="text-xs text-slate-300">Automated double-entry ledger submission and BASEL III Capital Adequacy Ratio (15.4%).</p>
              </div>
            </div>
            <button
              onClick={() => openAuthModal('login')}
              className="green-btn px-6 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2 whitespace-nowrap"
            >
              Access Compliance Engine <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
