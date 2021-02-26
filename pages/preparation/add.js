import React from "react";
import { Layout } from "../../components/Layout";
import { Card } from "../../components/Card";
import styles from "../../styles/formPreparation.module.css";
import { ProtectedRoute } from "../../auth/protectedRoute";
import { useForm } from "react-hook-form";
import useAuth from "../../auth/context";
import { apiPost } from "../../auth/axios";
import { useRouter } from "next/router";

const Add = () => {
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
			query.title = d.title;
			query.description = d.description;
			query.type = d.type;
		} else {
			query.title = d.title;
			query.description = d.description;
			query.image_url = d.image_url;
			query.type = d.type;
		}
		try {
			const { data } = await apiPost("/api/preparation", query);
			if (data.sucess) {
				setValue("title", "");
				setValue("description", "");
				setValue("image_url", "");
				setValue("type", "");
				router.push("/preparation");
			} else {
				setError("image_url", {
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
			{isAuthenticated && (
				<Layout>
					<div className="container">
						<section className={styles.addPreparation}>
							<Card title="Nouvelle préparation">
								<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
									<div className={styles.formGroup}>
										<label htmlFor="title">Titre</label>
										<input
											type="text"
											id="title"
											name="title"
											className={styles.inpText}
											ref={prepa.title}
											onFocus={() => clearError("title")}
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
											ref={prepa.image_url}
											onFocus={() => clearError("image_url")}
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
											onFocus={() => clearError("type")}>
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
	);
};

export default ProtectedRoute(Add);
