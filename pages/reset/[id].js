import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import styles from "../../styles/form.module.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { redirectFromServer } from "../../auth/cookies";
import useAuth from "../../auth/context";
import axios from "axios";

const initalState = {
	check: false,
	data: "",
	toggle1: true,
	toggle2: true,
	secure1: true,
	secure2: true,
};

const Reset = ({ tokenValid, token }) => {
	const [state, setState] = useState(initalState);
	const router = useRouter();
	const { isAuthenticated } = useAuth();

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

	useEffect(() => {
		if (isAuthenticated) router.push("/");
	}, [isAuthenticated]);

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

	const clearError = (value) => {
		clearErrors(value);
	};

	const handleVisible = (value) => {
		if (value === 1) {
			setState({
				...state,
				toggle1: !state.toggle1,
				secure1: !state.secure1,
			});
		} else {
			setState({
				...state,
				toggle2: !state.toggle2,
				secure2: !state.secure2,
			});
		}
	};

	const onSubmit = async (d) => {
		if (d.password === d.pass2) {
			try {
				const { data } = await axios.put("/api/reset", {
					password: d.password,
					token: token,
				});
				if (data.sucess) {
					setState({
						...state,
						check: true,
						data: data.data,
					});
					const timer = () => {
						router.push("/login");
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

	return (
		<Layout>
			{tokenValid ? (
				<div className={styles.container}>
					{!state.check ? (
						<div className={styles.card}>
							<h2 className={styles.title}>Nouveau mot de passe</h2>
							<form
								className={styles.form}
								onSubmit={handleSubmit(onSubmit)}
								autoComplete="off">
								<div className={styles.formGroup}>
									<label htmlFor="password">Mot de passe</label>
									<input
										autoComplete="off"
										type={state.secure1 ? "password" : "text"}
										name="password"
										id="password"
										ref={users.password}
										onFocus={() => clearError("password")}
									/>
									{state.toggle1 ? (
										<VisibilityIcon
											className={styles.iconEye}
											onClick={() => handleVisible(1)}
										/>
									) : (
										<VisibilityOffIcon
											className={styles.iconEye}
											onClick={() => handleVisible(1)}
										/>
									)}
									{errors.password && <span>{errors.password.message}</span>}
								</div>
								<div className={styles.formGroup}>
									<label htmlFor="pass2">Retapez votre mot de passe</label>
									<input
										autoComplete="off"
										type={state.secure2 ? "password" : "text"}
										name="pass2"
										id="pass2"
										ref={users.pass2}
										onFocus={() => clearError("pass2")}
									/>
									{state.toggle2 ? (
										<VisibilityIcon
											className={styles.iconEye}
											onClick={() => handleVisible(2)}
										/>
									) : (
										<VisibilityOffIcon
											className={styles.iconEye}
											onClick={() => handleVisible(2)}
										/>
									)}
									{errors.pass2 && <span>{errors.pass2.message}</span>}
								</div>
								<button
									type="submit"
									className={styles.btn}
									disabled={!isValid}>
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
			) : (
				<div className={styles.container}>
					<div className={styles.card}>
						<h3>Ce lien à expiré, veuillez recommencer la procédure</h3>
					</div>
				</div>
			)}
		</Layout>
	);
};

export const getServerSideProps = async (context) => {
	redirectFromServer(context);

	const { id: token } = context.query;
	let tokenValid;

	const { data } = await axios.post(`${process.env.BASE_URL}/api/reset`, {
		token,
	});

	if (data.sucess) {
		tokenValid = true;
	} else {
		tokenValid = false;
	}

	return {
		props: {
			token,
			tokenValid,
		},
	};
};

export default Reset;
