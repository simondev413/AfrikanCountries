import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUSer,
} from "../controllers/userController";


const router = Router();

router.get("/api/v1/users", getUsers);
router.get("/api/v1/users/:id", getUserById);
router.post("/api/v1/register/users", createUser);
router.delete("/api/v1/users/:id", deleteUser);
router.put("/api/v1/users/:id", updateUSer);

export default router;
