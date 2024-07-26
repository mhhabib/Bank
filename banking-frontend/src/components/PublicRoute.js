import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const PublicRoute = ({ children }) => {
	const { user } = useContext(AuthContext);

	return !user ? children : <Navigate to="/profile" />;
};

export default PublicRoute;
