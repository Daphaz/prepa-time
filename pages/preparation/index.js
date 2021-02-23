import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import styles from "../../styles/preparation.module.css";
import { ProtectedRoute } from "../../auth/protectedRoute";
import useAuth from "../../auth/context";
import { Card } from "../../components/Card";
import { apiGet } from "../../auth/axios";
import { prepaDate } from "../../utils/dateFormat";
import { useRouter } from "next/router";

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

	return (
		<>
			{isAuthenticated && (
				<Layout>
					<div className="container">
						<section className={styles.preparation}>
							<h2>Préparations</h2>
							{items ? (
								<div className={styles.row}>
									{items.map((item) => (
										<div className={styles.item} key={item._id}>
											<Card title={item.title}>
												{item.image_url && (
													<div className={styles.imageCard}>
														<img src={item.image_url} width="100%" />
													</div>
												)}
												<span className={styles.createdAt}>
													{prepaDate(item.createdAt)}
												</span>
											</Card>
										</div>
									))}
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
