// src/components/BalanceTransfer.js

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import BalanceUpdateContext from '../contexts/BalanceUpdateContext';

import { useNavigate } from 'react-router-dom';

const BalanceTransfer = () => {
	const { logout } = useContext(AuthContext);
	const { triggerUpdate } = useContext(BalanceUpdateContext);
	const [selfAccounts, setSelfAccounts] = useState([]);
	const [allAccounts, setAllAccounts] = useState([]);
	const [fromAccountId, setFromAccountId] = useState('');
	const [toAccountId, setToAccountId] = useState('');
	const [amount, setAmount] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const navigate = useNavigate();

	const handleErrorMessage = (message) => {
		setError(message);
		setTimeout(() => setError(''), 3000);
	};

	const clearInputField = () => {
		setFromAccountId('');
		setToAccountId('');
		setAmount('');
	};

	useEffect(() => {
		setError('');
		const fetchSelfAccounts = async () => {
			const token = localStorage.getItem('token');
			try {
				const response = await axios.get('http://localhost:3001/api/users/me', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setSelfAccounts(response.data.customer.accounts);
			} catch (error) {
				console.error('Error fetching accounts:', error);
				handleErrorMessage('Failed to fetch accounts.');
			}
		};
		const fetchAllAccounts = async () => {
			const token = localStorage.getItem('token');
			try {
				const response = await axios.get(
					'http://localhost:3001/api/accounts/all',
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setAllAccounts(response.data);
			} catch (error) {
				console.error('Error fetching accounts:', error);
				handleErrorMessage('Failed to fetch all accounts.');
			}
		};
		fetchSelfAccounts();
		fetchAllAccounts();
	}, [logout, navigate, success]);

	const handleTransfer = async (e) => {
		e.preventDefault();

		if (!fromAccountId || !toAccountId || !amount) {
			handleErrorMessage('All fields are required.');
			return;
		}

		if (fromAccountId === toAccountId) {
			handleErrorMessage('Sender and receiver accounts cannot be the same.');
			return;
		}

		// Check if the toAccountId exists in the list of accounts
		const isValidToAccount = allAccounts.some(
			(account) => account.id === toAccountId
		);
		if (!isValidToAccount) {
			handleErrorMessage('Invalid receiver Account number');
			return;
		}

		try {
			const token = localStorage.getItem('token');
			await axios.post(
				'http://localhost:3001/api/accounts/transfer',
				{ fromAccountId, toAccountId, amount },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			triggerUpdate(); // Trigger balance update
			clearInputField();
			setSuccess('Balance transfer successful!');
			setTimeout(() => setSuccess(''), 3000);
		} catch (error) {
			console.error('Error during transfer:', error);
			handleErrorMessage('Failed to transfer amount.');
			clearInputField();
		}
	};

	return (
		<div className="min-h-screen bg-gray-100">
			<nav className="bg-white border-gray-200 dark:bg-gray-900">
				<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
					<a
						href="/"
						className="flex items-center space-x-3 rtl:space-x-reverse"
					>
						<img
							src="https://flowbite.com/docs/images/logo.svg"
							className="h-8"
							alt="Flowbite Logo"
						/>
						<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
							Bangladesh Fatra Bank
						</span>
					</a>
					<div className="flex items-center space-x-6 rtl:space-x-reverse">
						<button
							onClick={() => navigate('/profile')}
							type="button"
							className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
						>
							Back to Profile
						</button>
					</div>
				</div>
			</nav>
			<div className="container mx-auto p-4">
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h2 className="text-2xl font-bold mb-4">Balance Transfer</h2>
					<form onSubmit={handleTransfer} className="space-y-4">
						{error && (
							<div className="text-red-500 font-semibold mb-4">{error}</div>
						)}
						{success && (
							<div className="text-green-500 font-semibold mb-4">{success}</div>
						)}
						<div>
							<label
								htmlFor="fromAccount"
								className="block text-sm font-medium text-gray-700"
							>
								From Account
							</label>
							<select
								id="fromAccount"
								value={fromAccountId}
								onChange={(e) => setFromAccountId(e.target.value)}
								className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
							>
								<option value="">Select Account</option>
								{selfAccounts.map((account) => (
									<option key={account.id} value={account.id}>
										Account ID: {account.id} - Balance: $
										{account.balance.toFixed(2)}
									</option>
								))}
							</select>
						</div>
						<div>
							<label
								htmlFor="toAccount"
								className="block text-sm font-medium text-gray-700"
							>
								To Account
							</label>
							<input
								type="text"
								id="toAccount"
								value={toAccountId}
								onChange={(e) => setToAccountId(e.target.value)}
								className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
							/>
						</div>
						<div>
							<label
								htmlFor="amount"
								className="block text-sm font-medium text-gray-700"
							>
								Amount
							</label>
							<input
								type="number"
								id="amount"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
								step="0.01"
								min="0"
							/>
						</div>
						<button
							type="submit"
							className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
						>
							Transfer
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default BalanceTransfer;
