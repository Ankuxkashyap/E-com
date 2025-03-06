import express from "express";
import { userRigester } from "../controllers/user.controller.js";
import { userLogin } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/rigester",userRigester);
router.post("/login",userLogin);

export default router;
