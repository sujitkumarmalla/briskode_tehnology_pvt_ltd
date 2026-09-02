import AuditLog from "../models/AuditLog.js";

export const getAuditLogs = async (req, res) => {
  try {
    const { module, action, search } = req.query;
    let filter = {};

    if (module) filter.module = module;
    if (action) filter.action = action;
    if (search) {
      filter.$or = [
        { userName: { $regex: search, $options: "i" } },
        { userRole: { $regex: search, $options: "i" } },
        { details: { $regex: search, $options: "i" } }
      ];
    }

    const logs = await AuditLog.find(filter)
      .populate("user", "name empId role")
      .sort({ createdAt: -1 })
      .limit(100);

    return res.status(200).json({ success: true, count: logs.length, logs });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
