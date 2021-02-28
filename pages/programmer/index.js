import React from "react";
import { Layout } from "../../components/Layout";
import styles from "../../styles/preparation.module.css";
import useAuth from "../../auth/context";
import { Card } from "../../components/Card";
import { apiGet } from "../../auth/axios";
import { prepaDate } from "../../utils/dateFormated";
import { useRouter } from "next/router";
import AlarmOnIcon from "@material-ui/icons/AlarmOn";
import ScheduleIcon from "@material-ui/icons/Schedule";
import useSWR from "swr";
import { ProtectedRoute } from "../../auth/protectedRoute";

const fetcher = (url) => apiGet(url).then((res) => res.data.data);

const Programmer = () => {
	const { isAuthenticated } = useAuth();
	const router = useRouter();

	const { data: progItems } = useSWR("/api/prog", fetcher);

	const handleClick = () => {
		router.push("/programmer/add");
	};

	return (
		<>
			{isAuthenticated && (
				<Layout>
					<div className="container">
						<section className={styles.preparation}>
							<h2>Programmation</h2>
							{progItems ? (
								<div className={styles.row}>
									{progItems.map((item) => {
										const date = Date.parse(item.createdAt);
										return (
											<div className={styles.item} key={item._id}>
												<Card title={item.prepaTitle}>
													<div className={styles.imageCard}>
														<img src={item.image_url} width="100%" />
													</div>
													{item.scheduleDate.every(
														(val) => val.status === true
													) ? (
														<span className={styles.finishLabelValid}>
															Terminer
														</span>
													) : (
														<span className={styles.finishLabel}>
															en cour..
														</span>
													)}
													<div className={styles.cardBody}>
														{item.scheduleDate.map((val) => (
															<div className={styles.schedule} key={val.id}>
																<strong>{val.stepInfo.temp}</strong>
																<span>{val.stepInfo.unit}</span>
																{val.status ? (
																	<AlarmOnIcon color="primary" />
																) : (
																	<ScheduleIcon color="action" />
																)}
															</div>
														))}
													</div>
													<div className={styles.footerCard}>
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
								<h4>Vous n'avez pas encore de préparation programmé</h4>
							)}
							<button className={styles.btn} onClick={handleClick}>
								Créer une programmation
							</button>
						</section>
					</div>
				</Layout>
			)}
		</>
	);
};

export default ProtectedRoute(Programmer);
