import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ShieldCheck, Lock, Mail, UserCheck, Stethoscope, Pill, FlaskConical, Users, Building2, ArrowLeft, Home } from "lucide-react";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState("RECEPTIONIST");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const roleOptions = [
    { id: "RECEPTIONIST", label: "Receptionist", icon: Users, color: "text-teal-600 bg-teal-50 border-teal-200" },
    { id: "DOCTOR", label: "Doctor", icon: Stethoscope, color: "text-blue-600 bg-blue-50 border-blue-200" },
    { id: "ADMIN", label: "Admin", icon: ShieldCheck, color: "text-purple-600 bg-purple-50 border-purple-200" },
    { id: "PHARMACIST", label: "Pharmacy", icon: Pill, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    { id: "LABORATORY", label: "Laboratory", icon: FlaskConical, color: "text-indigo-600 bg-indigo-50 border-indigo-200" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email/Employee ID and password");
      return;
    }

    setSubmitting(true);
    try {
      const data = await login(email, password, selectedRole);
      toast.success(`Welcome back, ${data.user.name}!`);

      const roleRedirects = {
        ADMIN: "/admin/dashboard",
        DOCTOR: "/doctor/dashboard",
        RECEPTIONIST: "/receptionist/dashboard",
        PHARMACIST: "/pharmacy/dashboard",
        LABORATORY: "/laboratory/dashboard"
      };

      navigate(roleRedirects[data.user.role?.toUpperCase()] || "/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const fillDemo = (demoEmail, demoPass, demoRole) => {
    setSelectedRole(demoRole);
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 relative">
      {/* Top Floating Back to Home Button */}
      <Link
        to="/"
        className="fixed top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 font-extrabold text-xs rounded-2xl shadow-lg hover:bg-slate-100 hover:text-blue-600 transition-all z-50 group"
      >
        <ArrowLeft className="w-4 h-4 text-blue-600 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Public Website</span>
      </Link>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <img
          src="/briskode_logo.png"
          alt="Briskode Hospital Logo"
          className="h-20 mx-auto mb-3 bg-white p-2.5 rounded-3xl shadow-xl border border-slate-200 object-contain"
        />
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Staff Administration Portal
        </h2>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl rounded-3xl border border-slate-200/80">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Role Selection Tabs */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                1. Select Your Staff Role *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {roleOptions.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;
                  return (
                    <button
                      type="button"
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all text-center ${
                        isSelected
                          ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/30 scale-105 font-bold"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 font-medium"
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-1 ${isSelected ? "text-white" : "text-slate-600"}`} />
                      <span className="text-xs">{role.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email / EmpID Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                2. Email Address or Employee ID (empId) *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="receptionist1@hospital.com or EMP-REC-001"
                  className="w-full pl-10 pr-4 py-2.5 text-xs font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                3. Password *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-xs font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-lg shadow-blue-600/30 disabled:opacity-50 transition-all"
              >
                {submitting ? "Validating & Signing In..." : `Sign In as ${selectedRole}`}
              </button>
              <Link
                to="/"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-extrabold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors"
              >
                <Home className="w-4 h-4 text-blue-600" /> Back to Home
              </Link>
            </div>
          </form>

          {/* Quick Fill Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center mb-3">
              Click any demo account to test role validation
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => fillDemo("receptionist1@hospital.com", "rec123", "RECEPTIONIST")}
                className="px-3 py-2 font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl text-center"
              >
                Receptionist
              </button>
              <button
                type="button"
                onClick={() => fillDemo("doctor1@hospital.com", "doc123", "DOCTOR")}
                className="px-3 py-2 font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-center"
              >
                Doctor
              </button>
              <button
                type="button"
                onClick={() => fillDemo("sujitmalla000@gmail.com", "capitalseva@2026", "ADMIN")}
                className="px-3 py-2 font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl text-center"
              >
                Admin (Superadmin)
              </button>
              <button
                type="button"
                onClick={() => fillDemo("pharmacist1@hospital.com", "pharm123", "PHARMACIST")}
                className="px-3 py-2 font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-center"
              >
                Pharmacy
              </button>
              <button
                type="button"
                onClick={() => fillDemo("labtech1@hospital.com", "lab123", "LABORATORY")}
                className="px-3 py-2 font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl text-center col-span-2 sm:col-span-1"
              >
                Laboratory
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
