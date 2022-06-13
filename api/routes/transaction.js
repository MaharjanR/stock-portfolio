import express from "express";
import { createTransaction, getTransactions } from "../controller/transaction.js";

const router = express.Router();

// Get all stocks
router.get("/", getTransactions)

// Create stocks
router.post("/", createTransaction);


export default router;
