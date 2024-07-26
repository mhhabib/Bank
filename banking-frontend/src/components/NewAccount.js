// src/components/NewAccount.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const NewAccount = () => {
	const { customerId } = useParams();
	const navigate = useNavigate();
	const [initialDeposit, setInitialDeposit] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	console.log('New account page hit!');
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isNaN(parseFloat(initialDeposit)) || parseFloat(initialDeposit) <= 0) {
			setError('Initial deposit must be a positive number.');
			return;
		}
		setError('');
		setSuccess('');

		try {
			const response = await axios.post(
				'http://localhost:3001/api/accounts/',
				{
					customerId,
					initialDeposit: parseFloat(initialDeposit),
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);
			console.log('Account creation: ', response.data);
			setSuccess('Account created successfully.');
			setInitialDeposit('');
		} catch (error) {
			console.error('Error creating account:', error);
			setError('Error creating account. Please try again.');
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold mb-4">Create New Account</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="initialDeposit"
							className="block text-sm font-medium text-gray-700"
						>
							Initial Deposit
						</label>
						<input
							id="initialDeposit"
							type="number"
							step="0.01"
							min="0"
							value={initialDeposit}
							onChange={(e) => setInitialDeposit(e.target.value)}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>
					{error && <p className="text-red-500 text-sm mb-4">{error}</p>}
					{success && <p className="text-green-500 text-sm mb-4">{success}</p>}
					<button
						type="submit"
						className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
					>
						Create Account
					</button>
				</form>
				<div className="mt-4 text-center">
					<p>
						Created new account?{' '}
						<Link to="/" className="text-blue-500 hover:underline">
							Go back to home
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default NewAccount;
