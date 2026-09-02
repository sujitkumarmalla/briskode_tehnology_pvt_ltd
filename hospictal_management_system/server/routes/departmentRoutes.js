import express from "express";
import { getDepartments, createDepartment, updateDepartment, deleteDepartment } from "../controllers/departmentController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getDepartments);
router.use(protect);
router.post("/", authorizeRoles("ADMIN"), createDepartment);
router.put("/:id", authorizeRoles("ADMIN"), updateDepartment);
router.delete("/:id", authorizeRoles("ADMIN"), deleteDepartment);

export default router;
