import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import TransferHistory from './components/TransferHistory';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import NewAccount from './components/NewAccount';
import BalanceTransfer from './components/BalanceTransfer';

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/login"
					element={
						<PublicRoute>
							<Login />
						</PublicRoute>
					}
				/>
				<Route
					path="/register"
					element={
						<PublicRoute>
							<Register />
						</PublicRoute>
					}
				/>
				<Route
					path="/profile"
					element={
						<PrivateRoute>
							<Profile />
						</PrivateRoute>
					}
				/>
				<Route
					path="/profile/:customerId"
					element={
						<PrivateRoute>
							<NewAccount />
						</PrivateRoute>
					}
				/>
				<Route
					path="/transfer"
					element={
						<PrivateRoute>
							<BalanceTransfer />
						</PrivateRoute>
					}
				/>
				<Route
					path="/balance-history/:accountId"
					element={
						<PrivateRoute>
							<TransferHistory />
						</PrivateRoute>
					}
				/>
				<Route path="*" element={<Navigate to="/login" />} />
			</Routes>
		</Router>
	);
}

export default App;
