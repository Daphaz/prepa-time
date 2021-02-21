import React, { useRef } from "react";
import styles from "../styles/components/header.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import useAuth from "../auth/context";

export const Header = () => {
	const { logout, user, isAuthenticated } = useAuth();
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
	const handleLogout = () => {
		logout();
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
					{isAuthenticated && user.role === "admin" && (
						<li>
							<Link href="/dashboard">
								<a className={styles.navlinks}>Dashboard</a>
							</Link>
						</li>
					)}
				</ul>
			</nav>
			<div className={styles.connexion}>
				{!isAuthenticated && (
					<>
						<Link href="/login">
							<a className={styles.login}>Se connecter</a>
						</Link>
						<Link href="/signup">
							<a className={styles.signup}>S'inscrire</a>
						</Link>
					</>
				)}
			</div>
			{isAuthenticated && (
				<div className={styles.profile}>
					<img
						src={user.picture}
						alt="profile picture"
						width="40px"
						height="40px"
					/>
					<span onClick={logout}>Deconnexion</span>
				</div>
			)}
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
						{isAuthenticated && (
							<li onClick={logout}>
								<span>Deconnexion</span>
							</li>
						)}
						{isAuthenticated && user.role === "admin" && (
							<li>
								<Link href="/dashboard">
									<a className={styles.navlinks}>Dashboard</a>
								</Link>
							</li>
						)}
						{!isAuthenticated && (
							<>
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
							</>
						)}
					</ul>
				</nav>
			</div>
		</header>
	);
};
