import express from "express";
import { getWards, addWard, assignPatient, removePatient } from "../controllers/wardController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getWards);
router.post("/", protect, authorizeRoles("ADMIN"), addWard);
router.post("/assign", protect, authorizeRoles("ADMIN", "RECEPTIONIST"), assignPatient);
router.post("/remove", protect, authorizeRoles("ADMIN", "RECEPTIONIST"), removePatient);

export default router;
