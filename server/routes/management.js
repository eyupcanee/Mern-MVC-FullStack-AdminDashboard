import express from "express";
import {
  getAdmins,
  deleteAdmin,
  getUserPerformance,
} from "../controllers/management.js";

const router = express.Router();

router.get("/admins", getAdmins);
router.delete("/admin/:id/:token", deleteAdmin);
router.get("/performance/:id", getUserPerformance);

export default router;
