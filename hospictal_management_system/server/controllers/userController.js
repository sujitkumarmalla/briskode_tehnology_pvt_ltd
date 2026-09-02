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
          id: docCount + 100,
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
      await Doctor.findOneAndUpdate(
        { email: user.email },
        {
          name: user.name,
          phone: user.phone,
          specialization: user.specialization,
          qualification: user.qualification,
          consultationFee: user.consultationFee
        }
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
