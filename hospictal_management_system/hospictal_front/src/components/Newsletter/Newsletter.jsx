import { useState } from "react";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-3xl my-12 max-w-7xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
      
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
        <span className="text-emerald-300 font-extrabold text-xs uppercase tracking-widest bg-emerald-700/50 px-3 py-1 rounded-full border border-emerald-500/30 inline-block">
          Stay Informed & Healthy
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Subscribe to Our Health Newsletter
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
          Get weekly wellness tips, preventive health advice from senior doctors, and exclusive health checkup offers delivered directly to your inbox.
        </p>

        {subscribed ? (
          <div className="bg-emerald-700/60 border border-emerald-400/40 p-4 rounded-2xl text-xs font-bold text-emerald-100 animate-fade-in">
            ✓ Thank you for subscribing! Check your email for our latest health edition.
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="flex-1 px-4 py-3 rounded-xl text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-300 bg-white"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-extrabold text-xs rounded-xl transition-all shadow-md cursor-pointer"
            >
              Subscribe Now
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default Newsletter;
