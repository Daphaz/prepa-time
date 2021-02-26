import React from "react";
import { Layout } from "../../../../components/Layout";
import { Card } from "../../../../components/Card";
import { BtnReturn } from "../../../../components/BtnReturn";
import styles from "../../../../styles/formPreparation.module.css";
import useAuth from "../../../../auth/context";
import api, { apiPut } from "../../../../auth/axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { getCookieFromServer } from "../../../../auth/cookies";

const StepModify = ({ prepaId, step }) => {
	const router = useRouter();
	const { isAuthenticated } = useAuth();
	const { register, setError, clearErrors, handleSubmit, formState } = useForm({
		mode: "onChange",
	});
	const { errors, isValid } = formState;

	const inputStep = {
		title: register({
			required: "Ajouter un titre",
		}),
		description: register({
			required: "expliquer votre étape",
		}),
		time: register({
			required: "Ajouter une durée",
		}),
		jour: register({
			required: "Choisir une unité",
			pattern: {
				value: /[^0-9]/g,
				message: "Choisir une unité",
			},
		}),
		image_url: register({
			required: "ajouter une image",
			pattern: {
				value: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm,
				message: "utiliser une url valide",
			},
		}),
	};

	const clearError = (value) => {
		clearErrors(value);
	};

	const onSubmit = async (d) => {
		const query = {
			title: d.title,
			description: d.description,
			image_url: d.image_url,
			time: Number(d.time),
			unit_time: d.jour,
			prepa: prepaId,
			step_id: step._id,
		};
		const { data } = await apiPut("/api/step", query);

		if (data.sucess) {
			router.push(`/preparation/${prepaId}`);
		} else {
			setError("time", {
				type: "manual",
				message: "Une erreur est survenue, veuillez réessayer",
			});
		}
	};

	return (
		<>
			{isAuthenticated && (
				<Layout>
					<div className="container">
						<BtnReturn url={`/preparation/${prepaId}`} />
						<section className={styles.addPreparation}>
							<Card title="Modification de l'étape">
								<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
									<div className={styles.formGroup}>
										<label htmlFor="title">Titre</label>
										<input
											type="text"
											id="title"
											name="title"
											ref={inputStep.title}
											className={styles.inpText}
											onFocus={() => clearError("title")}
											defaultValue={step.title}
										/>
										{errors.title && <span>{errors.title.message}</span>}
									</div>
									<div className={styles.formGroup}>
										<label htmlFor="description">Description</label>
										<div className={styles.areaContainer}>
											<textarea
												name="description"
												id="description"
												minLength="1"
												maxLength="510"
												ref={inputStep.description}
												onFocus={() => clearError("description")}
												defaultValue={step.description}></textarea>
										</div>
										{errors.description && (
											<span>{errors.description.message}</span>
										)}
									</div>
									<div className={styles.formGroup}>
										<label htmlFor="imageUrl">Url image</label>
										<input
											type="text"
											id="imageUrl"
											name="image_url"
											className={styles.inpText}
											ref={inputStep.image_url}
											onFocus={() => clearError("image_url")}
											defaultValue={step.image_url}
										/>
										{errors.image_url && (
											<span>{errors.image_url.message}</span>
										)}
									</div>
									<div className={styles.formGroup}>
										<label htmlFor="time">Durée</label>
										<div className={styles.inpTime}>
											<input
												className={styles.inpText}
												type="number"
												name="time"
												id="time"
												ref={inputStep.time}
												onFocus={() => clearError("time")}
												defaultValue={step.time}
											/>
											<select
												name="jour"
												id="jour"
												ref={inputStep.jour}
												onFocus={() => clearError("jour")}>
												<option value={step.unit_time}>
													{step.unit_time.charAt(0).toUpperCase() +
														step.unit_time.slice(1)}
												</option>
												<option value="minute">Minute</option>
												<option value="heure">Heure</option>
												<option value="jour">Jours</option>
												<option value="semaine">Semaine</option>
												<option value="mois">Mois</option>
											</select>
										</div>
										{errors.time && <span>{errors.time.message}</span>}
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

export const getServerSideProps = async ({ query, req }) => {
	const { id: prepaId, step: stepId } = await query;
	const token = await getCookieFromServer("token", req);
	if (token) {
		api.defaults.headers.Authorization = token;
		const { data } = await api.get("/api/step/id", {
			params: {
				step_id: stepId,
				prepa: prepaId,
			},
		});
		if (data.sucess) {
			return {
				props: {
					prepaId,
					step: data.data,
				},
			};
		} else {
			return {
				props: {
					prepaId,
					step: null,
				},
			};
		}
	}
	return {
		props: {
			prepaId,
			step: null,
		},
	};
};

export default StepModify;
