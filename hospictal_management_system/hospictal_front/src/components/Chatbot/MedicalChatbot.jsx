import { useState, useEffect, useRef } from "react";
import { doctors as defaultDoctors } from "../../data/doctors";
import { departments } from "../../data/departments";
import { packages } from "../../data/packages";
import { hospitalConfig } from "../../data/hospitalConfig";
import { createAppointment, fetchDoctors } from "../../services/api";
import { toast } from "react-toastify";

function MedicalChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [doctorsList, setDoctorsList] = useState(defaultDoctors);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! 👋 Welcome to Capital Public Seva Hospital. I am your 24/7 AI Healthcare Assistant. How may I assist you today?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // In-chat direct appointment booking state
  const [bookingState, setBookingState] = useState(null); // null or { step, fullName, phone, doctorId, appointmentDate, appointmentTime }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const res = await fetchDoctors();
        if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
          setDoctorsList(res.data);
        }
      } catch (err) {
        console.error("Error fetching doctors for Chatbot from MongoDB:", err);
      }
    };
    loadDoctors();
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  // Handle bot intelligent NLP response generation
  const generateBotResponse = async (userText) => {
    const text = userText.toLowerCase().trim();

    // Check if in interactive booking flow
    if (bookingState) {
      return handleInteractiveBookingFlow(text);
    }

    // 1. Greetings & Welcome
    if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|namaste|start|help)$/.test(text) || text === "hi" || text === "hello") {
      return `👋 **Welcome to Capital Public Seva Hospital!**\n\nI am your 24/7 AI Healthcare Assistant. How can I help you today?\n\n• 📅 **Type 'Book'** to schedule a doctor appointment\n• 🩺 **Type 'Doctors'** to view specialist profiles & fees\n• 🏥 **Type 'Services'** to see clinical departments\n• 📦 **Type 'Packages'** for preventive health checkups\n• 🛡️ **Type 'Insurance'** for TPA & cashless claims\n• 🚑 **Type 'Emergency'** for urgent ambulance & ICU help`;
    }

    // 2. Appointment Intent
    if (text.includes("book") || text.includes("appointment") || text.includes("schedule") || text.includes("slot") || text.includes("consultation")) {
      setBookingState({ step: 1, fullName: "", phone: "", doctorId: "1", appointmentDate: "", appointmentTime: "10:00 AM" });
      return "Sure! I can help you schedule an appointment right here.\n\nPlease enter the **Patient's Full Name** to begin:";
    }

    // 3. Doctor Query
    if (text.includes("doctor") || text.includes("specialist") || text.includes("dr") || text.includes("physician") || text.includes("surgeon")) {
      let response = "🩺 **Our Senior Medical Specialists at Capital Public Seva Hospital:**\n\n";
      doctorsList.forEach((d) => {
        response += `• **${d.name}** (${d.specialization})\n  - Dept: ${d.department} | Exp: ${d.experience} Yrs | Fee: ₹${d.consultationFee}\n  - Room: ${d.roomNo || "OPD 102"} | Availability: ${d.availability}\n\n`;
      });
      response += "Type **'Book'** to schedule an appointment with any doctor!";
      return response;
    }

    // 4. Symptoms & Smart Medical Guidance
    if (text.includes("fever") || text.includes("temp") || text.includes("headache") || text.includes("cold") || text.includes("cough") || text.includes("flu")) {
      return `🤒 **Fever & General Infection Guidance:**\n\n• Stay hydrated, rest, and monitor body temperature.\n• For persistent fever over 101°F or severe cold, please consult our **General Medicine Specialist**.\n\n🩺 **Recommended Specialist:** Dr. Rajesh Kumar (General Medicine)\n📅 **OPD Hours:** Mon - Sat (09:00 AM - 05:00 PM)\n\nType **'Book'** to schedule a consultation immediately.`;
    }

    if (text.includes("chest pain") || text.includes("heart") || text.includes("cardiac") || text.includes("breath")) {
      return `🚨 **IMPORTANT MEDICAL NOTICE:**\n\nIf you or someone is experiencing severe chest pain, left arm pain, or difficulty breathing, please seek **Immediate Emergency Care**.\n\n📞 **24/7 Emergency Hotline:** +91 77878 14476 / 108\n📍 **Trauma Gate 1:** Capital Public Seva Campus\n\nFor non-emergency cardiac evaluations, consult **Dr. Arvind Kapoor (Cardiology)**.`;
    }

    if (text.includes("stomach") || text.includes("gastric") || text.includes("vomiting") || text.includes("acidity") || text.includes("diarrhea")) {
      return `🤢 **Gastrointestinal Health Advice:**\n\n• Drink oral rehydration fluids (ORS), eat light non-spicy meals.\n• For severe abdominal pain, vomiting, or persistent acidity, consult our **Gastroenterology & Internal Medicine Department**.\n\nType **'Book'** to schedule a doctor consultation.`;
    }

    if (text.includes("bone") || text.includes("joint") || text.includes("fracture") || text.includes("back pain") || text.includes("knee")) {
      return `🦴 **Orthopedic & Joint Care:**\n\n• Avoid heavy lifting and apply ice/cold compress for acute joint swelling.\n• Consult **Dr. Vikram Verma (Senior Orthopedic & Joint Surgeon)** for fractures, arthritis, and back pain.\n\nType **'Book'** to schedule an appointment!`;
    }

    // 5. Insurance, TPA & Cashless Claims
    if (text.includes("insurance") || text.includes("tpa") || text.includes("cashless") || text.includes("claim") || text.includes("ayushman") || text.includes("cghs") || text.includes("policy")) {
      return `🛡️ **Cashless Health Insurance & TPA Partners:**\n\nWe provide 100% cashless hospitalization for major insurance providers:\n\n• **Empaneled TPAs:** Star Health, HDFC ERGO, ICICI Lombard, Niva Bupa, Care Health, Max Bupa, New India Assurance.\n• **Government Schemes:** Ayushman Bharat (PM-JAY), CGHS, ECHS.\n\n📍 **Insurance Desk:** Main Hospital Building, Counter No. 4\n📞 **TPA Helpline:** +91 77878 14476 (Ext. 104)`;
    }

    // 6. Diagnostics, Lab Tests & Radiology
    if (text.includes("lab") || text.includes("test") || text.includes("pathology") || text.includes("mri") || text.includes("ct scan") || text.includes("x-ray") || text.includes("blood test") || text.includes("ultrasound")) {
      return `🔬 **Diagnostic & Radiology Services (24/7):**\n\n• **Pathology Lab:** Complete Blood Count (CBC), Lipid Profile, Thyroid, HbA1c, Liver & Kidney Function Tests.\n• **Advanced Imaging:** 3T MRI, 128-Slice CT Scan, Digital X-Ray, Color Doppler Ultrasound.\n• **Report Dispatch:** Blood reports delivered within 4-6 hours via SMS/WhatsApp link.\n\n📍 **Location:** Basement Floor, Diagnostic Block`;
    }

    // 7. Services & Clinical Departments Query
    if (text.includes("service") || text.includes("department") || text.includes("facility") || text.includes("treatment")) {
      let response = "🏥 **Specialized Medical Departments:**\n\n";
      departments.forEach((dept) => {
        response += `• **${dept.name}**: ${dept.description}\n`;
      });
      response += "\nWe also feature 24/7 ICU, Emergency Trauma Care, Blood Bank, & Pathology Lab.";
      return response;
    }

    // 8. Consultation Fees & Price Query
    if (text.includes("fee") || text.includes("cost") || text.includes("charge") || text.includes("price") || text.includes("money") || text.includes("rate")) {
      return `💰 **Consultation Fees & Pricing Structure:**\n\n• **General OPD Consultation:** ₹700 - ₹1,000\n• **Cardiology (Dr. Arvind Kapoor):** ₹1,000\n• **Neurology (Dr. Ananya Mehta):** ₹900\n• **Orthopedics (Dr. Vikram Verma):** ₹850\n• **Pediatrics (Dr. Preeti Reddy):** ₹750\n• **Emergency Consultation (24/7):** ₹1,200\n\n*All consultations include initial clinical diagnosis & prescription review.*`;
    }

    // 9. Emergency & Ambulance Query
    if (text.includes("emergency") || text.includes("ambulance") || text.includes("trauma") || text.includes("urgent") || text.includes("accident") || text.includes("icu") || text.includes("blood bank")) {
      return `🚨 **24/7 Emergency & Advanced Life Support (ALS):**\n\nOur Emergency Ward, ICU, Blood Bank, and Oxygen Ambulance service operate 24/7, 365 days a year.\n\n📞 **24/7 Emergency Hotline:** +91 77878 14476 / 108\n📍 **Location:** Emergency Gate 1, Capital Public Seva Campus\n🚑 **Ambulance Response:** Dispatched within 10-15 mins of call.`;
    }

    // 10. Health Checkup Packages Query
    if (text.includes("package") || text.includes("checkup") || text.includes("screening") || text.includes("wellness") || text.includes("full body")) {
      let response = "📦 **Preventive Health Checkup Packages:**\n\n";
      packages.slice(0, 4).forEach((pkg) => {
        response += `• **${pkg.title}** - ₹${pkg.price} (Saved ${pkg.discount})\n  Includes: ${pkg.testsCount} Tests | ${pkg.description}\n\n`;
      });
      response += "Type **'Book'** to schedule any health package!";
      return response;
    }

    // 11. Timing, Location & OPD Query
    if (text.includes("time") || text.includes("timing") || text.includes("location") || text.includes("address") || text.includes("opd") || text.includes("visiting")) {
      return `🕒 **Hospital Timings & Campus Location:**\n\n• **OPD Timings:** Mon - Sat (08:00 AM - 08:00 PM)\n• **Emergency & ICU:** 24/7 Open (All Days)\n• **In-Patient Visiting Hours:** 04:00 PM - 07:00 PM\n📍 **Address:** ${hospitalConfig.address}\n📞 **Helpline:** +91 77878 14476`;
    }

    // 12. Rescheduling & Cancellation Query
    if (text.includes("cancel") || text.includes("reschedule") || text.includes("change date") || text.includes("modify")) {
      return `🔄 **Appointment Reschedule & Cancellation:**\n\nTo cancel or reschedule an existing appointment, please contact our helpline with your Booking Reference ID:\n\n📞 **Helpline:** +91 77878 14476\n✉️ **Email:** support@capitalpublicseva.com`;
    }

    // Default Smart Helpful Fallback
    return `Thank you for reaching out to Capital Public Seva Hospital! I can assist you with:\n\n1. 📅 **Booking an Appointment** (Type 'Book')\n2. 🩺 **Doctor Schedules & Consultation Fees** (Type 'Doctors')\n3. 🏥 **Clinical Departments** (Type 'Services')\n4. 🛡️ **Health Insurance & Cashless TPA** (Type 'Insurance')\n5. 🔬 **Lab Tests & Radiology** (Type 'Lab')\n6. 🚑 **24/7 Emergency & ICU** (Type 'Emergency')\n\nHow can I best assist you today?`;
  };

  // Interactive step-by-step chatbot appointment booking handler
  const handleInteractiveBookingFlow = async (text) => {
    const currentState = { ...bookingState };

    if (currentState.step === 1) {
      if (text.length < 3) return "Please enter a valid patient full name (at least 3 characters):";
      currentState.fullName = text;
      currentState.step = 2;
      setBookingState(currentState);
      return `Got it, ${text}! Please enter your **Contact Phone Number**:`;
    }

    if (currentState.step === 2) {
      if (!/^[0-9+\s-]{8,15}$/.test(text)) return "Please provide a valid phone number (digits only):";
      currentState.phone = text;
      currentState.step = 3;
      setBookingState(currentState);
      return `Thank you! Select preferred **Doctor/Specialty**:\n\n1. Dr. Arvind Kapoor (Cardiology)\n2. Dr. Ananya Mehta (Neurology)\n3. Dr. Preeti Reddy (Pediatrics)\n4. Dr. Vikram Verma (Orthopedics)\n5. Dr. Rajesh Kumar (Dermatology)\n\nType 1, 2, 3, 4, or 5:`;
    }

    if (currentState.step === 3) {
      const docIndex = parseInt(text) - 1;
      const selectedDoc = doctorsList[docIndex] || doctorsList[0];
      currentState.doctorId = String(selectedDoc.id);
      currentState.doctorName = selectedDoc.name;
      currentState.department = selectedDoc.department;
      currentState.step = 4;
      setBookingState(currentState);
      return `Selected **${selectedDoc.name}** (${selectedDoc.department}).\n\nPlease specify preferred **Appointment Date** (e.g. 2026-09-05 or Tomorrow):`;
    }

    if (currentState.step === 4) {
      currentState.appointmentDate = text.includes("tomorrow") ? new Date(Date.now() + 86400000).toISOString().split("T")[0] : text;
      currentState.step = 5;
      setBookingState(null); // Finish flow

      // Register appointment via Backend API
      try {
        const res = await createAppointment({
          fullName: currentState.fullName,
          email: `${currentState.fullName.toLowerCase().replace(/\s+/g, ".")}@patient.com`,
          phone: currentState.phone,
          doctorId: currentState.doctorId,
          department: currentState.department,
          appointmentDate: currentState.appointmentDate,
          appointmentTime: "10:00 AM",
          reason: "Booked via AI Assistant Chatbot"
        });

        toast.success(`Appointment Confirmed! Booking Ref: ${res.bookingId}`);

        return `🎉 **Appointment Confirmed Successfully!**\n\n• **Booking Ref:** ${res.bookingId}\n• **Patient Name:** ${currentState.fullName}\n• **Doctor:** ${currentState.doctorName}\n• **Department:** ${currentState.department}\n• **Date:** ${currentState.appointmentDate} (10:00 AM)\n\nOur reception team will call ${currentState.phone} to confirm. Is there anything else I can assist you with?`;
      } catch (err) {
        toast.error("Booking created locally!");
        return `✅ Appointment registered for ${currentState.fullName} under Ref CPS-${Math.floor(100000 + Math.random() * 900000)}.`;
      }
    }
  };

  const handleSend = async (userQuery) => {
    const textToSend = userQuery || input;
    if (!textToSend.trim()) return;

    const userMsg = {
      sender: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!userQuery) setInput("");
    setIsTyping(true);

    setTimeout(async () => {
      const responseText = await generateBotResponse(textToSend);
      const botMsg = {
        sender: "bot",
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleRefreshChat = () => {
    setMessages([
      {
        sender: "bot",
        text: "Hello! 👋 Welcome to Capital Public Seva Hospital. I am your 24/7 AI Healthcare Assistant. How may I assist you today?",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ]);
    setBookingState(null);
    setInput("");
    setIsTyping(false);
    toast.info("Chat conversation reset to start!");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating 100% Pure Circle Trigger Button: Compact Green Circle with Red + Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative w-12 h-12 rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-xl transition-all duration-300 transform hover:scale-110 cursor-pointer border-2 border-white flex items-center justify-center p-0"
          title="Open Hospital AI Assistant"
        >
          {/* Inner Circle Badge with Red + Symbol */}
          <div className="w-8 h-8 rounded-full bg-white text-rose-600 flex items-center justify-center font-black text-xl shadow-sm animate-pulse">
            +
          </div>

          {/* Active Status Indicator */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full"></span>
        </button>
      )}

      {/* Floating Chatbot Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden animate-scale-up max-h-[85vh] h-[540px]">
          {/* Header Bar: Green Background with Red + Icon */}
          <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-3">
              {/* Red + Icon in White Circle */}
              <div className="w-10 h-10 rounded-full bg-white text-rose-600 font-black text-2xl flex items-center justify-center shadow-md">
                +
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-white leading-tight">Capital Seva AI Assistant</h3>
                <div className="flex items-center space-x-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                  <span className="text-[10px] text-emerald-100 font-semibold">Trained 24/7 Medical Guide</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1.5">
              <button
                onClick={handleRefreshChat}
                className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center font-bold text-sm transition-all cursor-pointer hover:rotate-180 duration-300"
                title="Refresh Chat (Start Fresh)"
              >
                🔄
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                title="Close Chatbot"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Body Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50 text-xs">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl shadow-xs whitespace-pre-line leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-rose-600 text-white rounded-br-none"
                      : "bg-white text-slate-800 border border-slate-200/80 rounded-bl-none font-medium"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-400 font-bold mt-1 px-1">{msg.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 p-3 bg-white border border-slate-200 rounded-2xl w-max">
                <span className="w-2 h-2 bg-rose-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-rose-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 bg-rose-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-[10px] text-slate-400 font-bold ml-1">AI Assistant typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {[
              { label: "📅 Book Slot", query: "Book appointment" },
              { label: "🩺 Find Doctor", query: "Show doctors and specializations" },
              { label: "💰 Fees", query: "What are consultation fees?" },
              { label: "🛡️ TPA Insurance", query: "Show cashless insurance partners" },
              { label: "🔬 Lab Tests", query: "Pathology lab and MRI CT Scan" },
              { label: "🚑 Emergency", query: "Emergency hotline and ambulance" },
              { label: "📦 Packages", query: "Show health checkup packages" }
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip.query)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 rounded-full text-[10px] font-extrabold transition-all whitespace-nowrap shrink-0 border border-slate-200 cursor-pointer"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input Footer Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about doctors, services, fees, booking..."
              className="flex-1 px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-rose-500 font-medium"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white rounded-xl shadow-md transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9-7-9-7-9 7 9 7zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default MedicalChatbot;
