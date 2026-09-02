import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";

import DashboardLayout from "./components/layouts/DashboardLayout";
import LoginPage from "./pages/auth/LoginPage";
import Home from "./pages/public/Home";
import AboutPage from "./pages/public/AboutPage";
import DepartmentsPage from "./pages/public/DepartmentsPage";
import DoctorsPage from "./pages/public/DoctorsPage";
import ContactPage from "./pages/public/ContactPage";
import PMJAYSchemePage from "./pages/public/PMJAYSchemePage";
import CareerPage from "./pages/public/CareerPage";
import GalleryPage from "./pages/public/GalleryPage";
import BlogPage from "./pages/public/BlogPage";
import AwardsPage from "./pages/public/AwardsPage";
import HealthPackagesPage from "./pages/public/HealthPackagesPage";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import DoctorManagement from "./pages/admin/DoctorManagement";
import StaffManagement from "./pages/admin/StaffManagement";
import PatientManagement from "./pages/admin/PatientManagement";
import DepartmentManagement from "./pages/admin/DepartmentManagement";
import AppointmentManagement from "./pages/admin/AppointmentManagement";
import BedManagement from "./pages/admin/BedManagement";
import PharmacyOverview from "./pages/admin/PharmacyOverview";
import LabOverview from "./pages/admin/LabOverview";
import BillingManagement from "./pages/admin/BillingManagement";
import ReportsPage from "./pages/admin/ReportsPage";
import SettingsPage from "./pages/admin/SettingsPage";

// Doctor Pages
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppointments from "./pages/doctor/AppointmentsPage";
import DoctorPatients from "./pages/doctor/PatientsPage";
import ConsultationPage from "./pages/doctor/ConsultationPage";
import PrescriptionsPage from "./pages/doctor/PrescriptionsPage";
import LabRequestsPage from "./pages/doctor/LabRequestsPage";
import MedicalRecordsPage from "./pages/doctor/MedicalRecordsPage";
import FollowUpsPage from "./pages/doctor/FollowUpsPage";
import DoctorProfile from "./pages/doctor/ProfilePage";

// Receptionist Pages
import ReceptionistDashboard from "./pages/receptionist/ReceptionistDashboard";
import PatientRegistration from "./pages/receptionist/PatientRegistration";
import PatientList from "./pages/receptionist/PatientList";
import AppointmentBooking from "./pages/receptionist/AppointmentBooking";
import CheckInPage from "./pages/receptionist/CheckInPage";
import CheckOutPage from "./pages/receptionist/CheckOutPage";
import DoctorSchedulePage from "./pages/receptionist/DoctorSchedulePage";
import BedAllocationPage from "./pages/receptionist/BedAllocationPage";
import ReceptionBillingPage from "./pages/receptionist/ReceptionBillingPage";

// Pharmacy Pages
import PharmacyDashboard from "./pages/pharmacy/PharmacyDashboard";
import PharmacyPrescriptions from "./pages/pharmacy/PrescriptionsList";
import MedicinesList from "./pages/pharmacy/MedicinesList";
import InventoryManage from "./pages/pharmacy/InventoryManage";
import SalesPage from "./pages/pharmacy/SalesPage";
import LowStockPage from "./pages/pharmacy/LowStockPage";
import ExpiryPage from "./pages/pharmacy/ExpiryPage";
import PharmacyReportsPage from "./pages/pharmacy/PharmacyReportsPage";

// Laboratory Pages
import LabDashboard from "./pages/laboratory/LabDashboard";
import TestRequestsPage from "./pages/laboratory/TestRequestsPage";
import SampleCollectionPage from "./pages/laboratory/SampleCollectionPage";
import ProcessingPage from "./pages/laboratory/ProcessingPage";
import TestResultsPage from "./pages/laboratory/TestResultsPage";
import LabReportsPage from "./pages/laboratory/LabReportsPage";
import TestCatalogPage from "./pages/laboratory/TestCatalogPage";
import LabBillingPage from "./pages/laboratory/LabBillingPage";

