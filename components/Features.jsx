import React from "react";
import styles from "../styles/components/features.module.css";
import Image from "next/image";

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
						<Image
							src="/schedule.svg"
							alt="Programmer icon"
							width={70}
							height={70}
						/>
						<h3>Programmer</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Reprehenderit maiores nam, aperiam minima assumenda.
						</p>
					</div>
					<div className={styles.pics}>
						<Image
							src="/schedule.svg"
							alt="Programmer icon"
							width={70}
							height={70}
						/>
						<h3>Programmer</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Reprehenderit maiores nam, aperiam minima assumenda.
						</p>
					</div>
					<div className={styles.pics}>
						<Image
							src="/schedule.svg"
							alt="Programmer icon"
							width={70}
							height={70}
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
