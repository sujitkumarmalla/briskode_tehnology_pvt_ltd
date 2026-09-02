import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import AboutPage from "../pages/AboutPage";
import ServicesPage from "../pages/ServicesPage";
import DepartmentsPage from "../pages/DepartmentsPage";
import DoctorsPage from "../pages/DoctorsPage";
import DoctorDetailsPage from "../pages/DoctorDetailsPage";
import PackagesPage from "../pages/PackagesPage";
import AppointmentPage from "../pages/AppointmentPage";
import ContactPage from "../pages/ContactPage";
import FAQPage from "../pages/FAQPage";
import GalleryPage from "../pages/GalleryPage";
import LoginPage from "../pages/LoginPage";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import ProtectedAdminRoute from "../components/ProtectedAdminRoute";
import NotFoundPage from "../pages/NotFoundPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/departments" element={<DepartmentsPage />} />
      <Route path="/doctors" element={<DoctorsPage />} />
      <Route path="/doctors/:id" element={<DoctorDetailsPage />} />
      <Route path="/packages" element={<PackagesPage />} />
      <Route path="/appointment" element={<AppointmentPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminDashboardPage />
          </ProtectedAdminRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
