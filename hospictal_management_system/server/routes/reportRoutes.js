import express from "express";
import {
  getAdminDashboardStats,
  getDoctorDashboardStats,
  getReceptionistDashboardStats,
  getPharmacyDashboardStats,
  getLabDashboardStats
} from "../controllers/reportController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/admin", authorizeRoles("ADMIN"), getAdminDashboardStats);
router.get("/doctor", authorizeRoles("DOCTOR", "ADMIN"), getDoctorDashboardStats);
router.get("/receptionist", authorizeRoles("RECEPTIONIST", "ADMIN"), getReceptionistDashboardStats);
router.get("/pharmacy", authorizeRoles("PHARMACIST", "ADMIN"), getPharmacyDashboardStats);
router.get("/lab", authorizeRoles("LABORATORY", "ADMIN"), getLabDashboardStats);

export default router;
