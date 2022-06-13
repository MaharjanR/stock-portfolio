import express from "express";
import { getStocks, createStock } from "../controller/stock.js"

const router = express.Router();

// Get all stocks
router.get("/", getStocks)

// Create stocks
router.post("/", createStock);

export default router;
