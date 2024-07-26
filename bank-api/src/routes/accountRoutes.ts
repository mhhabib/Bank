import { Router } from 'express';
import {
	createAccount,
	getAccounts,
	getAllAccounts,
} from '../controllers/accountController';
import authMiddleware from '../middlewares/authMiddleware';
import { validateAccountCreation } from '../middlewares/validationMiddleware';
import {
	getTransferHistory,
	transferBalance,
} from '../controllers/transferController';

const router = Router();

router.post('/', authMiddleware, validateAccountCreation, createAccount);
router.get('/', authMiddleware, getAccounts);
router.post('/transfer', authMiddleware, transferBalance);
router.get('/all', authMiddleware, getAllAccounts);
router.get(
	'/:userId/balance-history/:accountId/',
	authMiddleware,
	getTransferHistory
);

export default router;
