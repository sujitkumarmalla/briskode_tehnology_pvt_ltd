import express from "express";
import { createConsultation, getConsultations } from "../controllers/consultationController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getConsultations);
router.post("/", authorizeRoles("DOCTOR", "ADMIN"), createConsultation);

export default router;
