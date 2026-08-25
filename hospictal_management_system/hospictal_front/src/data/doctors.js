export const doctors = [
  {
    id: 1,
    name: "Dr. Arvind Kapoor",
    specialization: "Senior Cardiologist",
    department: "Cardiology",
    qualification: "MBBS, MD, DM (Cardiology)",
    experience: 22,
    availability: "Mon, Wed, Fri",
    status: "Available",
    rating: 4.9,
    consultationFee: 1000,
    email: "arvind.kapoor@capitalpublicseva.com",
    phone: "+91 77878 14476", // Redirecting inquiries to this number as requested
    image: "/images/dr_kapoor.jpg",
    bio: "Dr. Arvind Kapoor is a pioneer in interventional cardiology with over 22 years of clinical excellence. He specializes in coronary angioplasty, pacemaker installations, and heart failure management.",
    certifications: [
      "Board Certified in Cardiovascular Disease",
      "Fellow of the American College of Cardiology (FACC)",
      "Lifetime Member of Cardiological Society of India"
    ],
    reviews: [
      { name: "Suresh Patel", rating: 5, comment: "Dr. Kapoor saved my father's life during an emergency cardiac arrest. His quick actions and expertise are unparalleled." },
      { name: "Meena Joshi", rating: 4.8, comment: "Very polite and explains the medical condition clearly. Excellent doctor." }
    ]
  },
  {
    id: 2,
    name: "Dr. Ananya Mehta",
    specialization: "Senior Neurologist",
    department: "Neurology",
    qualification: "MBBS, MD, DM (Neurology)",
    experience: 15,
    availability: "Tue, Thu, Sat",
    status: "Available",
    rating: 4.8,
    consultationFee: 900,
    email: "ananya.mehta@capitalpublicseva.com",
    phone: "+91 77878 14476",
    image: "/images/dr_mehta.jpg",
    bio: "Dr. Ananya Mehta is a highly experienced neurologist who specializes in migraine management, epilepsy treatment, stroke rehabilitation, and complex brain disorders.",
    certifications: [
      "Diplomate of American Board of Psychiatry & Neurology",
      "Active Member of Indian Academy of Neurology"
    ],
    reviews: [
      { name: "Rahul Verma", rating: 5, comment: "Highly professional. Her treatment plan for my migraine worked like magic after years of suffering." }
    ]
  },
  {
    id: 3,
    name: "Dr. Preeti Reddy",
    specialization: "Senior Pediatrician",
    department: "Pediatrics",
    qualification: "MBBS, MD (Pediatrics), DCH",
    experience: 10,
    availability: "Mon, Tue, Thu, Fri",
    status: "Available",
    rating: 4.9,
    consultationFee: 700,
    email: "preeti.reddy@capitalpublicseva.com",
    phone: "+91 77878 14476",
    image: "/images/dr_reddy.jpg",
    bio: "Dr. Preeti Reddy has a warm, kid-friendly approach to healthcare. She manages newborn health, childhood vaccinations, asthma, and pediatric diet plans.",
    certifications: [
      "Board Certified Pediatrician",
      "Member of Indian Academy of Pediatrics"
    ],
    reviews: [
      { name: "Kirti Sen", rating: 5, comment: "My kids absolutely love Dr. Preeti. She is so gentle and answers all our parental anxieties patiently." }
    ]
  },
  {
    id: 4,
    name: "Dr. Vikram Verma",
    specialization: "Orthopedic Surgeon",
    department: "Orthopedics",
    qualification: "MBBS, MS (Orthopedics), M.Ch",
    experience: 14,
    availability: "Wed, Thu, Sat",
    status: "Busy",
    rating: 4.7,
    consultationFee: 850,
    email: "vikram.verma@capitalpublicseva.com",
    phone: "+91 77878 14476",
    image: "/images/dr_verma.jpg",
    bio: "Dr. Vikram Verma is an expert in joint replacement and arthroscopic surgeries. He specializes in sports injuries, knee/hip reconstruction, and advanced trauma rehabilitation.",
    certifications: [
      "Fellowship in Joint Replacement Surgery (Germany)",
      "Member of Indian Orthopaedic Association"
    ],
    reviews: [
      { name: "Amit Sharma", rating: 4.5, comment: "Excellent knee replacement surgery. I can walk pain-free now after 5 years." }
    ]
  },
  {
    id: 5,
    name: "Dr. Rajesh Kumar",
    specialization: "Consultant Dermatologist",
    department: "Dermatology",
    qualification: "MBBS, MD (Dermatology)",
    experience: 12,
    availability: "Mon, Wed, Fri",
    status: "Available",
    rating: 4.9,
    consultationFee: 800,
    email: "rajesh.kumar@capitalpublicseva.com",
    phone: "+91 77878 14476",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400", // fallback high-quality doctor image
    bio: "Dr. Rajesh Kumar is specialized in clinical dermatology, medical aesthetics, and laser skin treatments. He treats skin, hair, and nail conditions for all ages.",
    certifications: [
      "Certified in Medical Aesthetics",
      "Member of Indian Association of Dermatologists"
    ],
    reviews: [
      { name: "Priya Das", rating: 5, comment: "Best dermatologist. He treated my severe acne issues effectively with very minimal medications." }
    ]
  },
  {
    id: 6,
    name: "Dr. Sunita Sharma",
    specialization: "Senior Gynecologist",
    department: "Gynecology",
    qualification: "MBBS, MD (Obstetrics & Gynecology)",
    experience: 18,
    availability: "Tue, Wed, Thu, Sat",
    status: "On Leave",
    rating: 4.8,
    consultationFee: 950,
    email: "sunita.sharma@capitalpublicseva.com",
    phone: "+91 77878 14476",
    image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400", // fallback high-quality doctor image
    bio: "Dr. Sunita Sharma has extensive experience in high-risk pregnancy management, laproscopic gynecological surgeries, and infertility treatments.",
    certifications: [
      "Fellowship in Laparoscopic Surgery",
      "Member of Federation of Obstetric and Gynaecological Societies of India"
    ],
    reviews: [
      { name: "Neha Rastogi", rating: 5, comment: "I had a safe and smooth delivery under her care. She is extremely supportive." }
    ]
  }
];
