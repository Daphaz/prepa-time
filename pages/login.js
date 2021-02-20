import React from "react";
import { Layout } from "../components/Layout";
import styles from "../styles/login.module.css";

const Login = () => {
	return (
		<Layout>
			<div className={styles.container}>
				<div className={styles.card}>
					<h2 className={styles.title}>Se connecter</h2>
					<form className={styles.form}>
						<div className={styles.formGroup}>
							<label htmlFor="username">Nom d'utilisateur</label>
							<input type="text" name="username" id="username" />
						</div>
						<div className={styles.formGroup}>
							<label htmlFor="password">Mot de passe</label>
							<input type="password" name="password" id="password" />
						</div>
						<button type="submit" className={styles.btn}>
							Valider
						</button>
					</form>
				</div>
			</div>
		</Layout>
	);
};

export default Login;
