import Notification from "../models/Notification.js";

export const getNotifications = async (req, res) => {
  try {
    const userRole = req.user.role;
    const userId = req.user._id.toString();

    const notifications = await Notification.find({
      $or: [
        { recipient: userRole },
        { recipient: userId },
        { recipient: "ALL" }
      ]
    })
      .sort({ createdAt: -1 })
      .limit(30);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return res.status(200).json({ success: true, unreadCount, notifications });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    if (id === "all") {
      await Notification.updateMany(
        { $or: [{ recipient: req.user.role }, { recipient: req.user._id.toString() }] },
        { isRead: true }
      );
    } else {
      await Notification.findByIdAndUpdate(id, { isRead: true });
    }
    return res.status(200).json({ success: true, message: "Notification marked read." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
