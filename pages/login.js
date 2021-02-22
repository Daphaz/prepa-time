import React, { useEffect } from "react";
import { Layout } from "../components/Layout";
import styles from "../styles/form.module.css";
import useAuth from "../auth/context";
import { useRouter } from "next/router";
import { redirectFromServer } from "../auth/cookies";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = () => {
	const { login, isAuthenticated } = useAuth();
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
	} = useForm({ mode: "onChange" });
	const { errors, isValid } = formState;

	const users = {
		username: register({
			required: "vous devez entrez un nom d'utilisateur",
		}),
		password: register({
			required: "vous devez entrez un mot de passe",
		}),
	};

	const clearError = (value) => {
		clearErrors(value);
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

	return (
		<Layout>
			<div className={styles.container}>
				<div className={styles.card}>
					<h2 className={styles.title}>Se connecter</h2>
					<form
						className={styles.form}
						onSubmit={handleSubmit(onSubmit)}
						autoComplete="off">
						<div className={styles.formGroup}>
							<label htmlFor="username">Nom d'utilisateur</label>
							<input
								title="inpUsername"
								autoComplete="username"
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
								title="inpPass"
								autoComplete="current-password"
								type="password"
								name="password"
								id="password"
								ref={users.password}
								onFocus={() => clearError("password")}
							/>
							{errors.password && <span>{errors.password.message}</span>}
						</div>
						<button
							title="btn"
							type="submit"
							className={styles.btn}
							disabled={!isValid}>
							Valider
						</button>
					</form>
				</div>
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

export default Login;
