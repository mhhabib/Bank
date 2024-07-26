// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [address, setAddress] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post('http://localhost:3001/api/users/register', {
				email,
				password,
				name,
				address,
			});
			navigate('/login');
		} catch (error) {
			if (error.response && error.response.data && error.response.data.errors) {
				setErrorMessage(
					error.response.data.errors.map((err) => err.msg).join(', ')
				);
			} else if (
				error.response &&
				error.response.data &&
				error.response.data.error
			) {
				setErrorMessage(error.response.data.error);
			} else {
				setErrorMessage('Registration failed!');
			}
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
				{errorMessage && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
						<span className="block sm:inline">{errorMessage}</span>
					</div>
				)}
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-gray-700">Email</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-3 py-2 border rounded-lg"
							placeholder="Email"
							required
						/>
					</div>
					<div className="mb-6">
						<label className="block text-gray-700">Password</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-3 py-2 border rounded-lg"
							placeholder="Password"
							required
						/>
					</div>
					<div className="mb-6">
						<label className="block text-gray-700">Full Name</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full px-3 py-2 border rounded-lg"
							placeholder="Enter your full name"
							required
						/>
					</div>
					<div className="mb-6">
						<label className="block text-gray-700">Address</label>
						<input
							type="text"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							className="w-full px-3 py-2 border rounded-lg"
							placeholder="Enter your address"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
					>
						Register
					</button>
				</form>
				<div className="mt-4 text-center">
					<p>
						Do you already have an account?{' '}
						<Link to="/login" className="text-blue-500 hover:underline">
							Try login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
