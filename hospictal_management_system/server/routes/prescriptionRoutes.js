import express from "express";
import { createPrescription, getPrescriptions, dispensePrescription } from "../controllers/prescriptionController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getPrescriptions);
router.post("/", authorizeRoles("DOCTOR", "ADMIN"), createPrescription);
router.put("/:id/dispense", authorizeRoles("PHARMACIST", "ADMIN"), dispensePrescription);

export default router;
