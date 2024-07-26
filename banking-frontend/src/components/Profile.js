// src/components/Profile.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import BalanceUpdateContext from '../contexts/BalanceUpdateContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
	const { logout } = useContext(AuthContext);
	const [profile, setProfile] = useState(null);
	const { update } = useContext(BalanceUpdateContext);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchProfile = async () => {
			const token = localStorage.getItem('token');
			console.log('Fetching started, token: ', token);
			try {
				const response = await axios.get('http://localhost:3001/api/users/me', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				console.log('Profile data: ', response.data);
				setProfile(response.data);
			} catch (error) {
				console.error('Error fetching profile:', error);
				console.log('Fetching ended with error');
				logout();
			}
		};
		fetchProfile();
	}, [logout, update]);

	if (!profile) return <div>Loading...</div>;

	const handleLogout = (e) => {
		e.preventDefault();
		logout();
	};
	const handleBalanceHistory = (accountId) => {
		navigate(`/balance-history/${accountId}`);
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
							onClick={() => navigate('/transfer')}
							type="button"
							className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
						>
							Transfer balance
						</button>
						<button
							onClick={handleLogout}
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
					<h2 className="text-2xl font-bold mb-4">
						Welcome to Bangladesh Fatra Bank
					</h2>
					<div className="mb-4">
						<strong>Name:</strong> {profile.customer.name}
					</div>
					<div className="mb-4">
						<strong>Email:</strong> {profile.email}
					</div>
					<div className="mb-4">
						<strong>Address:</strong> {profile.customer.address}
					</div>
					<div>
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-xl font-bold">Accounts</h3>
							<p
								className="text-green-600 font-semibold cursor-pointer"
								onClick={() => navigate(`/profile/${profile.customer.userId}`)}
							>
								Create a new account
							</p>
						</div>
						<div>
							{profile.customer.accounts.map((account) => (
								<div
									key={account.id}
									className="mb-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
									onClick={() => handleBalanceHistory(account.id)}
								>
									<div>
										<strong>Account ID:</strong> {account.id}
									</div>
									<div>
										<strong>Balance:</strong> ${account.balance.toFixed(2)}
									</div>
								</div>
							))}
						</div>
						<div>
							{!profile?.customer?.accounts.length && (
								<div>No accounts found!</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
