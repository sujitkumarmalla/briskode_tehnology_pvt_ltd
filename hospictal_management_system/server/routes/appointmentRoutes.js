import express from "express";
import { getAppointments, createAppointment, checkInAppointment, updateAppointmentStatus } from "../controllers/appointmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getAppointments);
router.post("/", createAppointment);
router.put("/:id/check-in", checkInAppointment);
router.put("/:id/status", updateAppointmentStatus);

export default router;
