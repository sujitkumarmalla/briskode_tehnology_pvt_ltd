import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp/FloatingWhatsApp";
import AppRoutes from "./routes/AppRoutes";
import { useScrollToTop } from "./hooks/useScrollToTop";

function AppContent() {
  // Automatically scroll to top when navigation occurs
  useScrollToTop();

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50 text-slate-800 antialiased selection:bg-emerald-500 selection:text-white">
      {/* Sticky Top Navbar */}
      <Navbar />

      {/* Main Page Body */}
      <main className="flex-grow pt-16">
        <AppRoutes />
      </main>

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Multi-column Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;