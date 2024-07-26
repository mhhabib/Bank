require('dotenv').config();
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { CustomRequest, CustomResponse } from '../types/types';
const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
	const { email, password, name, address } = req.body;

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				customer: {
					create: {
						name,
						address,
					},
				},
			},
		});
		res.status(201).json(user);
	} catch (error) {
		res.status(400).json({ error: 'Email already in use' });
	}
};

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		const user = await prisma.user.findUnique({
			where: { email },
			include: { customer: true },
		});

		if (!user) {
			return res
				.status(401)
				.json({ error: 'Invalid or wrong email credentials' });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return res
				.status(401)
				.json({ error: 'Invalid or wrong password credentials' });
		}
		const JWT_TOKEN = process.env.JWT_TOKEN;
		if (!JWT_TOKEN) {
			return res.status(500).json({ error: 'JWT secret token is not defined' });
		}

		const token = jwt.sign({ userId: user.id }, JWT_TOKEN, {
			expiresIn: '1h',
		});

		res.json({ token });
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};

export const getUserInfo = async (req: CustomRequest, res: CustomResponse) => {
	const { userId } = req.user;
	console.log(`User information for userid: ${userId}`);
	try {
		const user = await prisma.user.findUnique({
			where: { id: userId },
			include: {
				customer: {
					include: { accounts: true },
				},
			},
		});

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		res.json(user);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};
