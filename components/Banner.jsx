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
			<div className={styles.svgBottom}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
					<path
						fill="#fcfcff"
						fill-opacity="1"
						d="M0,160L60,181.3C120,203,240,245,360,240C480,235,600,181,720,160C840,139,960,149,1080,149.3C1200,149,1320,139,1380,133.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
				</svg>
			</div>
		</div>
	);
};
