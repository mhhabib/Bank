import { CustomRequest, CustomResponse } from '../types/types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const transferBalance = async (
	req: CustomRequest,
	res: CustomResponse
) => {
	const userId = req.user?.userId;

	if (!userId) {
		return res.status(401).json({ error: 'Unauthorized' });
	}
	const { fromAccountId, toAccountId, amount } = req.body;
	const fromAccountIdParsed = fromAccountId;
	const toAccountIdParsed = toAccountId;
	const amountParsed = parseFloat(amount);

	try {
		// Use a transaction to ensure atomicity
		const result = await prisma.$transaction(async (prisma: any) => {
			// Fetch accounts to verify they exist
			const fromAccount = await prisma.account.findUnique({
				where: { id: fromAccountIdParsed },
			});
			const toAccount = await prisma.account.findUnique({
				where: { id: toAccountIdParsed },
			});

			if (!fromAccount || !toAccount) {
				throw new Error('Account not found');
			}

			// Check if there is enough balance in the from account
			if (fromAccount.balance < amountParsed) {
				throw new Error('Insufficient balance');
			}

			// Update balances
			await prisma.account.update({
				where: { id: fromAccountIdParsed },
				data: { balance: { decrement: amountParsed } },
			});

			await prisma.account.update({
				where: { id: toAccountIdParsed },
				data: { balance: { increment: amountParsed } },
			});

			// Create a single transaction record
			const transfer = await prisma.transaction.create({
				data: {
					amount: amountParsed,
					fromAccountId: fromAccountIdParsed,
					toAccountId: toAccountIdParsed,
					transactionType: 'transfer', // Use a single type to represent the transfer
				},
			});

			return transfer;
		});

		res.status(200).json(result);
	} catch (error) {
		console.error('Error transferring amount:', error);
		res.status(500).json({ error: 'Error transferring amount' });
	}
};

export const getTransferHistory = async (
	req: CustomRequest,
	res: CustomResponse
) => {
	const { userId, accountId } = req.params;

	if (!userId) {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	try {
		// Fetch the account details
		const account = await prisma.account.findUnique({
			where: { id: accountId },
		});

		// Check if the account exists and belongs to the authenticated user
		if (!account || account.customerId !== userId) {
			return res.status(403).json({
				error: `The specified account number (${accountId}) is not found!`,
			});
		}

		const transfers = await prisma.transaction.findMany({
			where: {
				OR: [{ fromAccountId: accountId }, { toAccountId: accountId }],
			},
			include: {
				fromAccount: true,
				toAccount: true,
			},
			orderBy: { createdAt: 'desc' },
		});

		const transferHistory = transfers.map((transfer: any) => ({
			id: transfer.id,
			amount: transfer.amount,
			fromAccountId: transfer.fromAccountId,
			toAccountId: transfer.toAccountId,
			transactionType:
				transfer.fromAccountId === accountId ? 'sent' : 'received',
			createdAt: transfer.createdAt,
		}));

		res.status(200).json(transferHistory);
	} catch (error) {
		console.error('Error retrieving transfer history:', error);
		res.status(500).json({ error: 'Error retrieving transfer history' });
	}
};
