import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Landmark, 
  Search, 
  ChevronDown, 
  Bell, 
  Send, 
  Calculator, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall, 
  MapPin, 
  Sparkles, 
  Lock, 
  TrendingUp, 
  Zap, 
  Info,
  Sliders,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  Smartphone,
  ExternalLink,
  Award,
  Heart,
  Users,
  Building,
  HelpCircle,
  FileText
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LanguageSelector } from '../components/LanguageSelector';
import { Footer } from '../components/Footer';

import hero1 from '../assets/hero/hero1.jpg';
import hero2 from '../assets/hero/hero2.jpg';
import hero3 from '../assets/hero/hero3.jpg';
import hero4 from '../assets/hero/hero4.jpg';
import hero5 from '../assets/hero/hero5.jpg';

const heroSlides = [
  {
    image: hero1,
    title: 'Celebrating the Season of Togetherness',
    subtitle: 'HAPPY FESTIVAL OFFERS — Low Interest Loans & Instant FD Yields'
  },
  {
    image: hero2,
    title: 'Comprehensive Digital & Branch Network',
    subtitle: 'Over 9,000+ Cyber Branches & 21,000+ Smart ATMs Across India'
  },
  {
    image: hero3,
    title: '24/7 Smart Cash & Deposit Kiosks',
    subtitle: 'Instant Passbook Update, Cash Withdrawal & Instant Transfer'
  },
  {
    image: hero4,
    title: 'RBI Regulated & Subsidized Agriculture Loans',
    subtitle: 'Kisan Crop Credit Subvention @ 4.00% Net Interest Rate'
  },
  {
    image: hero5,
    title: 'Dedicated Cashier & High-Value Transfer Desk',
    subtitle: 'Maker-Checker Dual Control Security & High Yield Savings'
  }
];

