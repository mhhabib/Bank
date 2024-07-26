import { Router } from 'express';
import { register, login, getUserInfo } from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';
import {
	validateRegister,
	validateLogin,
} from '../middlewares/validationMiddleware';

const router = Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/me', authMiddleware, getUserInfo);

export default router;
