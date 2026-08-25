import axios from "axios";

// Create Axios Instance with default settings for future backend integration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error Response:", error.response || error.message);
    return Promise.reject(error);
  }
);

// Appointment Service Calls
export const createAppointment = async (appointmentData) => {
  // Simulated delay for frontend testing until backend is running
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    success: true,
    message: "Appointment booked successfully!",
    bookingId: `CPS-${Math.floor(100000 + Math.random() * 900000)}`,
    data: appointmentData
  };
  // Future API call:
  // return await api.post("/appointments", appointmentData);
};

// Contact Form Service Calls
export const sendContactMessage = async (contactData) => {
  console.log("Submitting contact message payload:", contactData);
  await new Promise((resolve) => setTimeout(resolve, 600));
  return {
    success: true,
    message: "Your message has been sent successfully!"
  };
  // Future API call:
  // return await api.post("/contact", contactData);
};

export default api;
