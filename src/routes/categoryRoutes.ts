import categoryController from "../controllers/categoryController";
import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";
import { rbacMiddleware } from "../middleware/rbacMiddleware";
import { Role } from "../utils/constant";

const router = Router();

router.post('/addCategory', verifyToken,rbacMiddleware([Role.Admin],'Category','write'),categoryController.create)
router.put('/updateCategory/:id', verifyToken,rbacMiddleware([Role.Admin],'Category','write'),categoryController.update)
router.delete('/deleteCategory/:id', verifyToken,rbacMiddleware([Role.Admin],'Category','delete'),categoryController.delete)
router.get('/categoryById/:id', verifyToken, rbacMiddleware([Role.Admin, Role.User],'Category','read'),categoryController.categoryById)
router.get('/allCategory',verifyToken, rbacMiddleware([Role.Admin, Role.User],'Category','read'), categoryController.allCategory)


export default router;