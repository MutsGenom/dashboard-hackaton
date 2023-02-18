import React from "react";

const initialState = {
	link:
		localStorage.getItem("link") ||
		"cf2801fc-7e96-45b8-9b36-a9cefdcecb82.xlsx",
};

function reducer(state, action) {
	switch (action.type) {
		case "SET_LINK":
			return {
				...state,
				link: action.payload,
			};
		default:
			return state;
	}
}

export const AppContext = React.createContext();

export function AppProvider({ children }) {
	const value = React.useReducer(reducer, initialState);
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
