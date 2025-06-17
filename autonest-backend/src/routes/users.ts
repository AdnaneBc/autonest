import express from "express";
import { createUser } from "../controllers/userController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", verifyToken, createUser);

export default router;
