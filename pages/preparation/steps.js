import React from "react";
import { Layout } from "../../components/Layout";
import { Card } from "../../components/Card";
import { DateTime } from "../../components/DateTime";
import styles from "../../styles/addPreparation.module.css";
import { ProtectedRoute } from "../../auth/protectedRoute";
import useAuth from "../../auth/context";

const Steps = () => {
	const { isAuthenticated, user } = useAuth();
	return (
		<>
			{isAuthenticated && (
				<Layout>
					<div className="container">
						<section className={styles.addPreparation}>
							<Card title="Ajouter une étape">
								<form className={styles.form}>
									<div className={styles.formGroup}>
										<label htmlFor="title">Titre</label>
										<input type="text" id="title" className={styles.inpText} />
									</div>
									<div className={styles.formGroup}>
										<label htmlFor="description">Description</label>
										<div className={styles.areaContainer}>
											<textarea
												name="description"
												id="description"
												minLength="1"
												maxLength="510"></textarea>
										</div>
									</div>
									<div className={styles.formGroup}>
										<label htmlFor="imageUrl">Url image</label>
										<input
											type="text"
											id="imageUrl"
											className={styles.inpText}
										/>
									</div>
									<div className={styles.formGroup}>
										<label htmlFor="time">Temps</label>
										<DateTime />
									</div>
									<button title="btn" type="submit" className={styles.btn}>
										Valider
									</button>
								</form>
							</Card>
						</section>
					</div>
				</Layout>
			)}
		</>
	);
};

export default ProtectedRoute(Steps);
