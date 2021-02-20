import React from "react";
import styles from "../styles/components/features.module.css";

export const Features = () => {
	return (
		<section className={styles.features}>
			<div className="container">
				<h2>Why is it so great?</h2>
				<div className={styles.title}>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam.
					</p>
				</div>
				<div className="row">
					<div className={styles.pics}>
						<img
							src="https://www.flaticon.com/svg/vstatic/svg/4245/4245538.svg?token=exp=1613855421~hmac=50b1b7c1fcddf05caa30264311a1a614"
							alt="icon"
							width="70px"
							height="auto"
						/>
						<h3>Programmer</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Reprehenderit maiores nam, aperiam minima assumenda.
						</p>
					</div>
					<div className={styles.pics}>
						<img
							src="https://www.flaticon.com/svg/vstatic/svg/4245/4245538.svg?token=exp=1613855421~hmac=50b1b7c1fcddf05caa30264311a1a614"
							alt="icon"
							width="70px"
							height="auto"
						/>
						<h3>Programmer</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Reprehenderit maiores nam, aperiam minima assumenda.
						</p>
					</div>
					<div className={styles.pics}>
						<img
							src="https://www.flaticon.com/svg/vstatic/svg/4245/4245538.svg?token=exp=1613855421~hmac=50b1b7c1fcddf05caa30264311a1a614"
							alt="icon"
							width="70px"
							height="auto"
						/>
						<h3>Programmer</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Reprehenderit maiores nam, aperiam minima assumenda.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};
