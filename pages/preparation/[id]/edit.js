import React from "react";
import { Layout } from "../../../components/Layout";
import { Card } from "../../../components/Card";
import { BtnReturn } from "../../../components/BtnReturn";
import styles from "../../../styles/formPreparation.module.css";
import { useForm } from "react-hook-form";
import useAuth from "../../../auth/context";
import api, { apiPut } from "../../../auth/axios";
import { useRouter } from "next/router";
import { getCookieFromServer } from "../../../auth/cookies";
import ErrorPage from "next/error";

const EditPrepa = ({ info, err }) => {
	const router = useRouter();
	const { isAuthenticated } = useAuth();
	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		setValue,
		formState,
	} = useForm({
		mode: "onChange",
	});
	const { errors, isValid } = formState;

	const prepa = {
		title: register({
			required: "ajouter un titre",
		}),
		type: register({
			required: "choissiez un type",
		}),
		description: register({
			required: "ajouter un conseil",
			maxLength: {
				value: 500,
				message: "maximum 500 caractères",
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
		const query = {};
		if (d.image_url === "") {
			query.prepaId = info._id;
			query.title = d.title;
			query.description = d.description;
			query.type = d.type;
		} else {
			query.prepaId = info._id;
			query.title = d.title;
			query.description = d.description;
			query.image_url = d.image_url;
			query.type = d.type;
		}
		try {
			const { data } = await apiPut("/api/preparation", query);
			if (data.sucess) {
				setValue("title", "");
				setValue("description", "");
				setValue("image_url", "");
				setValue("type", "");
				router.push("/preparation");
			} else {
				setError("type", {
					type: "manual",
					message: "Une erreur est survenue, veuillez recommencer..",
				});
				setValue("title", "");
				setValue("description", "");
				setValue("image_url", "");
			}
		} catch (error) {
			console.log("Preparation: ", error);
		}
	};

	return (
		<>
			{!err ? (
				<>
					{isAuthenticated && (
						<Layout>
							<div className="container">
								<BtnReturn url={"/preparation"} />
								<section className={styles.addPreparation}>
									<Card title="Edition préparation">
										<form
											className={styles.form}
											onSubmit={handleSubmit(onSubmit)}>
											<div className={styles.formGroup}>
												<label htmlFor="title">Titre</label>
												<input
													type="text"
													id="title"
													name="title"
													className={styles.inpText}
													ref={prepa.title}
													onFocus={() => clearError("title")}
													defaultValue={info.title}
												/>
												{errors.title && <span>{errors.title.message}</span>}
											</div>
											<div className={styles.formGroup}>
												<label htmlFor="description">Conseil</label>
												<div className={styles.areaContainer}>
													<textarea
														name="description"
														id="description"
														minLength="1"
														maxLength="510"
														ref={prepa.description}
														onFocus={() => clearError("description")}
														defaultValue={info.description}></textarea>
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
													ref={prepa.image_url}
													onFocus={() => clearError("image_url")}
													defaultValue={info.image_url}
												/>
												{errors.image_url && (
													<span>{errors.image_url.message}</span>
												)}
											</div>
											<div className={styles.formGroup}>
												<label htmlFor="type">Type</label>
												<select
													id="type"
													name="type"
													className={styles.inpText}
													ref={prepa.type}
													onFocus={() => clearError("type")}
													defaultValue={info.type}>
													<option value="private">Privé</option>
													<option value="public">Public</option>
												</select>
												{errors.type && <span>{errors.type.message}</span>}
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
			) : (
				<ErrorPage statusCode={err.statusCode} />
			)}
		</>
	);
};

export const getServerSideProps = async (ctx) => {
	const { id } = await ctx.query;
	const token = await getCookieFromServer("token", ctx.req);
	if (token) {
		api.defaults.headers.Authorization = token;
		const { data } = await api.get(`/api/preparation`, {
			params: {
				id,
			},
		});
		if (data.sucess) {
			return {
				props: {
					info: data.data[0],
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

export default EditPrepa;
