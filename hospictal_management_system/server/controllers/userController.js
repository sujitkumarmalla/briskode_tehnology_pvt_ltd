import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Doctor from "../models/Doctor.js";
import Department from "../models/Department.js";
import { generateEmpId } from "../utils/generateId.js";
import AuditLog from "../models/AuditLog.js";

export const getStaff = async (req, res) => {
  try {
    const { role, department, search } = req.query;
    let filter = {};

    if (role) {
      filter.role = role.toUpperCase();
    }
    if (department) {
      filter.department = department;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { empId: { $regex: search, $options: "i" } },
        { specialization: { $regex: search, $options: "i" } }
      ];
    }

    const staff = await User.find(filter)
      .select("-password")
      .populate("department", "name")
      .sort({ createdAt: -1 });

    if (role && role.toUpperCase() === "DOCTOR") {
      const docDocs = await Doctor.find().sort({ createdAt: -1 });
      const staffMap = new Map();

      // First add from Doctor model
      docDocs.forEach((d) => {
        const key = d.email ? d.email.toLowerCase().trim() : String(d.id || d._id);
        staffMap.set(key, {
          _id: d._id,
          id: d.id || d._id,
          empId: `DOC${String(d.id || 100).substring(0, 3)}`,
          name: d.name,
          email: d.email || "",
          phone: d.phone || "",
          role: "DOCTOR",
          specialization: d.specialization || "General Specialist",
          department: typeof d.department === "object" ? d.department : { name: d.department || "General Medicine" },
          qualification: d.qualification || "MBBS, MD",
          experience: d.experience || 5,
          consultationFee: d.consultationFee || 500,
          workingHours: d.availability || "09:00 AM - 05:00 PM",
          profileImage: d.image || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200",
          isActive: d.status === "Available"
        });
      });

      // Merge from User collection (where role === 'DOCTOR')
      staff.forEach((u) => {
        const key = u.email ? u.email.toLowerCase().trim() : String(u._id);
        const existing = staffMap.get(key) || {};
        staffMap.set(key, {
          ...existing,
          ...u.toObject(),
          department: u.department || existing.department || { name: "General Medicine" }
        });
      });

      const combinedStaff = Array.from(staffMap.values());
      return res.status(200).json({ success: true, count: combinedStaff.length, staff: combinedStaff });
    }

    return res.status(200).json({ success: true, count: staff.length, staff });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createStaff = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      role,
      department,
      specialization,
      qualification,
      experience,
      consultationFee,
      availableDays,
      workingHours,
      profileImage
    } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Name, email, password, and role are required." });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    const roleUpper = role.toUpperCase();
    const count = await User.countDocuments({ role: roleUpper });
    const empId = generateEmpId(roleUpper, count);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      empId,
      name,
      email: email.toLowerCase().trim(),
      phone,
      password: hashedPassword,
      role: roleUpper,
      department: (department && department !== "" && department !== "null") ? department : undefined,
      specialization,
      qualification,
      experience,
      consultationFee: consultationFee || 0,
      availableDays: availableDays || ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      workingHours: workingHours || "09:00 AM - 05:00 PM",
      profileImage: profileImage || undefined,
      isActive: true
    });

    // Also persist into 'doctors' collection so MongoDB Atlas 'doctors' collection is 100% in sync!
    if (roleUpper === "DOCTOR") {
      try {
        const docCount = await Doctor.countDocuments();
        let deptName = "General Medicine";
        if (department && department !== "" && department !== "null") {
          const dObj = await Department.findById(department);
          if (dObj) deptName = dObj.name;
        }
        await Doctor.create({
          id: Date.now() + Math.floor(Math.random() * 1000),
          name: user.name,
          specialization: specialization || "Consultant Specialist",
          department: deptName,
          qualification: qualification || "MBBS, MD",
          experience: typeof experience === "number" ? experience : (parseInt(experience) || 10),
          availability: availableDays ? availableDays.join(", ") : "Mon, Tue, Wed, Thu, Fri",
          status: "Available",
          rating: 4.9,
          consultationFee: consultationFee || 800,
          email: user.email,
          phone: phone || "+91 98765 43210",
          image: profileImage || "/images/dr_default.jpg",
          bio: `${user.name} is a senior consultant specialist at Briskode Public Hospital.`
        });
      } catch (docErr) {
        console.error("Doctor collection sync notice:", docErr.message);
      }
    }

    await AuditLog.create({
      user: req.user?._id,
      userName: req.user?.name || "Admin",
      userRole: req.user?.role || "ADMIN",
      action: "CREATE_STAFF",
      module: "STAFF_MANAGEMENT",
      details: `Created ${roleUpper} account: ${user.name} (${user.empId})`
    }).catch(err => console.error(err.message));

    const populatedUser = await User.findById(user._id).select("-password").populate("department", "name");

    return res.status(201).json({
      success: true,
      message: `${roleUpper} created successfully. Employee ID: ${empId}`,
      user: populatedUser
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      phone,
      role,
      department,
      specialization,
      qualification,
      experience,
      consultationFee,
      availableDays,
      workingHours,
      isActive,
      password
    } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Staff member not found." });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (role) user.role = role.toUpperCase();
    if (department !== undefined) {
      user.department = (department && department !== "" && department !== "null") ? department : null;
    }
    if (specialization !== undefined) user.specialization = specialization;
    if (qualification !== undefined) user.qualification = qualification;
    if (experience !== undefined) user.experience = experience;
    if (consultationFee !== undefined) user.consultationFee = consultationFee;
    if (availableDays) user.availableDays = availableDays;
    if (workingHours) user.workingHours = workingHours;
    if (isActive !== undefined) user.isActive = isActive;

    if (password && password.trim().length > 0) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    // Also sync update into 'doctors' collection
    if (user.role === "DOCTOR") {
      let deptName = "General Medicine";
      if (user.department) {
        const dObj = await Department.findById(user.department).catch(() => null);
        if (dObj) deptName = dObj.name;
      }
      await Doctor.findOneAndUpdate(
        { email: user.email },
        {
          id: Date.now() + Math.floor(Math.random() * 1000),
          name: user.name,
          email: user.email,
          phone: user.phone,
          specialization: user.specialization || "General Specialist",
          department: deptName,
          qualification: user.qualification || "MBBS, MD",
          experience: Number(user.experience) || 5,
          consultationFee: user.consultationFee || 500,
          availability: user.workingHours || "09:00 AM - 05:00 PM",
          status: user.isActive ? "Available" : "On Leave",
          image: user.profileImage || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200"
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ).catch(err => console.error("Doctor collection sync update notice:", err.message));
    }

    await AuditLog.create({
      user: req.user?._id,
      userName: req.user?.name || "Admin",
      userRole: req.user?.role || "ADMIN",
      action: "UPDATE_STAFF",
      module: "STAFF_MANAGEMENT",
      details: `Updated ${user.role} account: ${user.name} (${user.empId})`
    }).catch(err => console.error(err.message));

    const updated = await User.findById(id).select("-password").populate("department", "name");
    return res.status(200).json({ success: true, message: "Staff updated successfully.", user: updated });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Staff member not found." });
    }

    if (user.role === "DOCTOR") {
      await Doctor.findOneAndDelete({ email: user.email }).catch(err => console.error(err.message));
    }

    await User.findByIdAndDelete(id);

    await AuditLog.create({
      user: req.user?._id,
      userName: req.user?.name || "Admin",
      userRole: req.user?.role || "ADMIN",
      action: "DELETE_STAFF",
      module: "STAFF_MANAGEMENT",
      details: `Deleted ${user.role} account: ${user.name} (${user.empId})`
    }).catch(err => console.error(err.message));

    return res.status(200).json({ success: true, message: "Staff deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
