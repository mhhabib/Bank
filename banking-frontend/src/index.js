import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { BalanceUpdateProvider } from './contexts/BalanceUpdateContext';

ReactDOM.render(
	<AuthProvider>
		<BalanceUpdateProvider>
			<App />
		</BalanceUpdateProvider>
	</AuthProvider>,
	document.getElementById('root')
);
