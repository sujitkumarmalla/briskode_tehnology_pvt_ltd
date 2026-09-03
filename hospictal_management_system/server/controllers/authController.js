import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import AuditLog from "../models/AuditLog.js";

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email/Employee ID and password." });
    }

    const trimmedInput = email.trim();
    // Support login by email or empId
    const user = await User.findOne({
      $or: [
        { email: trimmedInput.toLowerCase() },
        { empId: trimmedInput.toUpperCase() }
      ]
    }).populate("department", "name");

    if (!user) {
      return res.status(401).json({ message: "Invalid email/Employee ID or password." });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "Account is inactive. Please contact Hospital Admin." });
    }

    // Role Validation Check
    if (role && role.trim().length > 0) {
      const selectedRoleUpper = role.trim().toUpperCase();
      const userRoleUpper = user.role?.toUpperCase();

      if (userRoleUpper !== selectedRoleUpper) {
        return res.status(400).json({
          message: `Role mismatch: Selected role '${selectedRoleUpper}' does not match account role '${userRoleUpper}'. Please select '${userRoleUpper}' to sign in.`
        });
      }
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email/Employee ID or password." });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, empId: user.empId },
      process.env.JWT_SECRET || "capitalseva-super-secret-key-2026",
      { expiresIn: "1d" }
    );

    // Audit log
    await AuditLog.create({
      user: user._id,
      userName: user.name,
      userRole: user.role,
      action: "LOGIN",
      module: "AUTH",
      details: `User logged in as ${user.role} (${user.empId})`
    }).catch(err => console.error("Audit log error:", err.message));

    return res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        empId: user.empId,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        department: user.department,
        specialization: user.specialization,
        qualification: user.qualification,
        workingHours: user.workingHours,
        consultationFee: user.consultationFee,
        profileImage: user.profileImage,
        isActive: user.isActive
      }
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password").populate("department", "name");
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, phone, specialization, qualification, availableDays, workingHours, password } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (specialization) user.specialization = specialization;
    if (qualification) user.qualification = qualification;
    if (availableDays) user.availableDays = availableDays;
    if (workingHours) user.workingHours = workingHours;

    if (password && password.trim().length > 0) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    return res.status(200).json({ success: true, message: "Profile updated successfully.", user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
