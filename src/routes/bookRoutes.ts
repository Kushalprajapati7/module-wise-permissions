import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";
import { rbacMiddleware } from "../middleware/rbacMiddleware";
import BookController from "../controllers/bookController";
import { Role } from "../utils/constant";

const router = Router()

router.post('/addBook', verifyToken, rbacMiddleware([Role.Admin],'Book','write'), BookController.createBook)
router.put('/updateBook/:id', verifyToken, rbacMiddleware([Role.Admin],'Book','edit'), BookController.updateBook)
router.delete('/deleteBook/:id', verifyToken, rbacMiddleware([Role.Admin],'Book','delete'), BookController.deleteBook)
router.get('/allBook', verifyToken, rbacMiddleware([Role.Admin],'Book','read'), BookController.showAllBook)
router.get('/bookById/:id', verifyToken, rbacMiddleware([Role.Admin],'Book','read'), BookController.showBookById)
router.get('/bookByAuthorId/:id', verifyToken, rbacMiddleware([Role.Admin,Role.User],'Book','read'), BookController.showBooksByAuthor)
export default router;