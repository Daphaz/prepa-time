import React from "react";
import { Layout } from "../../components/Layout";
import { Card } from "../../components/Card";
import styles from "../../styles/formPreparation.module.css";
import { ProtectedRoute } from "../../auth/protectedRoute";
import { useForm } from "react-hook-form";
import useAuth from "../../auth/context";
import { apiPost, apiGet } from "../../auth/axios";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url) => apiGet(url).then((res) => res.data);

const AddProgramme = () => {
	const router = useRouter();
	const { isAuthenticated } = useAuth();

	const { data } = useSWR("/api/preparation?finish=true", fetcher);
	const items = data && data.data;

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

	const prog = {
		prepa: register({
			required: "choissiez un preparation",
			pattern: {
				value: /[^0-9]/g,
				message: "choissiez un preparation",
			},
		}),
	};

	const clearError = (value) => {
		clearErrors(value);
	};

	const onSubmit = async (d) => {
		router.push(`/programmer/${d.prepa}`);
	};

	return (
		<>
			{isAuthenticated && (
				<Layout>
					<div className="container">
						<section className={styles.addPreparation}>
							{items && items.length > 0 ? (
								<Card title="Nouvelle programmation">
									<form
										className={styles.form}
										onSubmit={handleSubmit(onSubmit)}>
										<div className={styles.formGroup}>
											<label htmlFor="prepa">Preparation</label>
											<select
												id="prepa"
												name="prepa"
												className={styles.inpText}
												ref={prog.prepa}
												onFocus={() => clearError("prepa")}>
												<option value="0">Choisir</option>
												{items.map((item) => (
													<option value={item._id} key={item._id}>
														{item.title}
													</option>
												))}
											</select>
											{errors.prepa && <span>{errors.prepa.message}</span>}
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
							) : (
								<h4>
									Vous devez d'abord avoir une preparation avec le statut
									TERMINER
								</h4>
							)}
						</section>
					</div>
				</Layout>
			)}
		</>
	);
};

export default ProtectedRoute(AddProgramme);
