import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import styles from "../../styles/preparation.module.css";
import { ProtectedRoute } from "../../auth/protectedRoute";
import useAuth from "../../auth/context";
import { Card } from "../../components/Card";
import { apiGet } from "../../auth/axios";
import { prepaDate } from "../../utils/dateFormat";
import { useRouter } from "next/router";
import EditIcon from "@material-ui/icons/Edit";

const Preparation = () => {
	const [items, setItems] = useState();
	const { isAuthenticated } = useAuth();
	const router = useRouter();

	async function getitems() {
		const { data } = await apiGet("/api/preparation");
		if (data.sucess) {
			setItems(data.data);
		}
	}

	useEffect(() => {
		getitems();
	}, []);

	const handleClick = () => {
		router.push("/preparation/add");
	};

	const handleItem = (id) => {
		router.push(`/preparation/${id}`);
	};

	const handleEdit = (id) => {
		router.push(`/preparation/${id}/edit`);
	};

	return (
		<>
			{isAuthenticated && (
				<Layout>
					<div className="container">
						<section className={styles.preparation}>
							<h2>Préparations</h2>
							{items ? (
								<div className={styles.row}>
									{items.map((item) => {
										const parseCreatedAt = Date.parse(item.createdAt);
										const parseUpdatedAt = Date.parse(item.updatedAt);
										const date =
											parseUpdatedAt > parseCreatedAt
												? item.updatedAt
												: item.createdAt;
										return (
											<div className={styles.item} key={item._id}>
												{item.finish ? (
													<span className={styles.finishLabelValid}>
														Terminer
													</span>
												) : (
													<span className={styles.finishLabel}>en cour..</span>
												)}
												<span
													className={styles.editLabel}
													onClick={() => handleEdit(item._id)}>
													<EditIcon fontSize="small" />
												</span>
												<Card title={item.title}>
													{item.image_url && (
														<div
															className={styles.imageCard}
															onClick={() => handleItem(item._id)}>
															<img src={item.image_url} width="100%" />
														</div>
													)}
													<div className={styles.footerCard}>
														<span className={styles.typeItem}>{item.type}</span>
														<span className={styles.createdAt}>
															{prepaDate(date)}
														</span>
													</div>
												</Card>
											</div>
										);
									})}
								</div>
							) : (
								<h4>Vous n'avez pas encore de préparations</h4>
							)}
							<button className={styles.btn} onClick={handleClick}>
								Ajouter une preparation
							</button>
						</section>
					</div>
				</Layout>
			)}
		</>
	);
};

export default ProtectedRoute(Preparation);
