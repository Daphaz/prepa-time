import React, { useState } from "react";
import { Layout } from "../../../components/Layout";
import styles from "../../../styles/formPreparation.module.css";
import table from "../../../styles/components/table.module.css";
import useAuth from "../../../auth/context";
import { getCookieFromServer } from "../../../auth/cookies";
import api, { apiDelete } from "../../../auth/axios";
import { useRouter } from "next/router";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import { stepDate } from "../../../utils/dateFormat";

const Id = ({ info, dataIngredient, dataSteps }) => {
	const [error, setError] = useState({ status: false, message: "" });
	const router = useRouter();
	const { isAuthenticated } = useAuth();

	const handleAddIngredient = () => {
		router.push(`/preparation/${info._id}/ingredient/add`);
	};

	const handleAddStep = () => {
		router.push(`/preparation/${info._id}/step/add`);
	};

	const handleDeleteIng = async (ingredient_id) => {
		const { data } = await apiDelete("/api/ingredient", { ingredient_id });
		if (data.sucess) {
			router.push(`/preparation/${info._id}`);
		} else {
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
	const handleModifyIng = (ingredient_id) => {
		router.push(
			`/preparation/${info._id}/ingredient/modify?ing=${ingredient_id}`
		);
	};

	const handleDeleteStep = async (step_id) => {
		const { data } = await apiDelete("/api/step", { step_id });
		if (data.sucess) {
			router.push(`/preparation/${info._id}`);
		} else {
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

	const handleModifyStep = (step_id) => {
		router.push(`/preparation/${info._id}/step/modify?step=${step_id}`);
	};

	return (
		<>
			{isAuthenticated && (
				<Layout>
					<div className="container">
						{info.finish ? (
							<section className={styles.preparationId}>
								<h2>Prepare</h2>
							</section>
						) : (
							<>
								<section className={styles.preparationId}>
									{dataIngredient && dataSteps && (
										<div className={styles.containerFinish}>
											<button className={styles.finishBtn}>
												Terminer la preparation
											</button>
										</div>
									)}
									<h2>{info.title}</h2>
									<div className={styles.imgContainer}>
										<img src={info.image_url} width="100%" />
									</div>
									<div className={styles.containerBtn}>
										<button
											className={styles.btnAdd}
											onClick={handleAddIngredient}>
											Ajouter un Ingredient
										</button>
										<button
											className={styles.btnAdd}
											disabled={dataIngredient ? false : true}
											onClick={handleAddStep}>
											Ajouter une Etape
										</button>
									</div>
								</section>
								{dataIngredient && dataIngredient.length > 0 ? (
									<section className={styles.sectionIng}>
										<h2>Ingredients disponible</h2>
										{error.status && (
											<span className={styles.spanError}>{error.message}</span>
										)}
										<div className={table.receipe_table}>
											<table>
												<thead>
													<tr>
														<th>Ingredients</th>
														<th>Quantité</th>
														<th>Supprimer</th>
														<th>Modifier</th>
													</tr>
												</thead>
												<tbody>
													{dataIngredient.map((ing) => {
														const unit = ing.unit !== "unité" ? ing.unit : "";
														return (
															<tr key={ing._id}>
																<td> {ing.title} </td>
																<td>{`${ing.quantity} ${unit}`}</td>
																<td>
																	<button
																		className={table.btn_delete}
																		onClick={() => handleDeleteIng(ing._id)}>
																		<CloseIcon fontSize="small" />
																	</button>
																</td>
																<td>
																	<button
																		className={table.btn_modify}
																		onClick={() => handleModifyIng(ing._id)}>
																		<EditIcon fontSize="small" />
																	</button>
																</td>
															</tr>
														);
													})}
												</tbody>
											</table>
										</div>
									</section>
								) : (
									<section className={styles.sectionIng}>
										<h2>Commencer par Ajouter des ingredients</h2>
									</section>
								)}
								{dataSteps && dataSteps.length > 0 && (
									<section className={styles.sectionStep}>
										<h2>Etapes ajoutée</h2>
										<div className={styles.containerStep}>
											{dataSteps.map((step, k) => {
												const parseCreatedAt = Date.parse(step.createdAt);
												const parseUpdatedAt = Date.parse(step.updatedAt);
												const date =
													parseUpdatedAt > parseCreatedAt
														? step.updatedAt
														: step.createdAt;
												return (
													<div key={step._id} className={styles.cardStep}>
														<div className={styles.badgeStep}>{k + 1}</div>
														<h3>{step.title}</h3>
														<div>
															<img
																src={step.image_url}
																alt={`image etape ${k + 1}`}
															/>
														</div>
														<div className={styles.bodyCard}>
															<div className={styles.descCard}>
																<p>{step.description}</p>
															</div>
															<div className={styles.footerCard}>
																<span>
																	Durée:
																	{` ${step.time} ${
																		step.unit_time ? step.unit_time : ""
																	}`}
																</span>
																<span className={styles.fCreated}>
																	{stepDate(date)}
																</span>
															</div>
														</div>
														<div className={styles.btnLinks}>
															<button
																className={table.btn_delete}
																onClick={() => handleDeleteStep(step._id)}>
																<CloseIcon fontSize="small" />
															</button>
															<button
																className={table.btn_modify}
																onClick={() => handleModifyStep(step._id)}>
																<EditIcon fontSize="small" />
															</button>
														</div>
														{error.status && (
															<span className={styles.spanError}>
																{error.message}
															</span>
														)}
													</div>
												);
											})}
										</div>
									</section>
								)}
							</>
						)}
					</div>
				</Layout>
			)}
		</>
	);
};

export const getServerSideProps = async (ctx) => {
	const token = await getCookieFromServer("token", ctx.req);
	const { id } = ctx.query;
	if (token) {
		api.defaults.headers.Authorization = token;
		const { data } = await api.get(`/api/preparation/${id}`);
		if (data.sucess) {
			const info = data.data;
			const { data: res } = await api.get(`/api/ingredient?prepa=${id}`);
			if (res.sucess) {
				const dataIngredient = res.data;
				const { data: steps } = await api.get(`/api/step`, {
					params: {
						prepa: info._id,
					},
				});
				if (steps.sucess) {
					const dataSteps = steps.data;
					return {
						props: {
							info,
							dataIngredient,
							dataSteps,
						},
					};
				} else {
					return {
						props: {
							info,
							dataIngredient,
							dataSteps: null,
						},
					};
				}
			} else {
				return {
					props: {
						info,
						dataIngredient: null,
						dataSteps: null,
					},
				};
			}
		}
	} else {
		return {
			props: {},
		};
	}
};

export default Id;
