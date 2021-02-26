import React from "react";
import { Layout } from "../../../../components/Layout";
import { Card } from "../../../../components/Card";
import { BtnReturn } from "../../../../components/BtnReturn";
import styles from "../../../../styles/formPreparation.module.css";
import useAuth from "../../../../auth/context";
import { apiPost } from "../../../../auth/axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const StepAdd = ({ prepaId }) => {
	const router = useRouter();
	const { isAuthenticated } = useAuth();
	const {
		register,
		setError,
		setValue,
		clearErrors,
		handleSubmit,
		formState,
	} = useForm({ mode: "onChange" });
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
		try {
			if (d.image_url !== "") {
				const query = {
					title: d.title,
					description: d.description,
					time: Number(d.time),
					unit_time: d.jour,
					prepa: prepaId,
					image_url: d.image_url,
				};
				const { data } = await apiPost("/api/step", query);
				if (data.sucess) {
					router.push(`/preparation/${prepaId}`);
				} else {
					setError("time", {
						type: "manual",
						message: "Une erreur est survenue, veuillez réessayer",
					});
				}
			}
			const query = {
				title: d.title,
				description: d.description,
				time: Number(d.time),
				unit_time: d.jour,
				prepa: prepaId,
			};
			const { data } = await apiPost("/api/step", query);
			if (data.sucess) {
				router.push(`/preparation/${prepaId}`);
			} else {
				setError("time", {
					type: "manual",
					message: "Une erreur est survenue, veuillez réessayer",
				});
			}
		} catch (error) {
			console.log("StepAdd: ", error);
			setError("time", {
				type: "manual",
				message: "Une erreur est survenue, veuillez recommencer",
			});
			setValue("title", "");
			setValue("description", "");
			setValue("image_url", "");
			setValue("time", undefined);
			setValue("jour", 0);
		}
	};

	return (
		<>
			{isAuthenticated && (
				<Layout>
					<div className="container">
						<BtnReturn url={`/preparation/${prepaId}`} />
						<section className={styles.addPreparation}>
							<Card title="Ajouter une étape">
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
												onFocus={() => clearError("description")}></textarea>
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
											/>
											<select
												name="jour"
												id="jour"
												ref={inputStep.jour}
												onFocus={() => clearError("jour")}>
												<option value="0">Choisir</option>
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

export const getServerSideProps = async (ctx) => {
	const { id } = await ctx.query;
	return {
		props: {
			prepaId: id,
		},
	};
};

export default StepAdd;

/*
import TextField from "@material-ui/core/TextField";
import dateFormat from "dateFormat"
const now = new Date();
const date = `${dateFormat(now, "isoDate")}T${dateFormat(now, "isoTime")}`;
<Controller
  as={
    <TextField id="datetime-local" type="datetime-local" />
  }
  defaultValue={date}
  name="time"
  control={control}
/>
*/
