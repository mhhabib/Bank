// src/components/Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				'http://localhost:3001/api/users/login',
				{ email, password }
			);
			console.log('Login response: ', response.data);
			login(response.data.token);
			navigate('/profile');
		} catch (error) {
			if (error.response && error.response.data && error.response.data.error) {
				setErrorMessage(error.response.data.error);
			} else {
				setErrorMessage('Login failed!');
			}
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
					>
						Login
					</button>
				</form>
				<div className="mt-4 text-center">
					<p>
						Don't have an account?{' '}
						<Link to="/register" className="text-blue-500 hover:underline">
							Register here
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
