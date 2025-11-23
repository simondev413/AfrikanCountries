import { login } from "../controllers/authController";
import { Router } from "express";

const router = Router();

router.post("/api/v1/login", login);

export default router;