import React, { useState } from "react";
import { Layout } from "../../../components/Layout";
import { Card } from "../../../components/Card";
import { BtnReturn } from "../../../components/BtnReturn";
import styles from "../../../styles/formPreparation.module.css";
import TextField from "@material-ui/core/TextField";
import { fieldDate, startDateTime } from "../../../utils/dateFormated";
import useAuth from "../../../auth/context";
import { getCookieFromServer } from "../../../auth/cookies";
import api, { apiPost } from "../../../auth/axios";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import ErrorPage from "next/error";

const IdPrepa = ({ prepaId, steps, err }) => {
	const [error, setError] = useState({
		status: false,
		message: "",
	});
	const router = useRouter();
	const { isAuthenticated } = useAuth();
	const now = new Date();
	const date = fieldDate(now);

	const { register, handleSubmit, control } = useForm({
		mode: "onChange",
	});

	const onSubmit = async (d) => {
		const timeStart = startDateTime(d.timeStart);
		const query = {
			...d,
			timeStart,
			prepaId,
		};
		try {
			const { data } = await apiPost("/api/prog", query);
			if (data.sucess) {
				router.push("/programmer");
			} else {
				setError({
					status: true,
					message: "Veuillez choisir au moins une étape a programmer..",
				});
				const timer = () => {
					setError({
						status: false,
						message: "",
					});
				};
				setTimeout(timer, 3000);
				clearTimeout(timer);
			}
		} catch (error) {
			setError({
				status: true,
				message: "Une erreur est survenue, veuillez réessayer plus tard",
			});
			const timer = () => {
				setError({
					status: false,
					message: "",
				});
			};
			setTimeout(timer, 3000);
			clearTimeout(timer);
		}
	};

	return (
		<>
			{isAuthenticated && (
				<Layout>
					<div className="container">
						<BtnReturn url={"/programmer/add"} />
						<section className={styles.addPreparation}>
							<p>
								choissiez une date de début et quelle étape souhaitez vous être
								alerter par email
								<br />
								Vous receverez chaque email <strong>10 minutes</strong> avant le
								début de l'etape
							</p>
							<Card title="Programmation">
								<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
									<div className={styles.formGroup}>
										<label>Date de début</label>
										<Controller
											as={
												<TextField id="datetime-local" type="datetime-local" />
											}
											defaultValue={date}
											name="timeStart"
											control={control}
										/>
									</div>
									<div className={styles.checkboxContainer}>
										{steps &&
											steps.length > 0 &&
											steps.map((step, i) => {
												return (
													<div
														className={styles.formGroupCheckbox}
														key={step._id}>
														<input
															type="checkbox"
															name={`step${i}`}
															ref={register()}
															id="step"
														/>
														<label htmlFor="step">{`etape ${i + 1}: ${
															step.time
														} ${step.unit_time}`}</label>
													</div>
												);
											})}
									</div>
									<button title="btn" type="submit" className={styles.btn}>
										Valider
									</button>
								</form>
							</Card>
							{error.status && (
								<span className={styles.spanError}>{error.message}</span>
							)}
						</section>
					</div>
				</Layout>
			)}
			{err && <ErrorPage statusCode={err.statusCode} />}
		</>
	);
};

export const getServerSideProps = async (ctx) => {
	const token = await getCookieFromServer("token", ctx.req);
	const { id } = ctx.query;
	if (token) {
		api.defaults.headers.Authorization = token;
		const { data } = await api.get(`/api/step?prepa=${id}`);
		if (data.sucess) {
			return {
				props: {
					steps: data.data,
					prepaId: id,
				},
			};
		}
		return {
			props: {
				err: {
					statusCode: 404,
				},
			},
		};
	}
	return {
		props: {
			err: {
				statusCode: 404,
			},
		},
	};
};

export default IdPrepa;
