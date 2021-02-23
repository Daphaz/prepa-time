import React, { useEffect } from "react";
import styles from "../../styles/form.module.css";
import { Layout } from "../../components/Layout";
import { Form } from "../../components/Form";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { redirectFromServer } from "../../auth/cookies";
import useAuth from "../../auth/context";
import useFormContext from "../../auth/formContext";
import { forgotLogic } from "../../logic/formLogic";

const Forgot = () => {
	const { formState } = useFormContext();
	const { isAuthenticated } = useAuth();

	useEffect(() => {
		if (isAuthenticated) router.push("/");
	}, [isAuthenticated]);

	return (
		<Layout>
			<div className={styles.container}>
				{!formState.check ? (
					<div className={styles.card}>
						<h2 className={styles.title}>Mot de passe oublié</h2>
						<Form forgot logic={forgotLogic} />
					</div>
				) : (
					<div className={styles.card}>
						<CheckCircleIcon className={styles.iconValid} />
						<h3>{formState.data}</h3>
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
