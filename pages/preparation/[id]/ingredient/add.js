import React from "react";
import { Layout } from "../../../../components/Layout";
import { Card } from "../../../../components/Card";
import styles from "../../../../styles/addPreparation.module.css";
import useAuth from "../../../../auth/context";
import { useForm } from "react-hook-form";
import { apiPost } from "../../../../auth/axios";
import { useRouter } from "next/router";

const AddIngredient = ({ prepaId }) => {
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
	const { errors, isValid } = formState;

	const ing = {
		title: register({
			required: "Ajouter un ingredients",
		}),
		quantity: register({
			required: "Quel quantité ?",
		}),
		unit: register({
			required: "Choisir une unitée",
			pattern: {
				value: /[^0-9]/g,
				message: "Choisir une unitée",
			},
		}),
	};

	const clearError = (value) => {
		clearErrors(value);
	};

	const onSubmit = async (d) => {
		const query = {
			title: d.title,
			quantity: d.quantity,
			unit: d.unit,
			prepa: prepaId,
		};
		const { data } = await apiPost("/api/ingredient", query);

		if (data.sucess) {
			router.push(`/preparation/${prepaId}`);
		} else {
			setError("title", {
				type: "manual",
				message: "Une erreur est survenue, veuillez réessayer",
			});
			setValue("title", "");
			setValue("quantity", "");
			setValue("unit", 0);
		}
	};
	return (
		<>
			{isAuthenticated && (
				<Layout>
					<div className="container">
						<section className={styles.addPreparation}>
							<Card title="Ajouter un ingredient">
								<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
									<div className={styles.row}>
										<div className={styles.inpRow}>
											<label htmlFor="title">Titre</label>
											<input
												type="text"
												id="title"
												name="title"
												className={styles.inpText}
												ref={ing.title}
												onFocus={() => clearError("title")}
											/>
											{errors.title && <span>{errors.title.message}</span>}
										</div>
										<div className={styles.rowNested}>
											<div className={styles.inpRow}>
												<label htmlFor="quantity">Quantité</label>
												<input
													type="number"
													id="quantity"
													name="quantity"
													ref={ing.quantity}
													className={styles.inpText}
													onFocus={() => clearError("quantity")}
												/>
												{errors.quantity && (
													<span>{errors.quantity.message}</span>
												)}
											</div>
											<div className={styles.inpRow}>
												<label htmlFor="unit">Unité</label>
												<select
													name="unit"
													id="unit"
													ref={ing.unit}
													onFocus={() => clearError("unit")}>
													<option value="0">choisir</option>
													<option value="unité">unité(s)</option>
													<option value="G">gramme</option>
													<option value="KG">kilo</option>
													<option value="ML">millilitre</option>
													<option value="CL">centilitre</option>
													<option value="L">litre</option>
													<option value="ce. à café">cuiellère à café</option>
													<option value="ce. à soupe">cuiellère à soupe</option>
												</select>
												{errors.unit && <span>{errors.unit.message}</span>}
											</div>
										</div>
									</div>
									<button
										title="btn"
										type="submit"
										className={styles.btn}
										disabled={!isValid}>
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

export const getServerSideProps = async ({ query }) => {
	const { id: prepaId } = await query;
	return {
		props: {
			prepaId,
		},
	};
};

export default AddIngredient;
