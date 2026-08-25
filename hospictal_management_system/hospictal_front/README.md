# Capital Public Seva — Hospital Management & Healthcare Frontend

A production-quality, client-ready hospital website built using **React 19 + Vite + Tailwind CSS v4**. It features an architectural layout designed for healthcare institutions, complete with routing, specialist profiles, health packages, interactive appointment scheduling, and WhatsApp integration.

---

## 🌟 Key Features

- **Responsive Glassmorphism Navigation**: Sticky header with blur effects and collapsible mobile menu.
- **AI-Generated Medical Assets**: High-resolution imagery for hospital hero background, logo, and doctor profile headshots.
- **Specialist Directory & Filtering**: Interactive doctor profiles, qualification badges, availability indicators, and ratings.
- **Dynamic Routing**: Multi-page navigation supported by `react-router-dom` with deep-linking doctor profiles (`/doctors/:id`).
- **Interactive Appointment Booking**: Form validation, time slot selection, doctor filters, and instant booking summary generation.
- **Direct WhatsApp Messaging (+91 77878 14476)**: Floating WhatsApp button and booking/contact form submission redirects for direct inquiries.
- **Health Checkup Pricing Tables**: Feature comparisons for basic, executive, and cardiac diagnostic packages.
- **Axios API Ready**: Clean abstraction in `src/services/api.js` ready for seamless connection to a Node.js/Express/MongoDB backend.

---

## 🛠️ Technology Stack

- **Core Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 + Custom Micro-animations
- **Routing**: React Router DOM (v7)
- **HTTP Client**: Axios (Pre-configured architecture)
- **Icons**: Clean inline SVG vector icons

---

## 📁 Project Architecture

```text
hospictal_front/
├── public/
│   └── images/          # AI generated photos (hero, logo, doctor headshots)
├── src/
│   ├── components/      # Modular UI components (Navbar, Footer, Hero, DoctorCard, etc.)
│   ├── data/            # Static data structures (doctors, services, departments, packages, testimonials)
│   ├── hooks/           # Custom hooks (useScrollToTop)
│   ├── pages/           # Page views (Home, About, Services, Doctors, Appointment, Contact, etc.)
│   ├── routes/          # Centralized route definitions (AppRoutes.jsx)
│   ├── services/        # Axios API service layer (api.js)
│   ├── App.jsx          # Entry application container
│   ├── main.jsx         # React root mounting point
│   └── index.css        # Tailwind imports & custom utilities
├── .env                 # Environment variables
├── package.json         # Project dependencies & scripts
└── README.md            # Comprehensive project documentation
```

---

## ⚡ Quick Start & Running Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Open Browser**:
   Navigate to `http://localhost:5173` to view the application live.

---

## 📦 Production Build & Quality Check

- **Verify Linting**:
  ```bash
  npm run lint
  ```

- **Compile Production Bundle**:
  ```bash
  npm run build
  ```

---

## 🔌 Connecting Future Backend (Node.js / Express / MongoDB)

The frontend is structured to easily communicate with a REST API:
1. Update `.env` file:
   ```env
   VITE_API_BASE_URL=http://your-backend-api-domain.com/api
   ```
2. Enable full API endpoints in `src/services/api.js` by uncommenting the Axios HTTP requests (`api.post('/appointments')`, `api.get('/doctors')`).

---

## 🚀 Deployment Instructions (Vercel)

1. Push your code to GitHub/GitLab.
2. Log into [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your repository.
4. Set Build Command: `npm run build` and Output Directory: `dist`.
5. Add Environment Variables from `.env`.
6. Click **Deploy**!
