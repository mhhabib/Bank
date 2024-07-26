// src/components/TransferHistory.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const TransferHistory = () => {
	const [history, setHistory] = useState([]);
	const { logout } = useContext(AuthContext);
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);
	const customerId = user.customerId;
	const { accountId } = useParams();
	useEffect(() => {
		const fetchHistory = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3001/api/accounts/${customerId}/balance-history/${accountId}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					}
				);
				setHistory(response.data);
				console.log('History data: ', response.data);
			} catch (error) {
				console.error('Error fetching history:', error);
			}
		};
		fetchHistory();
	}, [logout, navigate, customerId, accountId]);

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
						<button
							onClick={logout}
							type="button"
							className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
						>
							Logout
						</button>
					</div>
				</div>
			</nav>
			<div className="container mx-auto p-4">
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h2 className="text-2xl font-bold mb-4">Transfer History</h2>
					{history.length > 0 ? (
						<ul>
							{history.map((item) => (
								<li key={item.id} className="mb-4 p-4 border rounded-lg">
									<div>
										<strong>Date:</strong>{' '}
										{new Date(item.createdAt).toLocaleString()}
									</div>
									<div>
										<strong>Transfer account number: </strong>
										{parseInt(item.fromAccountId) === parseInt(accountId)
											? item.toAccountId
											: item.fromAccountId}
									</div>
									<div>
										<strong>Amount:</strong> ${item.amount.toFixed(2)}
									</div>

									<div>
										<strong>Status:</strong>{' '}
										<span
											className={
												item.transactionType === 'sent'
													? 'text-red-500'
													: 'text-green-500'
											}
										>
											{item.transactionType}
										</span>
									</div>
								</li>
							))}
						</ul>
					) : (
						<div>No transactions found.</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TransferHistory;
