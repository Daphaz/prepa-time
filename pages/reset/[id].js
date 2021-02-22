import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import styles from "../../styles/form.module.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { redirectFromServer } from "../../auth/cookies";
import useAuth from "../../auth/context";
import axios from "axios";

const initalState = {
	check: false,
	data: "",
};

const Reset = ({ tokenValid }) => {
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

	const onSubmit = async (d) => {};

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
										type="password"
										name="password"
										id="password"
										ref={users.password}
										onFocus={() => clearError("password")}
									/>
									{errors.password && <span>{errors.password.message}</span>}
								</div>
								<div className={styles.formGroup}>
									<label htmlFor="pass2">Retapez votre mot de passe</label>
									<input
										autoComplete="off"
										type="password"
										name="pass2"
										id="pass2"
										ref={users.pass2}
										onFocus={() => clearError("pass2")}
									/>
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
