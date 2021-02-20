import React, { useRef } from "react";
import styles from "../styles/components/header.module.css";

export const Header = () => {
	const menuOpen = useRef(null);
	const burger = useRef(null);
	const handleMenuOpen = () => {
		menuOpen.current.classList.toggle("isopen");
		burger.current.classList.toggle("menuOpen");
	};
	return (
		<header className={styles.header}>
			<div className={styles.logo}>PrepaTime.</div>
			<nav className={styles.navbar}>
				<ul>
					<li className={styles.navlinks}>
						<a href="#">Explorer</a>
					</li>
					<li className={styles.navlinks}>
						<a href="#">Utiliser</a>
					</li>
					<li className={styles.navlinks}>
						<a href="#">Contact</a>
					</li>
				</ul>
			</nav>
			<div className={styles.connexion}>
				<div className={styles.login}>
					<a href="#">Se connecter</a>
				</div>
				<div className={styles.signup}>
					<a href="#">S'inscrire</a>
				</div>
			</div>
			<div className={styles.hamburger} onClick={handleMenuOpen} ref={burger}>
				<span></span>
				<span></span>
				<span></span>
			</div>
			<div className={styles.menu} ref={menuOpen}>
				<div className="bgMenu"></div>
				<nav>
					<ul>
						<li>
							<a href="#">Explorer</a>
						</li>
						<li>
							<a href="#">Utiliser</a>
						</li>
						<li>
							<a href="#">Contact</a>
						</li>
						<div className={styles.login}>
							<a href="#">Se connecter</a>
						</div>
						<div className={styles.signup}>
							<a href="#">S'inscrire</a>
						</div>
					</ul>
				</nav>
			</div>
		</header>
	);
};
