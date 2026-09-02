import express from "express";
import { getBeds, addBed, allocateBed, releaseBed } from "../controllers/bedController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getBeds);
router.post("/", authorizeRoles("ADMIN", "RECEPTIONIST"), addBed);
router.put("/:id/allocate", authorizeRoles("ADMIN", "RECEPTIONIST"), allocateBed);
router.put("/:id/release", authorizeRoles("ADMIN", "RECEPTIONIST"), releaseBed);

export default router;
