import React, { useEffect, useState } from "react";
import styles from "../../styles/form.module.css";
import { Layout } from "../../components/Layout";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { useRouter } from "next/router";
import { redirectFromServer } from "../../auth/cookies";
import { useForm } from "react-hook-form";
import useAuth from "../../auth/context";
import axios from "axios";

const initalState = {
	check: false,
	data: "",
};

const Forgot = () => {
	const [state, setState] = useState(initalState);
	const router = useRouter();
	const { isAuthenticated } = useAuth();
	const {
		register,
		handleSubmit,
		setError,
		setValue,
		clearErrors,
		formState,
	} = useForm({ mode: "onChange" });

	const { isValid, errors } = formState;

	const user = {
		username: register({
			required: "vous devez entrez un nom d'utilisateur",
		}),
	};

	useEffect(() => {
		if (isAuthenticated) router.push("/");
	}, [isAuthenticated]);

	const clearError = (value) => {
		clearErrors(value);
	};

	const onSubmit = async (d) => {
		try {
			const { data } = await axios.post("/api/forgot", d);
			if (data.sucess) {
				setState({
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

	return (
		<Layout>
			<div className={styles.container}>
				{!state.check ? (
					<div className={styles.card}>
						<h2 className={styles.title}>Mot de passe oublié</h2>
						<form
							className={styles.form}
							autoComplete="off"
							onSubmit={handleSubmit(onSubmit)}>
							<div className={styles.formGroup}>
								<label htmlFor="username">Nom d'utilisateur</label>
								<input
									autoComplete="username"
									type="text"
									name="username"
									id="username"
									ref={user.username}
									onFocus={() => clearError("username")}
								/>
								{errors.username && <span>{errors.username.message}</span>}
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

export default Forgot;