export const HomePage = () => {
  const { openAuthModal, t } = useAuth();

  // Navigation Dropdown State
  const [activeDropdown, setActiveDropdown] = useState(null); // 'products' | 'help' | 'offers' | null
  const [activeSegment, setActiveSegment] = useState('Personal');

  // Hero Slideshow State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Floating Hero Widget State
  const [widgetMode, setWidgetMode] = useState('products'); // 'products' or 'services'
  const [selectedCategory, setSelectedCategory] = useState('loans');
  const [selectedProduct, setSelectedProduct] = useState('personal');

  // Solutions Section Tab State
  const [activeSolutionTab, setActiveSolutionTab] = useState('trending');

  // EMI Calculator Section State
  const [calcTab, setCalcTab] = useState('personal');
  const [loanAmount, setLoanAmount] = useState(750000);
  const [tenureYears, setTenureYears] = useState(5);
  const [interestRate, setInterestRate] = useState(9.99);

  // Safety Video Carousel State
  const [safetySlide, setSafetySlide] = useState(0);
  const safetyVideos = [
    {
      title: "Conversation with Vigil Officer ft. Security Experts",
      subtitle: "Episode 1 — Spotting Fake Phishing Links & Unbelievable Cash Deals",
      duration: "3 mins"
    },
    {
      title: "Why You Should NEVER Share Your OTP, PIN or CVV",
      subtitle: "Episode 2 — Protect Your Account From Cyber Impersonation",
      duration: "4 mins"
    },
    {
      title: "Safe UPI Payments & Instant QR Verification",
      subtitle: "Episode 3 — Ensuring Double Authentication Before Paying",
      duration: "2 mins font-mono"
    }
  ];

  // Government Announcements Carousel State
  const [govSlide, setGovSlide] = useState(0);

  // EMI Calculation Logic
  const calculateEmi = () => {
    const p = loanAmount;
    const r = interestRate / (12 * 100);
    const n = tenureYears * 12;
    if (!p || !r || !n) return { emi: 0, totalPayable: 0, totalInterest: 0 };

    const emiVal = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayableVal = emiVal * n;
    const totalInterestVal = totalPayableVal - p;

    return {
      emi: Math.round(emiVal),
      totalPayable: Math.round(totalPayableVal),
      totalInterest: Math.round(totalInterestVal)
    };
  };

  const calcResults = calculateEmi();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNavClick = (sectionId) => {
    setActiveDropdown(null);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      openAuthModal('login');
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F9FD] text-[#0F172A] flex flex-col font-sans selection:bg-[#1478F2] selection:text-white">
      
      {/* ==================== 1. TOP BLUE UTILITY HEADER BAR ==================== */}
      <div className="bg-[#09477D] text-white text-[11px] px-4 sm:px-8 py-2 flex flex-wrap items-center justify-between border-b border-blue-900/30 sticky top-0 z-50">
        <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto py-0.5 scrollbar-none font-medium">
          {['Personal', 'NRI', 'HNI', 'Wholesale', 'Agri', 'MSME', 'Government Schemes'].map(seg => (
            <button
              key={seg}
              onClick={() => setActiveSegment(seg)}
              className={`transition-colors whitespace-nowrap ${
                activeSegment === seg
                  ? 'font-bold text-white border-b-2 border-[#1478F2] pb-0.5'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              {t(seg)}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-5 text-blue-100">
          <span onClick={() => handleNavClick('about')} className="hover:text-white cursor-pointer flex items-center gap-1">
            {t('About Us')} <ChevronDown className="w-3 h-3" />
          </span>
          <div className="flex items-center gap-1">
            <LanguageSelector />
          </div>
          <span title="Accessibility Options" className="hover:text-white cursor-pointer text-base">♿</span>
          <span onClick={() => openAuthModal('login')} className="hover:text-white cursor-pointer relative" title="Notifications">
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-red-400 animate-ping"></span>
          </span>
        </div>
      </div>

      {/* ==================== 2. MAIN WHITE NAVIGATION HEADER WITH INTERACTIVE ROUTING ==================== */}
      <header className="bg-white border-b border-[#D1D5DB] px-4 sm:px-8 h-20 flex items-center justify-between sticky top-[33px] z-40 shadow-sm relative">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1478F2] to-[#0D5FC4] flex items-center justify-center text-white shadow-md font-bold shrink-0">
            <Landmark className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-[#0F172A]">
                {t('brandName')}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#EAF4FF] text-[#1478F2] border border-[#1478F2]/30">
                ENT
              </span>
            </div>
            <p className="text-[10px] font-medium tracking-wide text-[#475569]">
              Enterprise Core System
            </p>
          </div>
        </div>

        {/* Center Desktop Navigation Dropdowns */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-[#334155] relative">
          
          {/* Discover Products Dropdown */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'products' ? null : 'products')}
              className="hover:text-[#1478F2] flex items-center gap-1 transition-colors py-2"
            >
              {t('Discover Products')} <ChevronDown className="w-3.5 h-3.5 text-[#64748B]" />
            </button>
            {activeDropdown === 'products' && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-[#CBD5E1] rounded-2xl shadow-2xl p-4 z-50 space-y-3 animate-in fade-in slide-in-from-top-2">
                <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Account &amp; Loans</div>
                <div onClick={() => handleNavClick('solutions')} className="text-xs font-bold text-[#0F172A] hover:text-[#1478F2] cursor-pointer flex items-center gap-2 py-1">
                  <CreditCard className="w-4 h-4 text-[#1478F2]" /> Digital Savings &amp; Cards
                </div>
                <div onClick={() => handleNavClick('calculator')} className="text-xs font-bold text-[#0F172A] hover:text-[#1478F2] cursor-pointer flex items-center gap-2 py-1">
                  <Calculator className="w-4 h-4 text-emerald-600" /> Express Loans &amp; EMI Tool
                </div>
                <div onClick={() => openAuthModal('register')} className="text-xs font-bold text-[#0F172A] hover:text-[#1478F2] cursor-pointer flex items-center gap-2 py-1">
                  <TrendingUp className="w-4 h-4 text-amber-600" /> 7.50% High Yield FD
                </div>
              </div>
            )}
          </div>

          {/* Need Help Dropdown */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'help' ? null : 'help')}
              className="hover:text-[#1478F2] flex items-center gap-1 transition-colors py-2"
            >
              {t('Need Help')} <ChevronDown className="w-3.5 h-3.5 text-[#64748B]" />
            </button>
            {activeDropdown === 'help' && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-[#CBD5E1] rounded-2xl shadow-2xl p-4 z-50 space-y-3 animate-in fade-in slide-in-from-top-2">
                <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Support &amp; Security</div>
                <div onClick={() => handleNavClick('footprint')} className="text-xs font-bold text-[#0F172A] hover:text-[#1478F2] cursor-pointer flex items-center gap-2 py-1">
                  <PhoneCall className="w-4 h-4 text-[#1478F2]" /> 24/7 Hotline: 1800-APEX-BANK
                </div>
                <div onClick={() => handleNavClick('safety')} className="text-xs font-bold text-[#0F172A] hover:text-[#1478F2] cursor-pointer flex items-center gap-2 py-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Vigil Security &amp; Fraud Desk
                </div>
              </div>
            )}
          </div>

          {/* Better Money Choices */}
          <span onClick={() => handleNavClick('calculator')} className="hover:text-[#1478F2] cursor-pointer transition-colors">
            {t('Better Money Choices')}
          </span>

          {/* Offers Dropdown */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'offers' ? null : 'offers')}
              className="hover:text-[#1478F2] flex items-center gap-1 transition-colors py-2"
            >
              {t('Offers')} <ChevronDown className="w-3.5 h-3.5 text-[#64748B]" />
            </button>
            {activeDropdown === 'offers' && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-[#CBD5E1] rounded-2xl shadow-2xl p-4 z-50 space-y-3 animate-in fade-in slide-in-from-top-2">
                <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Festive 2026 Specials</div>
                <div onClick={() => openAuthModal('register')} className="text-xs font-bold text-[#0F172A] hover:text-[#1478F2] cursor-pointer flex items-center gap-2 py-1">
                  <Sparkles className="w-4 h-4 text-amber-500" /> Festive 7.50% FD Rate
                </div>
                <div onClick={() => openAuthModal('register')} className="text-xs font-bold text-[#0F172A] hover:text-[#1478F2] cursor-pointer flex items-center gap-2 py-1">
                  <Zap className="w-4 h-4 text-emerald-600" /> 4.00% Net Kisan Agri Subvention
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Search Bar & LOGIN Button */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* ASK APEX Search Bar */}
          <div className="hidden sm:flex items-center gap-2 bg-[#F1F5F9] border border-[#CBD5E1] rounded-full px-3.5 py-1.5 text-xs text-[#475569] focus-within:border-[#1478F2] transition-all">
            <span className="text-[10px] font-extrabold text-[#1478F2] bg-[#EAF4FF] px-2 py-0.5 rounded-full border border-[#1478F2]/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#1478F2]" /> ASK APEX
            </span>
            <input
              type="text"
              placeholder={t("Search products, rates, loans...")}
              className="bg-transparent border-none outline-none text-xs text-[#0F172A] w-36 lg:w-48 placeholder-[#64748B]"
            />
            <Search className="w-4 h-4 text-[#64748B] cursor-pointer hover:text-[#1478F2]" />
          </div>

          {/* Primary LOGIN Button */}
          <button
            onClick={() => openAuthModal('login')}
            className="bg-[#E11900] hover:bg-[#B91500] text-white px-5 sm:px-6 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-md transition-all transform hover:-translate-y-0.5"
          >
            <Landmark className="w-4 h-4 text-white" /> {t('LOGIN')} <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>


      {/* ==================== 3. HERO SLIDESHOW BANNER + FLOATING PRODUCT WIDGET ==================== */}
      <section className="relative overflow-hidden bg-[#0F172A] min-h-[520px] lg:min-h-[580px] flex items-center">
        {/* Slideshow Background Images */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <img
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/60 to-[#0F172A]/85" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Offer Banner */}
          <div className="lg:col-span-7 space-y-6 text-white text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-[#38BDF8] animate-pulse" />
              <span>Apex Festive Banking Offers 2026 ({activeSegment} Portal)</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {heroSlides[currentSlide].title}
            </h1>

            <p className="text-slate-200 text-sm sm:text-base max-w-xl font-medium leading-relaxed bg-[#0F172A]/60 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
              {heroSlides[currentSlide].subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => openAuthModal('register')}
                className="blue-btn px-6 py-3.5 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg"
              >
                {t('Open Account Online')} <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleNavClick('solutions')}
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3.5 rounded-xl text-xs font-bold backdrop-blur-md transition-all"
              >
                {t('Explore Festive Rates')}
              </button>
            </div>
          </div>

          {/* Right Floating Product Application Widget (HDFC Replica) */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto">
            <div className="bg-white/95 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-2xl space-y-5 text-[#0F172A]">
              {/* Widget Header Radio Toggle */}
              <div className="flex items-center gap-6 border-b border-[#E2E8F0] pb-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-extrabold text-[#09477D]">
                  <input
                    type="radio"
                    name="widgetMode"
                    checked={widgetMode === 'products'}
                    onChange={() => setWidgetMode('products')}
                    className="w-4 h-4 text-[#1478F2] focus:ring-[#1478F2]"
                  />
                  <span>{t('Products')}</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#64748B]">
                  <input
                    type="radio"
                    name="widgetMode"
                    checked={widgetMode === 'services'}
                    onChange={() => setWidgetMode('services')}
                    className="w-4 h-4 text-[#1478F2] focus:ring-[#1478F2]"
                  />
                  <span>{t('Services')}</span>
                </label>
              </div>

              {/* Select Category Dropdown */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-[#64748B]">Select Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-[#F1F5F9] border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#0F172A] outline-none focus:border-[#1478F2]"
                >
                  <option value="loans">Loans (Personal, Home, Agri)</option>
                  <option value="accounts">Savings &amp; Current Accounts</option>
                  <option value="deposits">Fixed Deposits &amp; Wealth</option>
                  <option value="cards">Debit &amp; Credit Cards</option>
                </select>
              </div>

              {/* Select Specific Product Dropdown */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-[#64748B]">Select Product</label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full bg-[#F1F5F9] border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#0F172A] outline-none focus:border-[#1478F2]"
                >
                  {selectedCategory === 'loans' && (
                    <>
                      <option value="personal">Apex Express Personal Loan @ 9.99%</option>
                      <option value="kisan">Kisan Agriculture Loan @ 4.00% Net</option>
                      <option value="study">Higher Education Loan @ 6.50%</option>
                    </>
                  )}
                  {selectedCategory === 'accounts' && (
                    <>
                      <option value="savings">Instant Digital Savings Account</option>
                      <option value="salary">Corporate Salary Account</option>
                    </>
                  )}
                  {selectedCategory === 'deposits' && (
                    <>
                      <option value="fd">7.50% Fixed Deposit (FD)</option>
                      <option value="rd">Recurring Deposit (RD)</option>
                    </>
                  )}
                  {selectedCategory === 'cards' && (
                    <>
                      <option value="debit">Platinum International Debit Card</option>
                    </>
                  )}
                </select>
              </div>

              {/* Application Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => openAuthModal('register')}
                  className="blue-btn flex-1 py-3 rounded-xl text-xs font-extrabold shadow-md text-center"
                >
                  {t('Apply Now')}
                </button>
                <button
                  onClick={() => openAuthModal('login')}
                  className="text-xs font-bold text-[#1478F2] hover:underline px-3 py-3"
                >
                  {t('Know More')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Floating ASK APEX AI Chat Bar */}
        <div className="absolute bottom-3 left-4 right-4 sm:left-8 sm:right-8 z-20 max-w-5xl mx-auto">
          <div className="bg-white/95 backdrop-blur-md border border-[#1478F2]/30 rounded-2xl p-2.5 sm:p-3 shadow-2xl flex items-center gap-3">
            <span className="text-xs font-extrabold text-[#1478F2] bg-[#EAF4FF] px-3 py-1.5 rounded-xl border border-[#1478F2]/30 flex items-center gap-1.5 shrink-0">
              <Sparkles className="w-4 h-4 text-[#1478F2]" /> ASK APEX
            </span>
            <input
              type="text"
              placeholder={t("What financial solution or loan EMI are you looking for today?")}
              className="bg-transparent border-none outline-none text-xs sm:text-sm text-[#0F172A] w-full font-medium placeholder-[#64748B]"
            />
            <button
              onClick={() => openAuthModal('login')}
              className="w-9 h-9 rounded-xl bg-[#1478F2] text-white flex items-center justify-center shadow-md hover:bg-[#0D5FC4] transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>


      {/* ==================== 4. "BANKING SOLUTIONS TAILOR-MADE FOR YOU" SECTION ==================== */}
      <section id="solutions" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto w-full space-y-10">
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            {t('Banking Solutions tailor-made for you')}
          </h2>
          
          {/* Category Tabs */}
          <div className="flex items-center gap-3 sm:gap-6 border-b border-[#CBD5E1] overflow-x-auto scrollbar-none pt-2">
            {[
              { id: 'trending', label: 'Trending' },
              { id: 'accounts', label: 'Accounts' },
              { id: 'deposits', label: 'Deposits' },
              { id: 'cards', label: 'Cards' },
              { id: 'loans', label: 'Loans' },
              { id: 'insurance', label: 'Insurance' },
              { id: 'investments', label: 'Investments' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSolutionTab(tab.id)}
                className={`pb-3 text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all border-b-2 ${
                  activeSolutionTab === tab.id
                    ? 'border-[#1478F2] text-[#1478F2]'
                    : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {t(tab.label)}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Showcase Product Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Platinum Digital Card */}
          <div className="bg-gradient-to-br from-[#EAF4FF] to-[#DBEAFE] border border-blue-200 rounded-3xl p-6 space-y-5 relative overflow-hidden shadow-sm hover:shadow-md transition-all">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1478F2] bg-white/80 px-2.5 py-1 rounded-full border border-[#1478F2]/30">
              Digital Cards
            </span>
            <h3 className="text-xl font-extrabold text-[#0F172A]">Platinum Debit Card</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Zero contact fee, instant OTP balance unlock, and ₹1,00,000 daily ATM limits.
            </p>
            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={() => openAuthModal('register')}
                className="blue-btn px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-sm"
              >
                {t('Apply Now')}
              </button>
            </div>
            <CreditCard className="w-32 h-32 text-[#1478F2]/15 absolute -bottom-6 -right-6 stroke-[1]" />
          </div>

          {/* Card 2: Fixed Deposit Card (Coral background) */}
          <div className="bg-[#FECDD3] border border-rose-300 rounded-3xl p-6 space-y-5 relative overflow-hidden shadow-sm hover:shadow-md transition-all">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#BE123C] bg-white/80 px-2.5 py-1 rounded-full border border-rose-300">
              High Yield FD
            </span>
            <h3 className="text-xl font-extrabold text-[#881337]">Fixed Deposit @ 7.50%</h3>
            <p className="text-xs text-[#9F1239] leading-relaxed">
              A growth plan with peace of mind. Additional +0.50% interest rate for senior citizens.
            </p>
            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={() => openAuthModal('register')}
                className="bg-[#BE123C] hover:bg-[#9F1239] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-sm transition-all"
              >
                {t('Quick Apply')}
              </button>
              <button
                onClick={() => openAuthModal('login')}
                className="border border-[#BE123C] text-[#BE123C] hover:bg-white/40 px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
              >
                {t('Learn More')}
              </button>
            </div>
            <TrendingUp className="w-32 h-32 text-[#BE123C]/15 absolute -bottom-6 -right-6 stroke-[1]" />
          </div>

          {/* Card 3: Safe Banking Vigil Security */}
          <div className="bg-[#F1F5F9] border border-[#CBD5E1] rounded-3xl p-6 space-y-5 relative overflow-hidden shadow-sm hover:shadow-md transition-all">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0F172A] bg-white px-2.5 py-1 rounded-full border border-[#CBD5E1]">
              Cyber Safety
            </span>
            <h3 className="text-xl font-extrabold text-[#0F172A]">Vigil Officer Says... Safe Banking Saves</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Never share OTPs, PINs, or password details. Registered banking verification protects your savings.
            </p>
            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={() => handleNavClick('safety')}
                className="bg-[#0284C7] hover:bg-[#0369A1] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-sm transition-all"
              >
                {t('Watch Security Video')}
              </button>
            </div>
            <ShieldCheck className="w-32 h-32 text-[#0284C7]/15 absolute -bottom-6 -right-6 stroke-[1]" />
          </div>
        </div>
      </section>


      {/* ==================== 5. "SIMPLIFY FINANCIAL PLANNING WITH THE RIGHT TOOLS" EMI CALCULATOR ==================== */}
      <section id="calculator" className="py-16 px-4 sm:px-8 bg-white border-y border-[#D1D5DB]">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              {t('Simplify financial planning with the right tools')}
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] font-medium">
              {t('Flexible EMIs to address your needs')}
            </p>
          </div>

          {/* Calculator Subtabs */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto scrollbar-none pb-2">
            {[
              { id: 'personal', label: 'Personal Loan', rate: 9.99 },
              { id: 'home', label: 'Home Loan', rate: 8.50 },
              { id: 'fd', label: 'Fixed Deposit', rate: 7.50 },
              { id: 'property', label: 'Loan Against Property', rate: 10.50 },
              { id: 'car', label: 'Car Loan', rate: 8.90 },
              { id: 'agri', label: 'Agri Loan', rate: 4.00 }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setCalcTab(tab.id);
                  setInterestRate(tab.rate);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border shrink-0 ${
                  calcTab === tab.id
                    ? 'bg-[#EAF4FF] text-[#1478F2] border-[#1478F2] shadow-sm font-extrabold'
                    : 'bg-[#F8FAFC] text-[#475569] border-[#CBD5E1] hover:border-[#1478F2]'
                }`}
              >
                {t(tab.label)}
              </button>
            ))}
          </div>

          {/* Interactive EMI Calculation Box */}
          <div className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-sm">
            {/* Left Column: Sliders & Controls */}
            <div className="lg:col-span-7 space-y-8">
              {/* Slider 1: Loan Amount */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-bold text-[#0F172A]">Loan Amount</label>
                  <div className="flex items-center gap-1 bg-white border border-[#CBD5E1] rounded-xl px-3 py-1.5 text-xs font-bold text-[#1478F2] font-mono shadow-sm">
                    ₹ <input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-24 outline-none border-none bg-transparent font-mono text-xs text-[#1478F2]"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="25000"
                  max="5000000"
                  step="25000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#1478F2]"
                />
                <div className="flex justify-between text-[11px] font-mono text-[#64748B]">
                  <span>₹ 25,000</span>
                  <span>₹ 50,000,000</span>
                </div>
              </div>

              {/* Slider 2: Loan Tenure */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-bold text-[#0F172A]">Loan Tenure (Years)</label>
                  <div className="bg-white border border-[#CBD5E1] rounded-xl px-3 py-1.5 text-xs font-bold text-[#1478F2] font-mono shadow-sm">
                    <input
                      type="number"
                      value={tenureYears}
                      onChange={(e) => setTenureYears(Number(e.target.value))}
                      className="w-12 outline-none border-none bg-transparent font-mono text-xs text-[#1478F2]"
                    /> Yrs
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="7"
                  step="1"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#1478F2]"
                />
                <div className="flex justify-between text-[11px] font-mono text-[#64748B]">
                  <span>1 Year</span>
                  <span>7 Years</span>
                </div>
              </div>

              {/* Slider 3: Interest Rate */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-bold text-[#0F172A]">Interest Rate (% PA)</label>
                  <div className="bg-white border border-[#CBD5E1] rounded-xl px-3 py-1.5 text-xs font-bold text-[#1478F2] font-mono shadow-sm">
                    <input
                      type="number"
                      step="0.01"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-14 outline-none border-none bg-transparent font-mono text-xs text-[#1478F2]"
                    /> % PA
                  </div>
                </div>
                <input
                  type="range"
                  min="4.00"
                  max="24.00"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#1478F2]"
                />
                <div className="flex justify-between text-[11px] font-mono text-[#64748B]">
                  <span>4.00% PA</span>
                  <span>24.00% PA</span>
                </div>
              </div>
            </div>

            {/* Right Column: Calculation Summary Card */}
            <div className="lg:col-span-5 bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-md">
              <div className="space-y-6">
                <div className="bg-[#EAF4FF] border border-[#1478F2]/30 rounded-2xl p-5 text-center">
                  <div className="text-xs font-bold text-[#1478F2] uppercase tracking-wider">Your Monthly EMI will be</div>
                  <div className="text-3xl font-extrabold text-[#0D5FC4] font-mono mt-1">
                    ₹ {calcResults.emi.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="space-y-3 text-xs border-t border-[#E2E8F0] pt-4 font-semibold text-[#475569]">
                  <div className="flex justify-between">
                    <span>Amount Payable (Principal + Interest):</span>
                    <strong className="font-mono text-[#0F172A]">₹ {calcResults.totalPayable.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Interest Amount:</span>
                    <strong className="font-mono text-[#1478F2]">₹ {calcResults.totalInterest.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Principal Amount Requested:</span>
                    <strong className="font-mono text-[#0F172A]">₹ {loanAmount.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              </div>

              <button
                onClick={() => openAuthModal('register')}
                className="w-full blue-btn py-3.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg"
              >
                {t('Apply Now')} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* ==================== 6. NEW FEATURE 1: "BUILDING A BETTER INDIA — ONE STEP AT A TIME" (APEX PARIVARTAN CSR) ==================== */}
      <section className="py-16 px-4 sm:px-8 bg-gradient-to-br from-[#E0F2FE] to-[#BAE6FD] border-b border-sky-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0369A1] bg-white px-3 py-1 rounded-full border border-sky-300">
              Apex Parivartan — Social Responsibility
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0C4A6E] leading-tight">
              Building a better India – one step at a time
            </h2>
            <p className="text-xs sm:text-sm text-[#0369A1] leading-relaxed font-medium">
              From education to environmental sustainability and rural empowerment — Apex Parivartan is transforming communities across 9,000+ villages.
            </p>
            <button
              onClick={() => openAuthModal('login')}
              className="bg-[#0284C7] hover:bg-[#0369A1] text-white px-6 py-3 rounded-xl text-xs font-extrabold shadow-md flex items-center gap-2 transition-all"
            >
              Explore CSR Impact <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="bg-white/90 p-5 rounded-2xl border border-sky-200 shadow-sm space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0284C7] font-mono">12+ Lakh</div>
              <div className="text-xs font-bold text-[#0F172A]">Households Impacted</div>
            </div>

            <div className="bg-white/90 p-5 rounded-2xl border border-sky-200 shadow-sm space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0284C7] font-mono">10+ Crore</div>
              <div className="text-xs font-bold text-[#0F172A]">Lives Touched</div>
            </div>

            <div className="bg-white/90 p-5 rounded-2xl border border-sky-200 shadow-sm space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0284C7] font-mono">20+ Lakh</div>
              <div className="text-xs font-bold text-[#0F172A]">Teachers &amp; Farmers Benefited</div>
            </div>

            <div className="bg-white/90 p-5 rounded-2xl border border-sky-200 shadow-sm space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0284C7] font-mono">9K+</div>
              <div className="text-xs font-bold text-[#0F172A]">Villages Covered</div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================== 7. NEW FEATURE 2: "HOW TO STAY SAFE FROM FINANCIAL FRAUDSTERS" (VIGIL SAFETY CAROUSEL) ==================== */}
      <section id="safety" className="py-16 px-4 sm:px-8 bg-[#F1F5F9] border-b border-[#CBD5E1]">
        <div className="max-w-7xl mx-auto space-y-10 text-center">
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#1478F2] uppercase tracking-widest px-3 py-1 rounded-full bg-[#EAF4FF] border border-[#1478F2]/30">
              Cyber Security &amp; Safety Series
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A]">
              How to Stay Safe From Financial Fraudsters
            </h2>
          </div>

          {/* Interactive Video Showcase Card */}
          <div className="relative max-w-3xl mx-auto">
            <div className="bg-[#0F172A] border border-blue-500/30 rounded-3xl p-6 sm:p-10 text-white shadow-2xl space-y-6 relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-[#1478F2] text-white flex items-center justify-center mx-auto shadow-lg cursor-pointer hover:scale-110 transition-all">
                <PlayCircle className="w-10 h-10 stroke-[1.5]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg sm:text-2xl font-extrabold text-white">
                  {safetyVideos[safetySlide].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  {safetyVideos[safetySlide].subtitle} • <span className="text-[#38BDF8] font-mono">{safetyVideos[safetySlide].duration}</span>
                </p>
              </div>
              <button
                onClick={() => openAuthModal('login')}
                className="blue-btn px-6 py-3 rounded-xl text-xs font-extrabold shadow-md inline-flex items-center gap-2"
              >
                <PlayCircle className="w-4 h-4" /> Watch Full Safety Video
              </button>
            </div>

            {/* Carousel Navigation Arrows */}
            <button
              onClick={() => setSafetySlide((safetySlide - 1 + safetyVideos.length) % safetyVideos.length)}
              className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-[#CBD5E1] text-[#0F172A] flex items-center justify-center shadow-lg hover:bg-[#EAF4FF] hover:text-[#1478F2] transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSafetySlide((safetySlide + 1) % safetyVideos.length)}
              className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-[#CBD5E1] text-[#0F172A] flex items-center justify-center shadow-lg hover:bg-[#EAF4FF] hover:text-[#1478F2] transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>


      {/* ==================== 8. NEW FEATURE 3: "BANKING BEYOND NUMBERS" NATIONAL REACH ==================== */}
      <section id="footprint" className="py-16 px-4 sm:px-8 bg-white border-b border-[#CBD5E1]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              Banking Beyond Numbers
            </h2>
            <p className="text-sm font-bold text-[#1478F2]">Built to Serve You Everywhere</p>
            <p className="text-xs text-[#475569] leading-relaxed">
              With thousands of cyber branches and smart cash kiosks across rural and urban India, Apex Bank provides seamless financial services wherever you are.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="bg-[#EAF4FF] border border-[#1478F2]/20 p-6 rounded-2xl text-center space-y-1 shadow-sm">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0D5FC4] font-mono">9K+</div>
              <div className="text-xs font-bold text-[#0F172A]">Branches - Nationwide Reach</div>
            </div>

            <div className="bg-[#EAF4FF] border border-[#1478F2]/20 p-6 rounded-2xl text-center space-y-1 shadow-sm">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0D5FC4] font-mono">21K+</div>
              <div className="text-xs font-bold text-[#0F172A]">ATMs - Always Nearby</div>
            </div>

            <div className="bg-[#EAF4FF] border border-[#1478F2]/20 p-6 rounded-2xl text-center space-y-1 shadow-sm">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0D5FC4] font-mono">9Cr+</div>
              <div className="text-xs font-bold text-[#0F172A]">Customers - Inspiring Trust</div>
            </div>

            <div className="bg-[#EAF4FF] border border-[#1478F2]/20 p-6 rounded-2xl text-center space-y-1 shadow-sm">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0D5FC4] font-mono">50M+</div>
              <div className="text-xs font-bold text-[#0F172A]">App Downloads - Seamless Banking</div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================== 9. NEW FEATURE 4: "OFFICIAL GOVERNMENT ANNOUNCEMENTS" CAROUSEL ==================== */}
      <section className="py-16 px-4 sm:px-8 bg-[#F8FAFC] border-b border-[#CBD5E1]">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-purple-700 uppercase tracking-widest px-3 py-1 rounded-full bg-purple-50 border border-purple-200">
              Regulatory Notices
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A]">
              Official Government &amp; RBI Announcements
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#CBD5E1] p-6 rounded-2xl space-y-4 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-extrabold text-[#0F172A]">RBI Kehta Hai — Thoda Dhyan Se!</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                If an offer looks unbelievably good, pause and verify before sharing details. Stay alert to keep your money safe.
              </p>
              <button onClick={() => openAuthModal('login')} className="text-xs font-bold text-[#1478F2] hover:underline flex items-center gap-1">
                Read Official Notice <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white border border-[#CBD5E1] p-6 rounded-2xl space-y-4 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1478F2] flex items-center justify-center font-bold">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-extrabold text-[#0F172A]">RBI Integrated Ombudsman Scheme</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Single window resolution of grievances against RBI regulated banking entities within 30 days.
              </p>
              <button onClick={() => openAuthModal('login')} className="text-xs font-bold text-[#1478F2] hover:underline flex items-center gap-1">
                Lodge Grievance <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white border border-[#CBD5E1] p-6 rounded-2xl space-y-4 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-extrabold text-[#0F172A]">SEBI Saarthi Wealth Education App</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Unlock investor knowledge with unbiased tools, calculators, and verified securities market insights.
              </p>
              <button onClick={() => openAuthModal('login')} className="text-xs font-bold text-[#1478F2] hover:underline flex items-center gap-1">
                Explore Saarthi App <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* ==================== 10. NEW FEATURE 5: MOBILE APP & DIGITAL BANKING DOWNLOAD SHOWCASE ==================== */}
      <section className="py-16 px-4 sm:px-8 bg-gradient-to-r from-[#EAF4FF] via-[#DBEAFE] to-[#EAF4FF] border-b border-[#1478F2]/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-64 h-[420px] bg-[#0F172A] rounded-[40px] border-4 border-slate-800 p-4 shadow-2xl flex flex-col justify-between text-white relative">
              <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto mb-2"></div>
              <div className="text-center space-y-4 my-auto">
                <Heart className="w-16 h-16 text-rose-500 fill-rose-500 mx-auto animate-pulse" />
                <h4 className="text-lg font-extrabold text-white">Designed with love.</h4>
                <p className="text-xs text-slate-300">Apex Enterprise Core Mobile App</p>
              </div>
              <div className="bg-[#1478F2] p-2.5 rounded-2xl text-center text-xs font-bold shadow-md">
                OTP Instant Login Active
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              Secure, hassle-free banking on-the-go
            </h2>
            <p className="text-sm font-semibold text-[#1478F2]">
              Experience industry-leading Digital Banking Solutions
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-[#1478F2] border border-[#1478F2]/30 shadow-sm">
                Apex Bank App
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-[#0F172A] border border-[#CBD5E1]">
                NetBanking
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-[#0F172A] border border-[#CBD5E1]">
                ChatBanking
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#1478F2] text-white">
                Quick Pay
              </span>
            </div>

            <p className="text-xs text-[#475569] leading-relaxed">
              Experience a seamless banking experience via our new mobile banking app available on iOS App Store and Android Google Play.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => openAuthModal('register')}
                className="bg-[#0F172A] hover:bg-slate-800 text-white px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2.5 shadow-md transition-all"
              >
                <Smartphone className="w-5 h-5 text-white" />
                <div className="text-left leading-tight">
                  <div className="text-[9px] uppercase text-slate-400 font-bold">Download on the</div>
                  <div className="text-xs font-extrabold">App Store</div>
                </div>
              </button>

              <button
                onClick={() => openAuthModal('register')}
                className="bg-[#0F172A] hover:bg-slate-800 text-white px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2.5 shadow-md transition-all"
              >
                <Smartphone className="w-5 h-5 text-emerald-400" />
                <div className="text-left leading-tight">
                  <div className="text-[9px] uppercase text-slate-400 font-bold">GET IT ON</div>
                  <div className="text-xs font-extrabold">Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* ==================== 11. FOOTER ==================== */}
      <Footer />

    </div>
  );
};
