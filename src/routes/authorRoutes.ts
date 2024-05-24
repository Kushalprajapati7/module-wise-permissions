import AuthorController from "../controllers/authorController";
import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";
import { rbacMiddleware } from "../middleware/rbacMiddleware";
import { Role } from "../utils/constant";

const router = Router()


router.post('/addAuthor', verifyToken,rbacMiddleware([Role.Admin],'Author','write'),AuthorController.addauthor)
router.put('/updateAuthor/:id', verifyToken,rbacMiddleware([Role.Admin],'Author','edit'),AuthorController.updateAuthor)
router.delete('/deleteAuthor/:id', verifyToken,rbacMiddleware([Role.Admin],'Author','delete'),AuthorController.deleteAuthor)
router.get('/authorById/:id', verifyToken, rbacMiddleware([Role.Admin,Role.User],'Author','read'),AuthorController.getAuthorById)
router.get('/allAuthor',verifyToken, rbacMiddleware([Role.Admin,Role.User],'Author','read'), AuthorController.getAllAuthor)


export default router;
