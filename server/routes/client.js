import express from "express";
import {
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
} from "../controllers/client.js";
import { deleteProduct } from "../controllers/general.js";

const router = express.Router();

router.get("/products", getProducts);
router.delete("/product/:id/:token", deleteProduct);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

export default router;
