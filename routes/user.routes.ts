import { Router } from "express";
import { deleteUser, loginUser, registerUser } from "../controller/user";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/userId", deleteUser);

export default router;
