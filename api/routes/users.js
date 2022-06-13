import express from "express";
import { createUser, getUser, updateUser } from "../controller/user.js";

const router = express.Router();

// get users
router.get("/", getUser)

// create users
router.post("/", createUser)


// edit stocks
router.put("/:id", updateUser)

export default router;
