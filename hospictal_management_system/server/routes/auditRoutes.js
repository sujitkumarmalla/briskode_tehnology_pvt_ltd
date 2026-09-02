import express from "express";
import { getAuditLogs } from "../controllers/auditController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/", authorizeRoles("ADMIN"), getAuditLogs);

export default router;
