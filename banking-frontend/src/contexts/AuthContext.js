import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem('token');

		const fetchUser = async () => {
			try {
				const response = await axios.get('http://localhost:3001/api/users/me', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setUser({
					userId: response.data.customer.userId,
					customerId: response.data.customer.id,
				});
			} catch (error) {
				console.error('Error fetching user:', error);
			}
		};

		if (token) {
			const decoded = jwtDecode(token);
			if (decoded.exp * 1000 > Date.now()) {
				fetchUser();
			} else {
				logout();
			}
		}
	}, []);

	const login = (token) => {
		localStorage.setItem('token', token);
		setUser(jwtDecode(token));
	};

	const logout = () => {
		localStorage.removeItem('token');
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