const RootRedirect = () => {
  const { user, token } = useAuth();
  if (!token || !user) return <Navigate to="/login" replace />;

  const roleRedirects = {
    ADMIN: "/admin/dashboard",
    DOCTOR: "/doctor/dashboard",
    RECEPTIONIST: "/receptionist/dashboard",
    PHARMACIST: "/pharmacy/dashboard",
    LABORATORY: "/laboratory/dashboard"
  };

  return <Navigate to={roleRedirects[user.role?.toUpperCase()] || "/login"} replace />;
};

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <ToastContainer position="top-right" autoClose={3000} theme="colored" />
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/departments" element={<DepartmentsPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/pmjay-scheme" element={<PMJAYSchemePage />} />
            <Route path="/career" element={<CareerPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/awards" element={<AwardsPage />} />
            <Route path="/health-checkups" element={<HealthPackagesPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* ADMIN DASHBOARD ROUTES */}
            <Route path="/admin" element={<DashboardLayout allowedRole="ADMIN" title="Admin Control Center" />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="doctors" element={<DoctorManagement />} />
              <Route path="staff" element={<StaffManagement />} />
              <Route path="patients" element={<PatientManagement />} />
              <Route path="departments" element={<DepartmentManagement />} />
              <Route path="appointments" element={<AppointmentManagement />} />
              <Route path="beds" element={<BedManagement />} />
              <Route path="pharmacy" element={<PharmacyOverview />} />
              <Route path="laboratory" element={<LabOverview />} />
              <Route path="billing" element={<BillingManagement />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* DOCTOR DASHBOARD ROUTES */}
            <Route path="/doctor" element={<DashboardLayout allowedRole="DOCTOR" title="Doctor Clinical Portal" />}>
              <Route path="dashboard" element={<DoctorDashboard />} />
              <Route path="appointments" element={<DoctorAppointments />} />
              <Route path="patients" element={<DoctorPatients />} />
              <Route path="consultations" element={<ConsultationPage />} />
              <Route path="prescriptions" element={<PrescriptionsPage />} />
              <Route path="lab-requests" element={<LabRequestsPage />} />
              <Route path="medical-records" element={<MedicalRecordsPage />} />
              <Route path="follow-ups" element={<FollowUpsPage />} />
              <Route path="profile" element={<DoctorProfile />} />
            </Route>

            {/* RECEPTIONIST DASHBOARD ROUTES */}
            <Route path="/receptionist" element={<DashboardLayout allowedRole="RECEPTIONIST" title="Reception Desk Portal" />}>
              <Route path="dashboard" element={<ReceptionistDashboard />} />
              <Route path="register-patient" element={<PatientRegistration />} />
              <Route path="patients" element={<PatientList />} />
              <Route path="appointments" element={<AppointmentBooking />} />
              <Route path="check-in" element={<CheckInPage />} />
              <Route path="check-out" element={<CheckOutPage />} />
              <Route path="doctors" element={<DoctorSchedulePage />} />
              <Route path="beds" element={<BedAllocationPage />} />
              <Route path="billing" element={<ReceptionBillingPage />} />
              <Route path="profile" element={<DoctorProfile />} />
            </Route>

            {/* PHARMACY DASHBOARD ROUTES */}
            <Route path="/pharmacy" element={<DashboardLayout allowedRole="PHARMACIST" title="Pharmacy Portal" />}>
              <Route path="dashboard" element={<PharmacyDashboard />} />
              <Route path="prescriptions" element={<PharmacyPrescriptions />} />
              <Route path="medicines" element={<MedicinesList />} />
              <Route path="inventory" element={<InventoryManage />} />
              <Route path="sales" element={<SalesPage />} />
              <Route path="low-stock" element={<LowStockPage />} />
              <Route path="expiry" element={<ExpiryPage />} />
              <Route path="reports" element={<PharmacyReportsPage />} />
              <Route path="profile" element={<DoctorProfile />} />
            </Route>

            {/* LABORATORY DASHBOARD ROUTES */}
            <Route path="/laboratory" element={<DashboardLayout allowedRole="LABORATORY" title="Laboratory Diagnostics Portal" />}>
              <Route path="dashboard" element={<LabDashboard />} />
              <Route path="test-requests" element={<TestRequestsPage />} />
              <Route path="samples" element={<SampleCollectionPage />} />
              <Route path="processing" element={<ProcessingPage />} />
              <Route path="results" element={<TestResultsPage />} />
              <Route path="reports" element={<LabReportsPage />} />
              <Route path="test-catalog" element={<TestCatalogPage />} />
              <Route path="billing" element={<LabBillingPage />} />
              <Route path="profile" element={<DoctorProfile />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  );
}