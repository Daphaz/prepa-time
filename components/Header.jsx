import React, { useRef } from "react";
import styles from "../styles/components/header.module.css";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
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
	return (
		<>
			<header className={styles.header}>
				<div className={styles.logo} onClick={handleLogo}>
					PrepaTime.
				</div>
				<nav className={styles.navbar}>
					<ul>
						{!isAuthenticated ? (
							<>
								<li className={styles.navlinks}>
									<Link href="/explorer">
										<a>Explorer</a>
									</Link>
								</li>
								<li className={styles.navlinks}>
									<Link href="/utiliser">
										<a>Utiliser</a>
									</Link>
								</li>
								<li className={styles.navlinks}>
									<Link href="/contact">
										<a>Contact</a>
									</Link>
								</li>
							</>
						) : (
							<>
								<li className={styles.navlinks}>
									<Link href="/preparation">
										<a>Preparation</a>
									</Link>
								</li>
								<li className={styles.navlinks}>
									<Link href="programmer">
										<a>Programmer</a>
									</Link>
								</li>
							</>
						)}
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
						<span onClick={logout}>
							<ExitToAppIcon className={styles.iconLogout} />
						</span>
					</div>
				)}
				<div className={styles.hamburger} onClick={handleMenuOpen} ref={burger}>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</header>
			<div className={styles.menu} ref={menuOpen}>
				<div className="bgMenu">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
						<path
							fillOpacity="1"
							d="M0,96L48,112C96,128,192,160,288,154.7C384,149,480,107,576,117.3C672,128,768,192,864,229.3C960,267,1056,277,1152,250.7C1248,224,1344,160,1392,128L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
					</svg>
				</div>
				<nav>
					<ul>
						{!isAuthenticated ? (
							<>
								<li>
									<Link href="/explorer">
										<a className={styles.navlinks}>Explorer</a>
									</Link>
								</li>
								<li>
									<Link href="/utiliser">
										<a className={styles.navlinks}>Utiliser</a>
									</Link>
								</li>
								<li>
									<Link href="/contact">
										<a className={styles.navlinks}>Contact</a>
									</Link>
								</li>
							</>
						) : (
							<>
								<li>
									<Link href="/preparation">
										<a className={styles.navlinks}>Preparation</a>
									</Link>
								</li>
								<li>
									<Link href="programmer">
										<a className={styles.navlinks}>Programmer</a>
									</Link>
								</li>
								<li className={styles.navlinks} onClick={logout}>
									<span>Deconnexion</span>
								</li>
							</>
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
								<li className={styles.login}>
									<Link href="/login">
										<a>Se connecter</a>
									</Link>
								</li>
								<li className={styles.signup}>
									<Link href="/signup">
										<a>S'inscrire</a>
									</Link>
								</li>
							</>
						)}
					</ul>
				</nav>
			</div>
		</>
	);
};
