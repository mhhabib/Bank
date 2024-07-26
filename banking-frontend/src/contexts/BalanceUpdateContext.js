// src/contexts/BalanceUpdateContext.js
import React, { createContext, useState } from 'react';

const BalanceUpdateContext = createContext();

export const BalanceUpdateProvider = ({ children }) => {
	const [update, setUpdate] = useState(false);

	const triggerUpdate = () => {
		setUpdate(!update);
	};

	return (
		<BalanceUpdateContext.Provider value={{ update, triggerUpdate }}>
			{children}
		</BalanceUpdateContext.Provider>
	);
};

export default BalanceUpdateContext;
