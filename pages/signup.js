import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import styles from "../styles/form.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { useRouter } from "next/router";
import useAuth from "../auth/context";
import { redirectFromServer } from "../auth/cookies";

const initalState = {
	check: false,
	data: "",
};

const Signup = () => {
	const [state, setState] = useState(initalState);
	const { isAuthenticated } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (isAuthenticated) router.push("/");
	}, [isAuthenticated]);

	const {
		register,
		handleSubmit,
		setError,
		setValue,
		formState,
		clearErrors,
	} = useForm({
		mode: "onChange",
	});
	const { errors, isValid } = formState;

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

	const clearError = (value) => {
		clearErrors(value);
	};

	const onSubmit = async (d) => {
		try {
			const { data } = await axios.post("/api/users", d);
			if (data.success) {
				setState({
					check: true,
					data: data.data,
				});
				const timer = () => {
					router.push("/login");
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
	return (
		<Layout>
			<div className={styles.container}>
				{!state.check ? (
					<div className={styles.card}>
						<h2 className={styles.title}>S'inscrire</h2>
						<form
							className={styles.form}
							onSubmit={handleSubmit(onSubmit)}
							autoComplete="off">
							<div className={styles.formGroup}>
								<label htmlFor="email">Email</label>
								<input
									type="email"
									name="email"
									id="email"
									ref={users.email}
									onFocus={() => clearError("email")}
								/>
								{errors.email && <span>{errors.email.message}</span>}
							</div>
							<div className={styles.formGroup}>
								<label htmlFor="username">Nom d'utilisateur</label>
								<input
									type="text"
									name="username"
									id="username"
									ref={users.username}
									onFocus={() => clearError("username")}
								/>
								{errors.username && <span>{errors.username.message}</span>}
							</div>
							<div className={styles.formGroup}>
								<label htmlFor="password">Mot de passe</label>
								<input
									type="password"
									name="password"
									id="password"
									ref={users.password}
									onFocus={() => clearError("password")}
								/>
								{errors.password && <span>{errors.password.message}</span>}
							</div>
							<button type="submit" className={styles.btn} disabled={!isValid}>
								Valider
							</button>
						</form>
					</div>
				) : (
					<div className={styles.card}>
						<CheckCircleIcon className={styles.iconValid} />
						<h3>{state.data}</h3>
					</div>
				)}
			</div>
		</Layout>
	);
};

export const getServerSideProps = async (context) => {
	redirectFromServer(context);

	return {
		props: {},
	};
};

export default Signup;
