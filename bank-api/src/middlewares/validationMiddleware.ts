import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateRegister = [
	body('email').isEmail().withMessage('Invalid email'),
	body('password')
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters long'),
	body('name').notEmpty().withMessage('Name is required'),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];

export const validateLogin = [
	body('email').isEmail().withMessage('Invalid email'),
	body('password').notEmpty().withMessage('Password is required'),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];

export const validateAccountCreation = [
	body('initialDeposit')
		.isFloat({ min: 0 })
		.withMessage('Initial deposit must be a non-negative number'),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];
