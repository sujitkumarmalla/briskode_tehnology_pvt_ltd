# Production-Quality Hospital Management System (HMS) — MERN Stack

A modern, full-stack, enterprise-grade **Hospital Management System (HMS)** built with the **MERN Stack** (MongoDB, Express.js, React + Vite, Node.js) featuring **5 role-based dashboards**, an integrated hospital workflow, and **zero patient logins**.

---

## 🔑 Demo Staff Login Credentials

All 5 roles use the unified login portal (`/login`). Log in using either **Email Address** or **Employee ID (`empId`)**:

| Role | Employee ID | Email | Password | Dashboard Route |
| :--- | :--- | :--- | :--- | :--- |
| **Admin** | `EMP-ADM-001` | `admin@hospital.com` | `admin123` | `/admin/dashboard` |
| **Doctor** | `EMP-DOC-001` | `doctor1@hospital.com` | `doc123` | `/doctor/dashboard` |
| **Receptionist** | `EMP-REC-001` | `receptionist1@hospital.com` | `rec123` | `/receptionist/dashboard` |
| **Pharmacy** | `EMP-PHAR-001` | `pharmacist1@hospital.com` | `pharm123` | `/pharmacy/dashboard` |
| **Laboratory** | `EMP-LAB-001` | `labtech1@hospital.com` | `lab123` | `/laboratory/dashboard` |

> [!IMPORTANT]
> **No Patient Login / Patient Dashboard**: Patients exist strictly as internal hospital records/entities (`PAT-2026-XXXXX`) managed by authorized hospital personnel.

---

## 🌟 Key System Features & Workflows

### 1. 5 Role-Based Dashboards & Sidebar Navigation
* **Admin Dashboard (`/admin/*`)**:
  - Hospital KPIs (Patients, Appointments, Revenue, Doctors, Staff, Bed Occupancy, Pending Orders)
  - Recharts statistics (Weekly appointments & Monthly revenue)
  - Full CRUD Doctor Management with fee, schedule, specialization settings & auto `EMP-DOC-XXX` IDs
  - Staff Management (Receptionists, Pharmacists, Lab Techs)
  - Patient Entity Records lookup with full medical history drawer
  - Hospital Department Management (Cardiology, Neurology, Emergency, etc.)
  - Bed & Ward Occupancy allocation & release
  - Pharmacy & Laboratory overview
  - Consolidated Billing & Invoice Statement management
  - Exportable Reports (CSV & PDF printable summaries)
  - System Activity Audit Logging (`AuditLog`)

* **Doctor Dashboard (`/doctor/*`)**:
  - Today's appointment queue with live check-in tokens (`A-001`, `A-002`)
  - Electronic Medical Encounter / Consultation form (BP, HR, Temp, Weight, Chief Complaint, Diagnosis, Treatment)
  - Integrated Medicine Prescription Modal (dosage, frequency, duration, instructions)
  - Integrated Lab Test Order Modal (CBC, LFT, FBS, X-Ray, priority)
  - My Consulted Patients timeline & records
  - Prescriptions & Lab test requests tracker
  - Follow-up appointment scheduler
  - Doctor profile & working hours management

* **Receptionist Dashboard (`/receptionist/*`)**:
  - Patient Registration Form (Auto-generates `PAT-2026-XXXXX`)
  - Step-by-Step Doctor Appointment Booking with slot collision prevention
  - Patient Check-In Manager (Generates daily queue tokens e.g. `A-023`)
  - Patient Check-Out & Immediate Billing Invoice generation
  - Doctor Availability & Working Hours Schedule lookup
  - Admission Ward/Bed Allocation
  - Payment Collection & Receipt Printing

* **Pharmacy Dashboard (`/pharmacy/*`)**:
  - Today's pharmacy sales summary
  - Pending doctor prescriptions queue
  - Click "Dispense Medicine" -> Auto-calculates prices & decrements stock quantity in `Medicine` inventory
  - OTC & Retail sales billing
  - Medicine inventory CRUD
  - Low stock warning badges & Expiring medicine alerts

* **Laboratory Dashboard (`/laboratory/*`)**:
  - Doctor lab test requests queue
  - Sample Collection Manager (Assigns `LAB-SMP-2026-XXXXX` sample ID)
  - Test Processing Status updater (`Sample Collected` $\rightarrow$ `Processing` $\rightarrow$ `Completed`)
  - Test Results Entry (Parameter, value, reference range, unit, abnormal flags, pathologist remarks)
  - Official printable Lab Reports with hospital logo & pathologist sign-off
  - Test Catalog & Price management

---

## 🏗️ End-to-End Hospital Workflow

$$\text{Receptionist Register Patient } (\text{PAT-2026-XXXXX}) \longrightarrow \text{Book Appointment} \longrightarrow \text{Check-In Patient } (\text{Token A-023})$$
$$\downarrow$$
$$\text{Doctor Consultation } (\text{Vitals, Diagnosis, Treatment Plan})$$
$$\swarrow \hskip 2.5in \searrow$$
$$\text{Prescription Issued } (\text{RX-2026-XXXXX}) \hskip 1.5in \text{Lab Test Requested } (\text{LAB-REQ-XXXXX})$$
$$\downarrow \hskip 3in \downarrow$$
$$\text{Pharmacy Dispenses Medicine } (\text{Inventory Stock }\downarrow) \hskip 0.7in \text{Lab Tech Collects Sample } (\text{LAB-SMP-XXXXX}) \rightarrow \text{Finalized Lab Result}$$
$$\searrow \hskip 2.5in \swarrow$$
$$\text{Consolidated Bill Invoice Generated } (\text{INV-2026-XXXXX}) \longrightarrow \text{Payment Recorded } (\text{Cash/UPI/Card}) \longrightarrow \text{Check-Out}$$

---

## 🛠️ Technology Stack

### Backend
- **Node.js & Express.js** (ES Modules, REST APIs, modular controllers, routes, middlewares)
- **MongoDB & Mongoose** (Schemas with cross-collection references: User, Patient, Department, Appointment, Consultation, Prescription, Medicine, PharmacySale, LabTest, LabRequest, LabResult, Bed, Bill, FollowUp, Notification, AuditLog)
- **JWT & bcryptjs** (Secure authentication, password hashing, role-based authorization middleware)

### Frontend
- **React.js & Vite**
- **React Router DOM v7** (Role-protected routes & redirects)
- **Tailwind CSS v4** (Responsive healthcare design system)
- **Recharts** (Interactive administrative charts)
- **Lucide React** (Modern iconography)
- **React Toastify** (Notifications)

---

## 🚀 How to Run the Project

### 1. Start Backend Server
```bash
cd server
npm install
node seed.js        # Seed initial demo data & credentials
npm run dev         # Starts backend API on http://localhost:5001
```

### 2. Start Frontend Application
```bash
cd hospictal_front
npm install
npm run dev         # Starts Vite dev server on http://localhost:5173
```
