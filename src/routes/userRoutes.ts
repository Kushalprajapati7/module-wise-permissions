import userController from "../controllers/userController";
import { Router } from "express";
// import { rbacMiddleware } from "../middleware/rbacMiddleware";
import verifyToken from "../middleware/authMiddleware";
import { rbacMiddleware } from "../middleware/rbacMiddleware";
import { Role } from "../utils/constant";

const router = Router();

router.post('/register', userController.creatUser);
router.post('/login', userController.loginUser)


export default router;