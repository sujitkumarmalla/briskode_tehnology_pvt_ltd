import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import User from "./models/User.js";
import Doctor from "./models/Doctor.js";
import Patient from "./models/Patient.js";
import Department from "./models/Department.js";
import Appointment from "./models/Appointment.js";
import Consultation from "./models/Consultation.js";
import Prescription from "./models/Prescription.js";
import Medicine from "./models/Medicine.js";
import PharmacySale from "./models/PharmacySale.js";
import LabTest from "./models/LabTest.js";
import LabRequest from "./models/LabRequest.js";
import LabResult from "./models/LabResult.js";
import Bed from "./models/Bed.js";
import Bill from "./models/Bill.js";
import Notification from "./models/Notification.js";
import AuditLog from "./models/AuditLog.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log("🧹 Clearing old database collections...");
    const models = [User, Doctor, Patient, Department, Appointment, Consultation, Prescription, Medicine, PharmacySale, LabTest, LabRequest, LabResult, Bed, Bill, Notification, AuditLog];
    for (const m of models) {
      try { await m.collection.dropIndexes(); } catch (e) {}
      await m.deleteMany({});
    }

    console.log("🌱 Seeding Departments...");
    const depts = await Department.insertMany([
      { name: "General Medicine", description: "Primary care & adult medicine" },
      { name: "Cardiology", description: "Heart & cardiovascular treatment" },
      { name: "Neurology", description: "Brain, spine & nervous system" },
      { name: "Orthopedics", description: "Bone & joint surgery" },
      { name: "Dermatology", description: "Skin, hair & nail diseases" },
      { name: "ENT", description: "Ear, Nose & Throat specialty" },
      { name: "Pediatrics", description: "Child & infant care" },
      { name: "Gynecology", description: "Women's health & obstetrics" },
      { name: "Radiology", description: "Imaging & diagnostic scans" },
      { name: "Pathology", description: "Clinical laboratory analysis" },
      { name: "Emergency", description: "24/7 Trauma & Critical care" }
    ]);

    const deptMap = {};
    depts.forEach(d => { deptMap[d.name] = d._id; });

    console.log("👥 Seeding Staff Users with unique Employee IDs...");
    const adminPass = await bcrypt.hash("capitalseva@2026", 10);
    const docPass = await bcrypt.hash("doc123", 10);
    const recPass = await bcrypt.hash("rec123", 10);
    const pharmPass = await bcrypt.hash("pharm123", 10);
    const labPass = await bcrypt.hash("lab123", 10);

    const users = await User.insertMany([
      // Admin
      {
        empId: "EMP-ADM-001",
        name: "Sujit Malla (Super Admin)",
        email: "sujitmalla000@gmail.com",
        phone: "9876543210",
        password: adminPass,
        role: "ADMIN",
        department: deptMap["General Medicine"],
        specialization: "Hospital Administration",
        profileImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200"
      },
      // Doctors
      {
        empId: "EMP-DOC-001",
        name: "Dr. Swarna Sarthak Mohanty",
        email: "doctor1@hospital.com",
        phone: "9876543211",
        password: docPass,
        role: "DOCTOR",
        department: deptMap["Cardiology"],
        specialization: "Senior Cardiologist & Cath-Lab Specialist",
        qualification: "MD, DM Cardiology (AIIMS)",
        experience: "16 Years",
        consultationFee: 800,
        availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        workingHours: "09:00 AM - 04:00 PM",
        profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200"
      },
      {
        empId: "EMP-DOC-002",
        name: "Dr. Sunita Mehta",
        email: "doctor2@hospital.com",
        phone: "9876543212",
        password: docPass,
        role: "DOCTOR",
        department: deptMap["Neurology"],
        specialization: "Consultant Neurologist & Stroke Care",
        qualification: "MBBS, MD, DM Neurology",
        experience: "12 Years",
        consultationFee: 750,
        availableDays: ["Monday", "Wednesday", "Friday"],
        workingHours: "10:00 AM - 05:00 PM",
        profileImage: "https://images.unsplash.com/photo-1594824813566-88855ce78907?auto=format&fit=crop&q=80&w=200"
      },
      {
        empId: "EMP-DOC-003",
        name: "Dr. Vikram Singh",
        email: "doctor3@hospital.com",
        phone: "9876543213",
        password: docPass,
        role: "DOCTOR",
        department: deptMap["General Medicine"],
        specialization: "Internal Medicine Specialist",
        qualification: "MBBS, MD Internal Medicine",
        experience: "10 Years",
        consultationFee: 500,
        availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        workingHours: "08:30 AM - 02:30 PM",
        profileImage: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200"
      },
      {
        empId: "EMP-DOC-004",
        name: "Dr. Subrat Kumar Das",
        email: "doctor4@hospital.com",
        phone: "9876543214",
        password: docPass,
        role: "DOCTOR",
        department: deptMap["Nephrology"],
        specialization: "Nephrologist & Dialysis Specialist",
        qualification: "MD, DM Nephrology",
        experience: "14 Years",
        consultationFee: 700,
        availableDays: ["Monday", "Tuesday", "Thursday", "Saturday"],
        workingHours: "09:00 AM - 03:00 PM",
        profileImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200"
      },
      {
        empId: "EMP-DOC-005",
        name: "Dr. Rashmi Rekha Pattnaik",
        email: "doctor5@hospital.com",
        phone: "9876543215",
        password: docPass,
        role: "DOCTOR",
        department: deptMap["Gastroenterology"],
        specialization: "Gastroenterologist & Endoscopist",
        qualification: "MD, DNB Gastroenterology",
        experience: "11 Years",
        consultationFee: 650,
        availableDays: ["Tuesday", "Wednesday", "Friday"],
        workingHours: "10:00 AM - 04:00 PM",
        profileImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200"
      },
      {
        empId: "EMP-DOC-006",
        name: "Dr. Bikash Chandra Sahoo",
        email: "doctor6@hospital.com",
        phone: "9876543216",
        password: docPass,
        role: "DOCTOR",
        department: deptMap["Orthopedics"],
        specialization: "Orthopedic & Joint Replacement Surgeon",
        qualification: "MS Orthopedics, Fellow Joint Replacement",
        experience: "13 Years",
        consultationFee: 750,
        availableDays: ["Monday", "Thursday", "Saturday"],
        workingHours: "09:30 AM - 03:30 PM",
        profileImage: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200"
      },
      // Receptionists
      {
        empId: "EMP-REC-001",
        name: "Priya Sharma",
        email: "receptionist1@hospital.com",
        phone: "9876543214",
        password: recPass,
        role: "RECEPTIONIST",
        department: deptMap["General Medicine"],
        specialization: "Front Desk & Registrations",
        profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
      },
      {
        empId: "EMP-REC-002",
        name: "Rohan Verma",
        email: "receptionist2@hospital.com",
        phone: "9876543215",
        password: recPass,
        role: "RECEPTIONIST",
        department: deptMap["Emergency"],
        specialization: "Patient Admissions & Billing"
      },
      // Pharmacists
      {
        empId: "EMP-PHAR-001",
        name: "Amit Patel",
        email: "pharmacist1@hospital.com",
        phone: "9876543216",
        password: pharmPass,
        role: "PHARMACIST",
        department: deptMap["Pathology"],
        specialization: "Chief Pharmacist (B.Pharm)",
        profileImage: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=200"
      },
      {
        empId: "EMP-PHAR-002",
        name: "Neha Joshi",
        email: "pharmacist2@hospital.com",
        phone: "9876543217",
        password: pharmPass,
        role: "PHARMACIST",
        specialization: "Clinical Pharmacy Specialist"
      },
      // Laboratory Technicians
      {
        empId: "EMP-LAB-001",
        name: "Suresh Kumar",
        email: "labtech1@hospital.com",
        phone: "9876543218",
        password: labPass,
        role: "LABORATORY",
        department: deptMap["Pathology"],
        specialization: "Senior Pathology Technician (DMLT)"
      },
      {
        empId: "EMP-LAB-002",
        name: "Kavita Rao",
        email: "labtech2@hospital.com",
        phone: "9876543219",
        password: labPass,
        role: "LABORATORY",
        department: deptMap["Radiology"],
        specialization: "Radiology Technician"
      }
    ]);

    const docUsers = users.filter(u => u.role === "DOCTOR");
    await Doctor.insertMany(
      docUsers.map((d, index) => ({
        id: index + 1,
        name: d.name,
        specialization: d.specialization,
        department: Object.keys(deptMap).find(k => deptMap[k].toString() === (d.department ? d.department.toString() : "")) || "General Medicine",
        qualification: d.qualification || "MBBS, MD",
        experience: typeof d.experience === "number" ? d.experience : (parseInt(d.experience) || 10),
        availability: d.availableDays ? d.availableDays.join(", ") : "Mon, Tue, Wed, Thu, Fri",
        status: "Available",
        rating: 4.9,
        consultationFee: d.consultationFee || 800,
        email: d.email,
        phone: d.phone,
        image: d.profileImage,
        bio: `${d.name} is a senior consultant specialist at Briskode Public Hospital.`
      }))
    );

    const doctor1 = users.find(u => u.empId === "EMP-DOC-001");
    const doctor2 = users.find(u => u.empId === "EMP-DOC-002");
    const doctor3 = users.find(u => u.empId === "EMP-DOC-003");

    console.log("🏥 Seeding Patients...");
    const patients = await Patient.insertMany([
      {
        patientId: "PAT-2026-00001",
        name: "Ramesh Agarwal",
        age: 45,
        gender: "Male",
        phone: "9823011223",
        address: "102 MG Road, Sector 14, Delhi",
        bloodGroup: "O+",
        emergencyContact: { name: "Sunita Agarwal", phone: "9823011224", relation: "Wife" },
        medicalHistory: ["Hypertension", "Type-2 Diabetes"],
        allergies: ["Penicillin"]
      },
      {
        patientId: "PAT-2026-00002",
        name: "Anita Roy",
        age: 34,
        gender: "Female",
        phone: "9823011225",
        address: "45 Park Street, Kolkata",
        bloodGroup: "B+",
        emergencyContact: { name: "Subhash Roy", phone: "9823011226", relation: "Husband" },
        medicalHistory: ["Asthma"],
        allergies: ["Dust", "Pollen"]
      },
      {
        patientId: "PAT-2026-00003",
        name: "Sanjay Gupta",
        age: 58,
        gender: "Male",
        phone: "9823011227",
        address: "78 Civil Lines, Jaipur",
        bloodGroup: "A+",
        emergencyContact: { name: "Anil Gupta", phone: "9823011228", relation: "Son" },
        medicalHistory: ["Coronary Artery Disease"],
        allergies: []
      },
      {
        patientId: "PAT-2026-00004",
        name: "Meera Nair",
        age: 28,
        gender: "Female",
        phone: "9823011229",
        address: "12 Anna Nagar, Chennai",
        bloodGroup: "AB+",
        emergencyContact: { name: "Kiran Nair", phone: "9823011230", relation: "Brother" },
        medicalHistory: ["Migraine"],
        allergies: ["Sulfa drugs"]
      },
      {
        patientId: "PAT-2026-00005",
        name: "Vikram Das",
        age: 62,
        gender: "Male",
        phone: "9823011231",
        address: "89 FC Road, Pune",
        bloodGroup: "O-",
        emergencyContact: { name: "Geeta Das", phone: "9823011232", relation: "Wife" },
        medicalHistory: ["Osteoarthritis"],
        allergies: []
      },
      {
        patientId: "PAT-2026-00006",
        name: "Pooja Malhotra",
        age: 29,
        gender: "Female",
        phone: "9823011233",
        address: "23 Model Town, Ludhiana",
        bloodGroup: "A-",
        emergencyContact: { name: "Rajesh Malhotra", phone: "9823011234", relation: "Father" },
        medicalHistory: [],
        allergies: []
      },
      {
        patientId: "PAT-2026-00007",
        name: "Deepak Chawla",
        age: 50,
        gender: "Male",
        phone: "9823011235",
        address: "67 Ring Road, Surat",
        bloodGroup: "B-",
        emergencyContact: { name: "Reena Chawla", phone: "9823011236", relation: "Wife" },
        medicalHistory: ["Hyperlipidemia"],
        allergies: []
      },
      {
        patientId: "PAT-2026-00008",
        name: "Sunil Deshmukh",
        age: 41,
        gender: "Male",
        phone: "9823011237",
        address: "15 Marine Drive, Mumbai",
        bloodGroup: "AB-",
        emergencyContact: { name: "Varun Deshmukh", phone: "9823011238", relation: "Brother" },
        medicalHistory: ["Chronic Gastritis"],
        allergies: []
      },
      {
        patientId: "PAT-2026-00009",
        name: "Shalini Menon",
        age: 36,
        gender: "Female",
        phone: "9823011239",
        address: "9 MG Road, Bengaluru",
        bloodGroup: "O+",
        emergencyContact: { name: "Ravi Menon", phone: "9823011240", relation: "Husband" },
        medicalHistory: ["Hypothyroidism"],
        allergies: []
      },
      {
        patientId: "PAT-2026-00010",
        name: "Manish Kumar",
        age: 22,
        gender: "Male",
        phone: "9823011241",
        address: "34 Salt Lake, Kolkata",
        bloodGroup: "B+",
        emergencyContact: { name: "Suresh Kumar", phone: "9823011242", relation: "Father" },
        medicalHistory: [],
        allergies: []
      }
    ]);

    console.log("💊 Seeding 1,000 Medicines Inventory...");

    const categoriesList = [
      "Analgesic & Antipyretic", "Antibiotic", "Anti-Diabetic", "Cardiovascular",
      "Gastrointestinal", "Anti-Allergic", "Neurology", "Respiratory",
      "Multivitamins & Supplements", "Ophthalmic & ENT", "Dermatological", "Critical Care & Injections"
    ];
    const mfrsList = ["Cipla", "Sun Pharma", "Dr. Reddy's", "Lupin", "Torrent Pharma", "Zydus Healthcare", "Alkem Labs", "Mankind Pharma", "Glenmark", "Intas Pharmaceuticals", "Abbott India"];

    const baseMeds = [
      { name: "Paracetamol", cat: "Analgesic & Antipyretic", form: "Tablets", price: 30 },
      { name: "Amoxicillin", cat: "Antibiotic", form: "Capsules", price: 75 },
      { name: "Ibuprofen", cat: "Analgesic & Antipyretic", form: "Tablets", price: 45 },
      { name: "Metformin", cat: "Anti-Diabetic", form: "Tablets", price: 50 },
      { name: "Atorvastatin", cat: "Cardiovascular", form: "Tablets", price: 95 },
      { name: "Cetirizine", cat: "Anti-Allergic", form: "Tablets", price: 25 },
      { name: "Omeprazole", cat: "Gastrointestinal", form: "Capsules", price: 60 },
      { name: "Pantoprazole", cat: "Gastrointestinal", form: "Tablets", price: 80 },
      { name: "Azithromycin", cat: "Antibiotic", form: "Tablets", price: 120 },
      { name: "Ciprofloxacin", cat: "Antibiotic", form: "Tablets", price: 90 },
      { name: "Telmisartan", cat: "Cardiovascular", form: "Tablets", price: 85 },
      { name: "Amlodipine", cat: "Cardiovascular", form: "Tablets", price: 40 },
      { name: "Rosuvastatin", cat: "Cardiovascular", form: "Tablets", price: 110 },
      { name: "Losartan", cat: "Cardiovascular", form: "Tablets", price: 70 },
      { name: "Ondansetron", cat: "Gastrointestinal", form: "Tablets", price: 55 },
      { name: "Dexamethasone", cat: "Critical Care & Injections", form: "Injection", price: 45 },
      { name: "Montelukast", cat: "Respiratory", form: "Tablets", price: 105 },
      { name: "Furosemide", cat: "Cardiovascular", form: "Tablets", price: 35 },
      { name: "Spironolactone", cat: "Cardiovascular", form: "Tablets", price: 65 },
      { name: "Glimepiride", cat: "Anti-Diabetic", form: "Tablets", price: 60 },
      { name: "Teneligliptin", cat: "Anti-Diabetic", form: "Tablets", price: 95 },
      { name: "Sitagliptin", cat: "Anti-Diabetic", form: "Tablets", price: 140 },
      { name: "Levothyroxine", cat: "Multivitamins & Supplements", form: "Tablets", price: 150 },
      { name: "Vitamin C", cat: "Multivitamins & Supplements", form: "Tablets", price: 50 },
      { name: "Vitamin D3", cat: "Multivitamins & Supplements", form: "Capsules", price: 180 },
      { name: "Vitamin B-Complex", cat: "Multivitamins & Supplements", form: "Syrup", price: 95 },
      { name: "Calcium Carbonate", cat: "Multivitamins & Supplements", form: "Tablets", price: 120 },
      { name: "Zinc Sulphate", cat: "Multivitamins & Supplements", form: "Tablets", price: 40 },
      { name: "Iron Folic Acid", cat: "Multivitamins & Supplements", form: "Tablets", price: 65 },
      { name: "Rabeprazole", cat: "Gastrointestinal", form: "Tablets", price: 90 },
      { name: "Esomeprazole", cat: "Gastrointestinal", form: "Tablets", price: 115 },
      { name: "Clopidogrel", cat: "Cardiovascular", form: "Tablets", price: 130 },
      { name: "Aspirin", cat: "Cardiovascular", form: "Tablets", price: 20 },
      { name: "Enoxaparin", cat: "Critical Care & Injections", form: "Injection", price: 650 },
      { name: "Heparin", cat: "Critical Care & Injections", form: "Injection", price: 420 },
      { name: "Ceftriaxone", cat: "Critical Care & Injections", form: "Injection", price: 85 },
      { name: "Cefixime", cat: "Antibiotic", form: "Tablets", price: 145 },
      { name: "Cefuroxime", cat: "Antibiotic", form: "Tablets", price: 190 },
      { name: "Meropenem", cat: "Critical Care & Injections", form: "Injection", price: 950 },
      { name: "Amikacin", cat: "Critical Care & Injections", form: "Injection", price: 75 },
      { name: "Tobramycin", cat: "Ophthalmic & ENT", form: "Eye Drops", price: 65 },
      { name: "Ofloxacin", cat: "Ophthalmic & ENT", form: "Eye Drops", price: 55 },
      { name: "Levofloxacin", cat: "Antibiotic", form: "Tablets", price: 110 },
      { name: "Metronidazole", cat: "Antibiotic", form: "Tablets", price: 35 },
      { name: "Fluconazole", cat: "Dermatological", form: "Tablets", price: 80 },
      { name: "Itraconazole", cat: "Dermatological", form: "Capsules", price: 210 },
      { name: "Ketoconazole", cat: "Dermatological", form: "Ointment", price: 125 },
      { name: "Tramadol", cat: "Analgesic & Antipyretic", form: "Injection", price: 60 },
      { name: "Paracetamol + Tramadol", cat: "Analgesic & Antipyretic", form: "Tablets", price: 75 },
      { name: "Diclofenac", cat: "Analgesic & Antipyretic", form: "Tablets", price: 40 },
      { name: "Aceclofenac", cat: "Analgesic & Antipyretic", form: "Tablets", price: 55 },
      { name: "Serratiopeptidase", cat: "Analgesic & Antipyretic", form: "Tablets", price: 85 },
      { name: "Chymoral Forte", cat: "Analgesic & Antipyretic", form: "Tablets", price: 160 },
      { name: "Chlorpheniramine", cat: "Anti-Allergic", form: "Syrup", price: 45 },
      { name: "Hydroxyzine", cat: "Anti-Allergic", form: "Tablets", price: 70 },
      { name: "Levocetirizine", cat: "Anti-Allergic", form: "Tablets", price: 35 },
      { name: "Fexofenadine", cat: "Anti-Allergic", form: "Tablets", price: 115 },
      { name: "Salbutamol", cat: "Respiratory", form: "Syrup", price: 50 },
      { name: "Budesonide", cat: "Respiratory", form: "Respiratory Inhaler", price: 280 },
      { name: "Fluticasone", cat: "Respiratory", form: "Nasal Spray", price: 320 },
      { name: "Nitroglycerin", cat: "Cardiovascular", form: "Tablets", price: 140 },
      { name: "Digoxin", cat: "Cardiovascular", form: "Tablets", price: 45 },
      { name: "Amiodarone", cat: "Cardiovascular", form: "Tablets", price: 190 },
      { name: "Metoprolol", cat: "Cardiovascular", form: "Tablets", price: 75 },
      { name: "Carvedilol", cat: "Cardiovascular", form: "Tablets", price: 85 },
      { name: "Ramipril", cat: "Cardiovascular", form: "Tablets", price: 65 },
      { name: "Lisinopril", cat: "Cardiovascular", form: "Tablets", price: 55 },
      { name: "Chlorthalidone", cat: "Cardiovascular", form: "Tablets", price: 40 },
      { name: "Hydrochlorothiazide", cat: "Cardiovascular", form: "Tablets", price: 30 },
      { name: "Potassium Chloride", cat: "Critical Care & Injections", form: "Syrup", price: 85 },
      { name: "Ursodeoxycholic Acid", cat: "Gastrointestinal", form: "Tablets", price: 320 },
      { name: "Lactulose", cat: "Gastrointestinal", form: "Syrup", price: 175 },
      { name: "Sucralfate", cat: "Gastrointestinal", form: "Syrup", price: 140 },
      { name: "Magaldrate", cat: "Gastrointestinal", form: "Syrup", price: 95 },
      { name: "Domperidone", cat: "Gastrointestinal", form: "Tablets", price: 45 },
      { name: "Itopride", cat: "Gastrointestinal", form: "Tablets", price: 110 },
      { name: "Drotaverine", cat: "Gastrointestinal", form: "Tablets", price: 60 },
      { name: "Loperamide", cat: "Gastrointestinal", form: "Tablets", price: 25 },
      { name: "ORS Sachet", cat: "Gastrointestinal", form: "Powder", price: 20 },
      { name: "Gabapentin", cat: "Neurology", form: "Capsules", price: 180 },
      { name: "Pregabalin", cat: "Neurology", form: "Capsules", price: 210 },
      { name: "Methylcobalamin", cat: "Neurology", form: "Tablets", price: 145 },
      { name: "Alpha Lipoic Acid", cat: "Neurology", form: "Capsules", price: 165 },
      { name: "Folic Acid", cat: "Multivitamins & Supplements", form: "Tablets", price: 30 },
      { name: "Biotin", cat: "Multivitamins & Supplements", form: "Tablets", price: 95 },
      { name: "Coenzyme Q10", cat: "Multivitamins & Supplements", form: "Capsules", price: 380 },
      { name: "Omega-3 Fatty Acids", cat: "Multivitamins & Supplements", form: "Capsules", price: 420 },
      { name: "Protein Powder", cat: "Multivitamins & Supplements", form: "Powder", price: 550 },
      { name: "Glucosamine", cat: "Multivitamins & Supplements", form: "Tablets", price: 290 },
      { name: "Baclofen", cat: "Neurology", form: "Tablets", price: 110 },
      { name: "Thiocolchicoside", cat: "Neurology", form: "Capsules", price: 195 },
      { name: "Allopurinol", cat: "Analgesic & Antipyretic", form: "Tablets", price: 60 },
      { name: "Febuxostat", cat: "Analgesic & Antipyretic", form: "Tablets", price: 140 },
      { name: "Methotrexate", cat: "Critical Care & Injections", form: "Tablets", price: 175 },
      { name: "Deflazacort", cat: "Critical Care & Injections", form: "Tablets", price: 125 },
      { name: "Prednisolone", cat: "Critical Care & Injections", form: "Tablets", price: 45 },
      { name: "Betamethasone", cat: "Dermatological", form: "Ointment", price: 55 },
      { name: "Clobetasol", cat: "Dermatological", form: "Ointment", price: 85 },
      { name: "Clotrimazole", cat: "Dermatological", form: "Ointment", price: 65 },
      { name: "Terbinafine", cat: "Dermatological", form: "Tablets", price: 165 },
      { name: "Mupirocin", cat: "Dermatological", form: "Ointment", price: 145 },
      { name: "Povidone Iodine", cat: "Dermatological", form: "Ointment", price: 75 },
      { name: "Moxifloxacin", cat: "Ophthalmic & ENT", form: "Eye Drops", price: 95 },
      { name: "Timolol", cat: "Ophthalmic & ENT", form: "Eye Drops", price: 70 },
      { name: "Carboxymethylcellulose", cat: "Ophthalmic & ENT", form: "Eye Drops", price: 130 }
    ];

    const strengthsList = ["5mg", "10mg", "20mg", "40mg", "50mg", "100mg", "200mg", "250mg", "400mg", "500mg", "650mg", "1000mg", "1gm", "2gm", "0.5%", "1%", "2%"];
    const generatedMeds = [];

    let medCount = 0;
    for (let i = 0; i < baseMeds.length; i++) {
      for (let s = 0; s < strengthsList.length; s++) {
        if (medCount >= 1000) break;
        const b = baseMeds[i];
        const str = strengthsList[s];
        const mfr = mfrsList[medCount % mfrsList.length];
        const price = b.price + (s * 4);
        generatedMeds.push({
          name: `${b.name} ${str}`,
          genericName: b.name,
          category: b.cat,
          manufacturer: mfr,
          batchNumber: `${b.name.slice(0, 3).toUpperCase()}-2026-${(medCount + 101).toString().padStart(4, "0")}`,
          expiryDate: new Date(2027 + (medCount % 2), medCount % 12, 15),
          purchasePrice: Math.floor(price * 0.5),
          sellingPrice: price,
          stockQuantity: 50 + ((medCount * 19) % 450),
          minimumStock: 20,
          unit: b.form
        });
        medCount++;
      }
      if (medCount >= 1000) break;
    }

    const medicines = await Medicine.insertMany(generatedMeds);

    console.log("🔬 Seeding 20 Blood Laboratory Diagnostic Tests...");
    const labCatalog = await LabTest.insertMany([
      {
        testCode: "LT-BLOOD-001",
        name: "Complete Blood Count (CBC with ESR)",
        category: "Haematology",
        sampleType: "Whole Blood (EDTA)",
        turnaroundTime: "4 Hours",
        price: 350,
        description: "Evaluates Hemoglobin, RBC, WBC, Platelets, MCV, MCH, and Erythrocyte Sedimentation Rate.",
        referenceRange: "Hb: 12.0-16.5 g/dL, WBC: 4,000-11,000 /cu.mm, Platelets: 1.5-4.5 Lakhs/cu.mm"
      },
      {
        testCode: "LT-BLOOD-002",
        name: "Fasting Blood Sugar (FBS)",
        category: "Biochemistry",
        sampleType: "Fluoride Plasma",
        turnaroundTime: "2 Hours",
        price: 100,
        description: "Measures blood glucose concentration after 8-12 hours of overnight fasting.",
        referenceRange: "70 - 99 mg/dL (Normal)"
      },
      {
        testCode: "LT-BLOOD-003",
        name: "Post Prandial Blood Sugar (PPBS)",
        category: "Biochemistry",
        sampleType: "Fluoride Plasma",
        turnaroundTime: "2 Hours",
        price: 100,
        description: "Measures blood glucose 2 hours after a standard meal.",
        referenceRange: "< 140 mg/dL (Normal)"
      },
      {
        testCode: "LT-BLOOD-004",
        name: "HbA1c (Glycated Hemoglobin)",
        category: "Biochemistry",
        sampleType: "Whole Blood (EDTA)",
        turnaroundTime: "6 Hours",
        price: 500,
        description: "Measures average blood sugar control over the past 3 months.",
        referenceRange: "< 5.7% (Normal), 5.7%-6.4% (Prediabetes), >= 6.5% (Diabetic)"
      },
      {
        testCode: "LT-BLOOD-005",
        name: "Lipid Profile (Comprehensive)",
        category: "Biochemistry",
        sampleType: "Serum",
        turnaroundTime: "6 Hours",
        price: 650,
        description: "Measures Total Cholesterol, HDL, LDL, VLDL, and Triglycerides.",
        referenceRange: "Total Chol: <200 mg/dL, Triglycerides: <150 mg/dL, HDL: >40 mg/dL"
      },
      {
        testCode: "LT-BLOOD-006",
        name: "Kidney Function Test (KFT / RFT)",
        category: "Biochemistry",
        sampleType: "Serum",
        turnaroundTime: "4 Hours",
        price: 700,
        description: "Evaluates Serum Creatinine, Blood Urea Nitrogen (BUN), Uric Acid, and Electrolytes.",
        referenceRange: "Serum Creatinine: 0.6-1.2 mg/dL, Blood Urea: 15-40 mg/dL"
      },
      {
        testCode: "LT-BLOOD-007",
        name: "Liver Function Test (LFT)",
        category: "Biochemistry",
        sampleType: "Serum",
        turnaroundTime: "4 Hours",
        price: 750,
        description: "Assesses Bilirubin (Total/Direct), SGOT (AST), SGPT (ALT), Alkaline Phosphatase, Total Protein, and Albumin.",
        referenceRange: "SGPT: 7-56 U/L, SGOT: 10-40 U/L, Bilirubin Total: 0.2-1.2 mg/dL"
      },
      {
        testCode: "LT-BLOOD-008",
        name: "Thyroid Profile Total (T3, T4, TSH)",
        category: "Endocrinology",
        sampleType: "Serum",
        turnaroundTime: "6 Hours",
        price: 600,
        description: "Screening test for thyroid disorders (Hypothyroidism & Hyperthyroidism).",
        referenceRange: "TSH: 0.4-4.2 uIU/mL, Total T3: 80-200 ng/dL, Total T4: 5.1-14.1 ug/dL"
      },
      {
        testCode: "LT-BLOOD-009",
        name: "Serum Electrolytes (Na+, K+, Cl-)",
        category: "Biochemistry",
        sampleType: "Serum",
        turnaroundTime: "2 Hours",
        price: 450,
        description: "Measures Sodium, Potassium, and Chloride levels for fluid balance.",
        referenceRange: "Sodium: 136-145 mEq/L, Potassium: 3.5-5.1 mEq/L, Chloride: 98-107 mEq/L"
      },
      {
        testCode: "LT-BLOOD-010",
        name: "Vitamin D3 (25-Hydroxy Vitamin D)",
        category: "Biochemistry",
        sampleType: "Serum",
        turnaroundTime: "12 Hours",
        price: 1200,
        description: "Quantitative measurement of 25-OH Vitamin D for bone and immune health.",
        referenceRange: "30 - 100 ng/mL (Sufficient)"
      },
      {
        testCode: "LT-BLOOD-011",
        name: "Vitamin B12 (Cyanocobalamin)",
        category: "Biochemistry",
        sampleType: "Serum",
        turnaroundTime: "12 Hours",
        price: 950,
        description: "Measures Vitamin B12 levels for nerve function and red blood cell production.",
        referenceRange: "211 - 911 pg/mL"
      },
      {
        testCode: "LT-BLOOD-012",
        name: "Dengue NS1 Antigen & IgM/IgG Antibody",
        category: "Serology / Microbiology",
        sampleType: "Serum",
        turnaroundTime: "3 Hours",
        price: 850,
        description: "Rapid immunochromatographic screen for early Dengue viral infection.",
        referenceRange: "Negative"
      },
      {
        testCode: "LT-BLOOD-013",
        name: "Typhoid Widal Antigen Screen",
        category: "Serology",
        sampleType: "Serum",
        turnaroundTime: "4 Hours",
        price: 300,
        description: "Slide and tube agglutination test for Salmonella Typhi (Enteric Fever).",
        referenceRange: "TO & TH Titer < 1:80 (Negative)"
      },
      {
        testCode: "LT-BLOOD-014",
        name: "Blood Grouping & Rh Factor Typing",
        category: "Immunohematology",
        sampleType: "Whole Blood (EDTA)",
        turnaroundTime: "1 Hour",
        price: 150,
        description: "Determines ABO blood group and Rhesus (Rh D) factor status.",
        referenceRange: "A / B / AB / O (Rh Positive or Negative)"
      },
      {
        testCode: "LT-BLOOD-015",
        name: "C-Reactive Protein (Hs-CRP Quantitative)",
        category: "Serology",
        sampleType: "Serum",
        turnaroundTime: "3 Hours",
        price: 550,
        description: "High-sensitivity inflammatory biomarker for cardiac risk and acute infection.",
        referenceRange: "< 3.0 mg/L (Low Risk)"
      },
      {
        testCode: "LT-BLOOD-016",
        name: "Cardiac Biomarker Troponin-I",
        category: "Critical Care Diagnostics",
        sampleType: "Serum / Whole Blood",
        turnaroundTime: "1 Hour",
        price: 1400,
        description: "Emergency cardiac enzyme marker for acute myocardial infarction (Heart Attack).",
        referenceRange: "< 0.04 ng/mL (Negative)"
      },
      {
        testCode: "LT-BLOOD-017",
        name: "Urine Routine & Microscopic Examination",
        category: "Clinical Pathology",
        sampleType: "Fresh Random Urine",
        turnaroundTime: "2 Hours",
        price: 200,
        description: "Physical, chemical, and microscopic examination for UTI, proteinuria, and hematuria.",
        referenceRange: "Pus cells: 0-4 /hpf, Protein: Nil, Glucose: Nil"
      },
      {
        testCode: "LT-BLOOD-018",
        name: "Prothrombin Time & INR (PT/INR)",
        category: "Haematology / Coagulation",
        sampleType: "Citrated Plasma",
        turnaroundTime: "2 Hours",
        price: 400,
        description: "Assesses extrinsic coagulation pathway and monitors Warfarin / Anticoagulant therapy.",
        referenceRange: "Control: 11-13.5 sec, INR: 0.8-1.2"
      },
      {
        testCode: "LT-BLOOD-019",
        name: "Serum Calcium & Phosphorus Test",
        category: "Biochemistry",
        sampleType: "Serum",
        turnaroundTime: "4 Hours",
        price: 350,
        description: "Evaluates bone mineral metabolism, parathyroid function, and renal insufficiency.",
        referenceRange: "Calcium: 8.5-10.5 mg/dL, Phosphorus: 2.5-4.5 mg/dL"
      },
      {
        testCode: "LT-BLOOD-020",
        name: "Arterial Blood Gas (ABG Analysis)",
        category: "Critical Care Diagnostics",
        sampleType: "Heparinized Arterial Blood",
        turnaroundTime: "30 Minutes",
        price: 900,
        description: "Measures pH, PaO2, PaCO2, HCO3-, and Oxygen Saturation in arterial blood for ICU patients.",
        referenceRange: "pH: 7.35-7.45, PaO2: 80-100 mmHg, PaCO2: 35-45 mmHg, HCO3: 22-26 mEq/L"
      }
    ]);

    console.log("🛏️ Seeding Wards & Beds...");
    await Bed.insertMany([
      { bedNumber: "G-101", ward: "General Ward", bedType: "General", chargePerDay: 500, status: "Occupied", assignedPatient: patients[0]._id },
      { bedNumber: "G-102", ward: "General Ward", bedType: "General", chargePerDay: 500, status: "Available" },
      { bedNumber: "G-103", ward: "General Ward", bedType: "General", chargePerDay: 500, status: "Available" },
      { bedNumber: "SP-201", ward: "Semi-Private Ward", bedType: "Semi-Private", chargePerDay: 1200, status: "Available" },
      { bedNumber: "SP-202", ward: "Semi-Private Ward", bedType: "Semi-Private", chargePerDay: 1200, status: "Occupied", assignedPatient: patients[2]._id },
      { bedNumber: "ICU-301", ward: "ICU", bedType: "ICU", chargePerDay: 3500, status: "Available" }
    ]);

    console.log("📅 Seeding Appointments...");
    const today = new Date();

    const appt1 = await Appointment.create({
      appointmentId: "APT-2026-00001",
      patient: patients[0]._id,
      doctor: doctor1._id,
      department: deptMap["Cardiology"],
      date: today,
      time: "09:30 AM",
      tokenNumber: "A-001",
      reason: "Routine Chest Pain Evaluation & BP Check",
      status: "Checked-In",
      createdBy: users[4]._id
    });

    const appt2 = await Appointment.create({
      appointmentId: "APT-2026-00002",
      patient: patients[1]._id,
      doctor: doctor2._id,
      department: deptMap["Neurology"],
      date: today,
      time: "10:30 AM",
      tokenNumber: "A-002",
      reason: "Chronic Headache & Dizziness",
      status: "Scheduled",
      createdBy: users[4]._id
    });

    const appt3 = await Appointment.create({
      appointmentId: "APT-2026-00003",
      patient: patients[2]._id,
      doctor: doctor3._id,
      department: deptMap["General Medicine"],
      date: today,
      time: "11:00 AM",
      tokenNumber: "A-003",
      reason: "Fever & Cough Consultation",
      status: "Completed",
      createdBy: users[4]._id
    });

    console.log("📋 Seeding Consultations, Prescriptions, Lab Requests, Lab Results & Bills...");

    // Consultation for Appt 3
    const consult3 = await Consultation.create({
      appointment: appt3._id,
      patient: patients[2]._id,
      doctor: doctor3._id,
      chiefComplaint: "High fever (102°F) and dry cough for 3 days.",
      symptoms: "Body pain, chills, loss of appetite",
      vitals: { bloodPressure: "130/85", heartRate: "88 bpm", temperature: "101.4 °F", weight: "72 kg", height: "172 cm" },
      diagnosis: "Acute Viral Bronchitis & Fever",
      clinicalNotes: "Patient prescribed anti-pyretics and broad-spectrum antibiotic. Advised 3 days bed rest.",
      treatmentPlan: "Complete 5-day antibiotic course, stay hydrated."
    });

    // Prescription for Consult 3
    const rx3 = await Prescription.create({
      prescriptionId: "RX-2026-00001",
      consultation: consult3._id,
      appointment: appt3._id,
      patient: patients[2]._id,
      doctor: doctor3._id,
      medicines: [
        { medicine: medicines[0]._id, medicineName: "Paracetamol 650mg", dosage: "650mg", frequency: "1-1-1", duration: "3 Days", quantity: 9, instructions: "After food" },
        { medicine: medicines[1]._id, medicineName: "Amoxicillin 500mg", dosage: "500mg", frequency: "1-0-1", duration: "5 Days", quantity: 10, instructions: "After food" }
      ],
      status: "Pending"
    });

    // Lab Request for Consult 3
    const labReq3 = await LabRequest.create({
      requestId: "LAB-REQ-2026-00001",
      patient: patients[2]._id,
      doctor: doctor3._id,
      appointment: appt3._id,
      consultation: consult3._id,
      testName: "Complete Blood Count (CBC)",
      priority: "Normal",
      clinicalNotes: "Rule out secondary bacterial infection",
      status: "Completed",
      sampleId: "LAB-SMP-2026-00001",
      sampleType: "Whole Blood",
      collectedBy: users[8]._id,
      collectedAt: new Date()
    });

    // Lab Result for LabReq 3
    await LabResult.create({
      resultId: "LAB-RES-2026-00001",
      labRequest: labReq3._id,
      patient: patients[2]._id,
      doctor: doctor3._id,
      testName: "Complete Blood Count (CBC)",
      findings: [
        { parameter: "Hemoglobin (Hb)", value: "14.2", referenceRange: "13.5 - 17.5", unit: "g/dL", isAbnormal: false },
        { parameter: "Total WBC Count", value: "11,800", referenceRange: "4,000 - 11,000", unit: "/µL", isAbnormal: true },
        { parameter: "Platelet Count", value: "245,000", referenceRange: "150,000 - 450,000", unit: "/µL", isAbnormal: false }
      ],
      remarks: "Mildly elevated WBC count consistent with viral/bacterial response.",
      technician: users[8]._id,
      status: "Finalized"
    });

    // Bill for Appt 3
    await Bill.create({
      invoiceNumber: "INV-2026-00001",
      patient: patients[2]._id,
      appointment: appt3._id,
      services: [
        { name: "General Consultation (Dr. Vikram Singh)", category: "Consultation", price: 500, quantity: 1, amount: 500 },
        { name: "Complete Blood Count (CBC)", category: "Laboratory", price: 350, quantity: 1, amount: 350 },
        { name: "Prescription Medicines", category: "Medicines", price: 250, quantity: 1, amount: 250 }
      ],
      subtotal: 1100,
      discount: 100,
      tax: 0,
      total: 1000,
      paidAmount: 1000,
      paymentStatus: "Paid",
      paymentMethod: "UPI",
      generatedBy: users[4]._id
    });

    console.log("🔔 Seeding Notifications & Audit Logs...");
    await Notification.create({
      recipient: doctor1._id.toString(),
      title: "Patient Checked-In",
      message: `Patient Ramesh Agarwal (PAT-2026-00001) has checked in. Token: A-001`,
      type: "appointment"
    });

    await Notification.create({
      recipient: "PHARMACIST",
      title: "Low Stock Alert",
      message: "Medicine Cetirizine 10mg is below minimum threshold (8 remaining).",
      type: "inventory"
    });

    await AuditLog.create({
      user: users[0]._id,
      userName: users[0].name,
      userRole: users[0].role,
      action: "SEED_DATABASE",
      module: "SYSTEM",
      details: "Initial system seeding completed successfully."
    });

    console.log("✅ Database Seeding Completed Successfully!");
    console.log("\n==============================================");
    console.log("🔑 DEMO LOGIN CREDENTIALS:");
    console.log("----------------------------------------------");
    console.log("1. ADMIN        -> sujitmalla000@gmail.com   / capitalseva@2026 (EmpId: EMP-ADM-001)");
    console.log("2. DOCTOR       -> doctor1@hospital.com     / doc123    (EmpId: EMP-DOC-001)");
    console.log("3. RECEPTIONIST -> receptionist1@hospital.com / rec123  (EmpId: EMP-REC-001)");
    console.log("4. PHARMACIST   -> pharmacist1@hospital.com / pharm123  (EmpId: EMP-PHAR-001)");
    console.log("5. LABORATORY   -> labtech1@hospital.com    / lab123    (EmpId: EMP-LAB-001)");
    console.log("==============================================\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    process.exit(1);
  }
};

seedDatabase();
