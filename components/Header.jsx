import React, { useRef } from "react";
import styles from "../styles/components/header.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export const Header = () => {
	const router = useRouter();
	const menuOpen = useRef(null);
	const burger = useRef(null);
	const handleMenuOpen = () => {
		menuOpen.current.classList.toggle("isopen");
		burger.current.classList.toggle("menuOpen");
	};
	const handleLogo = () => {
		router.push("/");
	};
	return (
		<header className={styles.header}>
			<div className={styles.logo} onClick={handleLogo}>
				PrepaTime.
			</div>
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
				<Link href="/login">
					<a className={styles.login}>Se connecter</a>
				</Link>
				<Link href="/signup">
					<a className={styles.signup}>S'inscrire</a>
				</Link>
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
						<li>
							<Link href="/login">
								<a className={styles.login}>Se connecter</a>
							</Link>
						</li>
						<li>
							<Link href="/signup">
								<a className={styles.signup}>S'inscrire</a>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};
