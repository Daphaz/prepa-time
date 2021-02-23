import React, { useEffect } from "react";
import { Layout } from "../components/Layout";
import { Form } from "../components/Form";
import styles from "../styles/form.module.css";
import useAuth from "../auth/context";
import { useRouter } from "next/router";
import { redirectFromServer } from "../auth/cookies";
import { loginLogic } from "../logic/formLogic";

const Login = () => {
	const { isAuthenticated } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (isAuthenticated) router.push("/");
	}, [isAuthenticated]);

	return (
		<Layout>
			<div className={styles.container}>
				<div className={styles.card}>
					<h2 className={styles.title}>Se connecter</h2>
					<Form login logic={loginLogic} />
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
