import express from "express";
import {
  getLabCatalog,
  addLabCatalogItem,
  createLabRequest,
  getLabRequests,
  collectSample,
  updateLabRequestStatus,
  submitLabResult,
  getLabResults
} from "../controllers/labController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/catalog", getLabCatalog);
router.post("/catalog", authorizeRoles("LABORATORY", "ADMIN"), addLabCatalogItem);

router.get("/requests", getLabRequests);
router.post("/requests", authorizeRoles("DOCTOR", "ADMIN"), createLabRequest);
router.put("/requests/:id/sample", authorizeRoles("LABORATORY", "ADMIN"), collectSample);
router.put("/requests/:id/status", authorizeRoles("LABORATORY", "ADMIN"), updateLabRequestStatus);

router.get("/results", getLabResults);
router.post("/results", authorizeRoles("LABORATORY", "ADMIN"), submitLabResult);

export default router;
