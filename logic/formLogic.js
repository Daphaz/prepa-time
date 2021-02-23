import { useState, useEffect } from "react";
import useAuth from "../auth/context";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import useFormContext from "../auth/formContext";

/**
 * Login
 */
export const loginLogic = () => {
	const { login } = useAuth();
	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		setValue,
		formState,
	} = useForm({ mode: "onChange" });
	const { errors, isValid } = formState;

	const clearError = (value) => {
		clearErrors(value);
	};

	const users = {
		username: register({
			required: "vous devez entrez un nom d'utilisateur",
		}),
		password: register({
			required: "vous devez entrez un mot de passe",
		}),
	};

	const onSubmit = async (d) => {
		try {
			const { data } = await axios.post("/api/login", d);
			if (data.success) {
				login(data.data);
			} else {
				setError("password", {
					type: "manual",
					message: "Nom d'utilisateur ou mot de passe incorrect",
				});
				setValue("username", "");
				setValue("password", "");
			}
		} catch (error) {
			console.log("Login: ", error);
		}
	};

	const onSubmitLogic = handleSubmit(onSubmit);

	return {
		onSubmitLogic,
		users,
		clearError,
		errors,
		isValid,
	};
};

/**
 * SignUp
 */
export const signupLogic = () => {
	const { setFormState } = useFormContext();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		setValue,
		formState,
	} = useForm({ mode: "onChange" });
	const { errors, isValid } = formState;

	const clearError = (value) => {
		clearErrors(value);
	};

	const users = {
		email: register({
			required: "vous devez entrez un email",
			pattern: {
				value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				message: "Vous devez entrez un email valide",
			},
		}),
		username: register({
			required: "vous devez entrez un nom d'utilisateur",
			minLength: {
				value: 4,
				message: "Votre nom d'utilisateur doit contenir au moins 4 caractères",
			},
			maxLength: {
				value: 20,
				message: "nom d'utilsateur avec un maximum de 20 caractères",
			},
		}),
		password: register({
			required: "vous devez entrez un mot de passe",
			minLength: {
				value: 7,
				message: "Votre mot de passe doit contenir au moins 7 caractères",
			},
		}),
	};

	const onSubmit = async (d) => {
		try {
			const { data } = await axios.post("/api/users", d);
			if (data.success) {
				setFormState({
					check: true,
					data: data.data,
				});
				const timer = () => {
					router.push("/");
				};
				setTimeout(timer, 2000);
				clearTimeout(timer);
			} else {
				if (data.data.length === 2) {
					setError("email", {
						type: "manual",
						message: "Cette email est déjà enregistré",
					});
					setError("username", {
						type: "manual",
						message: "Ce nom d'utilisateur existe déjà , veuillez changer",
					});
					setValue("email", "");
					setValue("username", "");
				} else {
					if (data.data[0] === "email") {
						setError("email", {
							type: "manual",
							message: "Cette email est déjà enregistré",
						});
						setValue("email", "");
					} else {
						setError("username", {
							type: "manual",
							message: "Ce nom d'utilisateur existe déjà , veuillez changer",
						});
						setValue("username", "");
					}
				}
			}
		} catch (error) {
			console.log("Signup: ", error);
		}
	};

	const onSubmitLogic = handleSubmit(onSubmit);

	return {
		onSubmitLogic,
		users,
		clearError,
		errors,
		isValid,
	};
};

/**
 *  Reset index
 */

export const forgotLogic = () => {
	const { setFormState } = useFormContext();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		setValue,
		formState,
	} = useForm({ mode: "onChange" });
	const { errors, isValid } = formState;

	const clearError = (value) => {
		clearErrors(value);
	};

	const users = {
		username: register({
			required: "vous devez entrez un nom d'utilisateur",
		}),
	};

	const onSubmit = async (d) => {
		try {
			const { data } = await axios.post("/api/forgot", d);
			if (data.sucess) {
				setFormState({
					check: true,
					data: data.data,
				});
				const timer = () => {
					router.push("/");
				};
				setTimeout(timer, 2000);
				clearTimeout(timer);
			} else {
				setError("username", {
					type: "manual",
					message: "Vérifier votre nom d'utilisateur",
				});
				setValue("username", "");
			}
		} catch (error) {
			console.log("Forgot: ", error);
		}
	};

	const onSubmitLogic = handleSubmit(onSubmit);

	return {
		onSubmitLogic,
		users,
		clearError,
		errors,
		isValid,
	};
};

/**
 * Reset [id]
 */

export const ResetLogic = () => {
	const { setFormState } = useFormContext();
	const router = useRouter();
	const { id: token } = router.query;
	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		setValue,
		formState,
	} = useForm({ mode: "onChange" });
	const { errors, isValid } = formState;

	const clearError = (value) => {
		clearErrors(value);
	};

	const users = {
		password: register({
			required: "vous devez entrez un mot de passe",
			minLength: {
				value: 7,
				message: "Votre mot de passe doit contenir au moins 7 caractères",
			},
		}),
		pass2: register({
			required: "vous devez valider votre mot de passe",
		}),
	};

	const onSubmit = async (d) => {
		if (d.password === d.pass2) {
			try {
				const { data } = await axios.put("/api/reset", {
					password: d.password,
					token: token,
				});
				if (data.sucess) {
					setFormState({
						check: true,
						data: data.data,
					});
					const timer = () => {
						router.push("/");
					};
					setTimeout(timer, 2000);
					clearTimeout(timer);
				} else {
					setError("pass2", {
						type: "manual",
						message: "une erreur c'est produite veuillez réessayer.",
					});
					setValue("password", "");
					setValue("pass2", "");
				}
			} catch (error) {
				console.log("[id]/reset: ", error);
			}
		} else {
			setError("pass2", {
				type: "manual",
				message: "Vous devez tapez le même mot de passe",
			});
			setValue("password", "");
			setValue("pass2", "");
		}
	};

	const onSubmitLogic = handleSubmit(onSubmit);

	return {
		onSubmitLogic,
		users,
		clearError,
		errors,
		isValid,
	};
};
