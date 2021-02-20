import React from "react";
import styles from "../styles/components/banner.module.css";

export const Banner = () => {
	return (
		<div className={styles.banner}>
			<div className={styles.bg}>
				<img
					src="https://images.pexels.com/photos/326279/pexels-photo-326279.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
					alt="plat de cuisine sur une table"
					width="100%"
					height="100%"
				/>
			</div>
			<div className="container">
				<div className={styles.content}>
					<h1>Lorem ipsum dolor sit amet.</h1>
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis
						sit officia quis itaque impedit iste voluptas, nostrum omnis maxime
						error recusandae. Culpa ad quasi at libero reprehenderit voluptate
						non dolores. Harum dolore incidunt maxime.
					</p>
				</div>
			</div>
		</div>
	);
};
