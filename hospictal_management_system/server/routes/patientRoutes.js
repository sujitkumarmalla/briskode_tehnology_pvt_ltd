import express from "express";
import { getPatients, createPatient, getPatientById, updatePatient, deactivatePatient } from "../controllers/patientController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getPatients);
router.post("/", authorizeRoles("ADMIN", "RECEPTIONIST"), createPatient);
router.get("/:id", getPatientById);
router.put("/:id", authorizeRoles("ADMIN", "RECEPTIONIST", "DOCTOR"), updatePatient);
router.delete("/:id", authorizeRoles("ADMIN"), deactivatePatient);

export default router;
