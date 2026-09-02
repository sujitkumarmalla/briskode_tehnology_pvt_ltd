import Department from "../models/Department.js";
import User from "../models/User.js";

export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find({ isActive: true }).populate("head", "name empId specialization");
    
    // Attach doctor counts to each department
    const departmentsWithStats = await Promise.all(
      departments.map(async (dept) => {
        const doctorCount = await User.countDocuments({ department: dept._id, role: "DOCTOR", isActive: true });
        return {
          ...dept.toObject(),
          doctorCount
        };
      })
    );

    return res.status(200).json({ success: true, count: departmentsWithStats.length, departments: departmentsWithStats });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createDepartment = async (req, res) => {
  try {
    const { name, description, head } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Department name is required." });
    }

    const existing = await Department.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({ message: "Department already exists." });
    }

    const department = await Department.create({
      name: name.trim(),
      description,
      head: head || undefined
    });

    return res.status(201).json({ success: true, message: "Department created.", department });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findByIdAndUpdate(id, req.body, { new: true });
    if (!department) {
      return res.status(404).json({ message: "Department not found." });
    }
    return res.status(200).json({ success: true, message: "Department updated.", department });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({ message: "Department not found." });
    }
    department.isActive = false;
    await department.save();
    return res.status(200).json({ success: true, message: "Department deactivated." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
