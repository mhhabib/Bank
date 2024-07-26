import { PrismaClient } from '@prisma/client';
import { CustomRequest, CustomResponse } from '../types/types';
const prisma = new PrismaClient();

// Function to generate a 12-digit random number as a string
const generate12DigitId = () => {
	return Math.floor(100000000000 + Math.random() * 900000000000).toString();
};

export const createAccount = async (
	req: CustomRequest,
	res: CustomResponse
) => {
	const { userId } = req.user;
	const { initialDeposit } = req.body;
	console.log(
		`Account creation for ID: ${userId}, initial amount: ${initialDeposit}`
	);

	if (initialDeposit < 0) {
		return res
			.status(400)
			.json({ error: 'Initial deposit must be non-negative' });
	}

	try {
		const customer = await prisma.customer.findUnique({
			where: { userId },
		});

		if (!customer) {
			return res.status(404).json({ error: 'Customer not found' });
		}

		const accountId = generate12DigitId();
		const account = await prisma.account.create({
			data: {
				id: accountId,
				balance: parseFloat(initialDeposit),
				customerId: customer.id,
			},
		});

		res.status(201).json(account);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};

export const getAccounts = async (req: CustomRequest, res: CustomResponse) => {
	const { userId } = req.user;

	try {
		const customer = await prisma.customer.findUnique({
			where: { userId },
			include: { accounts: true },
		});

		if (!customer) {
			return res.status(404).json({ error: 'Customer not found' });
		}

		res.json(customer.accounts);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};

export const getAllAccounts = async (
	req: CustomRequest,
	res: CustomResponse
) => {
	try {
		const accounts = await prisma.account.findMany();
		res.json(accounts);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};
