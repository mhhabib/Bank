require('dotenv').config();
import { NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CustomRequest, CustomResponse } from '../types/types';

const authMiddleware = (
	req: CustomRequest,
	res: CustomResponse,
	next: NextFunction
) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(401).json({ error: 'Authorization header missing' });
	}

	const token = authHeader.split(' ')[1];

	if (!token) {
		return res.status(401).json({ error: 'Token missing' });
	}

	try {
		const JWT_SECRET = process.env.JWT_TOKEN;
		if (!JWT_SECRET) {
			return res.status(500).json({ error: 'JWT secret is not defined' });
		}

		const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
		if (typeof decoded === 'object' && 'userId' in decoded) {
			req.user = { userId: decoded.userId as number };
			next();
		} else {
			res.status(401).json({ error: 'Invalid token payload' });
		}
	} catch (error) {
		res.status(401).json({ error: 'Invalid token' });
	}
};

export default authMiddleware;
