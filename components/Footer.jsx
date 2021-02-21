import React from "react";
import styles from "../styles/components/footer.module.css";

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.leftFooter}>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
					provident doloremque at!
				</p>
			</div>
			<div className={styles.rightFooter}>
				<ul>
					<li>
						<a href="#">Link1</a>
					</li>
					<li>
						<a href="#">Link2</a>
					</li>
					<li>
						<a href="#">Link3</a>
					</li>
				</ul>
			</div>
			<div className={styles.power}>
				&copy; {new Date().getFullYear()}
				<p>ne doit pas être utilisé comme un kit de démarrage.</p>
			</div>
		</footer>
	);
};
