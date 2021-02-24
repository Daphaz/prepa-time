import { StylesProvider } from "@material-ui/core";
import React from "react";
import styles from "../styles/components/card.module.css";

export const Card = ({ title, children, links }) => {
	return (
		<div className={styles.card}>
			<header className={styles.cardHeader}>
				<h2>{title}</h2>
			</header>
			{children}
		</div>
	);
};
