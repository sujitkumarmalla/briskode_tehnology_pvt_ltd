import express from "express";
import { getBills, generateBill, recordPayment } from "../controllers/billController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getBills);
router.post("/", authorizeRoles("ADMIN", "RECEPTIONIST"), generateBill);
router.put("/:id/payment", authorizeRoles("ADMIN", "RECEPTIONIST"), recordPayment);

export default router;
