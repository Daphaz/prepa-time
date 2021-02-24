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
							<Card title="Ajouter des ingredients">
								<form className={styles.form}>
									<div className={styles.row}>
										<div className={styles.inpRow}>
											<label htmlFor="ingredients">Ingrédients</label>
											<input
												type="text"
												id="ingredients"
												className={styles.inpText}
											/>
										</div>
										<div className={styles.rowNested}>
											<div className={styles.inpRow}>
												<label htmlFor="quantity">Quantité</label>
												<input
													type="number"
													id="quantity"
													className={styles.inpText}
												/>
											</div>
											<div className={styles.inpRow}>
												<label htmlFor="quantity">Unité</label>
												<select>
													<option value="0">choisir</option>
													<option value="G">gramme</option>
													<option value="KG">kilo</option>
													<option value="ML">millilitre</option>
													<option value="CL">centilitre</option>
													<option value="L">litre</option>
													<option value="ce. à café">cuiellère à café</option>
													<option value="ce. à soupe">cuiellère à soupe</option>
												</select>
											</div>
										</div>
									</div>
									<div className={styles.formGroup}>
										<label htmlFor="description">Description</label>
										<div className={styles.areaContainer}>
											<textarea
												name="description"
												id="description"
												minLength="1"
												maxLength="1500"></textarea>
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
