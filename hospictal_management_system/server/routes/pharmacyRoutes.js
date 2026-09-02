import express from "express";
import {
  getMedicines,
  addMedicine,
  updateMedicine,
  deleteMedicine,
  createDirectSale,
  getPharmacySales
} from "../controllers/pharmacyController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/medicines", getMedicines);
router.post("/medicines", authorizeRoles("PHARMACIST", "ADMIN"), addMedicine);
router.put("/medicines/:id", authorizeRoles("PHARMACIST", "ADMIN"), updateMedicine);
router.delete("/medicines/:id", authorizeRoles("PHARMACIST", "ADMIN"), deleteMedicine);

router.get("/sales", getPharmacySales);
router.post("/sales", authorizeRoles("PHARMACIST", "ADMIN"), createDirectSale);

export default router;
