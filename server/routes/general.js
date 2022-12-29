import express from "express";
import {
  getUser,
  insertUser,
  insertProduct,
  getLastUser,
  deleteUser,
  loginUser,
  getDashboardStats,
} from "../controllers/general.js";

const router = express.Router();

router.get("/user/:id", getUser);
router.get("/users/last", getLastUser);
router.delete("/user/:id/:token", deleteUser);
router.get("/dashboard", getDashboardStats);
router.post("/user/login", loginUser);
router.post("/user/insert", insertUser);
router.post("/product/insert", insertProduct);

export default router;
