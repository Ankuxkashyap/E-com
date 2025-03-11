import express from "express";
import { userRigester } from "../controllers/user.controller.js";
import { userLogin , getProfile } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/rigester",userRigester);
router.post("/login",userLogin);
router.get("/profile",authMiddleware,getProfile);

export default router;
