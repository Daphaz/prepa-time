import React, { useState, createContext, useContext } from "react";

const FormContext = createContext({});

export const FormProvider = ({ children }) => {
	const [formState, setFormState] = useState({
		check: false,
		data: "",
	});

	return (
		<FormContext.Provider value={{ formState, setFormState }}>
			{children}
		</FormContext.Provider>
	);
};

export default function useFormContext() {
	return useContext(FormContext);
}
