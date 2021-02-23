import React, { useEffect } from "react";
import { Layout } from "../../components/Layout";
import { Form } from "../../components/Form";
import styles from "../../styles/form.module.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { useRouter } from "next/router";
import { redirectFromServer } from "../../auth/cookies";
import useAuth from "../../auth/context";
import axios from "axios";
import useFormContext from "../../auth/formContext";
import { ResetLogic } from "../../logic/formLogic";

const Reset = ({ tokenValid }) => {
	const { formState } = useFormContext();
	const router = useRouter();
	const { isAuthenticated } = useAuth();

	useEffect(() => {
		if (isAuthenticated) router.push("/");
	}, [isAuthenticated]);

	return (
		<Layout>
			{tokenValid ? (
				<div className={styles.container}>
					{!formState.check ? (
						<div className={styles.card}>
							<h2 className={styles.title}>Nouveau mot de passe</h2>
							<Form reset logic={ResetLogic} />
						</div>
					) : (
						<div className={styles.card}>
							<CheckCircleIcon className={styles.iconValid} />
							<h3>{formState.data}</h3>
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
			tokenValid,
		},
	};
};

export default Reset;
