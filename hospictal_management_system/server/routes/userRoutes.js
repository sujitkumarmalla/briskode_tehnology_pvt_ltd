import express from "express";
import { getStaff, createStaff, updateStaff, deleteStaff } from "../controllers/userController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Allow public GET access to doctor directory & staff listing for hospital website
router.get("/", getStaff);

// Protected Admin routes for creating, updating, and deleting staff
router.use(protect);
router.post("/", authorizeRoles("ADMIN"), createStaff);
router.put("/:id", authorizeRoles("ADMIN"), updateStaff);
router.delete("/:id", authorizeRoles("ADMIN"), deleteStaff);

export default router;
