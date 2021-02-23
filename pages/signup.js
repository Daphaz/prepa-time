import React, { useEffect } from "react";
import { Layout } from "../components/Layout";
import { Form } from "../components/Form";
import styles from "../styles/form.module.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import useAuth from "../auth/context";
import { redirectFromServer } from "../auth/cookies";
import { signupLogic } from "../logic/formLogic";
import useFormContext from "../auth/formContext";

const Signup = () => {
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
						<h2 className={styles.title}>S'inscrire</h2>
						<Form signup logic={signupLogic} />
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

export default Signup;
