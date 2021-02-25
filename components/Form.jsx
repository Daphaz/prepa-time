import React, { useState } from "react";
import styles from "../styles/form.module.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Link from "next/link";

const initalState = {
	toggle1: true,
	toggle2: true,
	secure1: true,
	secure2: true,
};

export const Form = ({ login, signup, forgot, reset, logic }) => {
	const [state, setState] = useState(initalState);
	const { onSubmitLogic, clearError, errors, isValid, users } = logic();

	const handleVisible = (value) => {
		if (value === 1) {
			setState({
				...state,
				toggle1: !state.toggle1,
				secure1: !state.secure1,
			});
		} else {
			setState({
				...state,
				toggle2: !state.toggle2,
				secure2: !state.secure2,
			});
		}
	};

	return (
		<>
			{login && (
				<form
					className={styles.form}
					onSubmit={onSubmitLogic}
					autoComplete="off">
					<div className={styles.formGroup}>
						<label htmlFor="username">Nom d'utilisateur</label>
						<input
							title="inpUsername"
							autoComplete="username"
							type="text"
							name="username"
							id="username"
							ref={users.username}
							onFocus={() => clearError("username")}
						/>
						{errors.username && <span>{errors.username.message}</span>}
					</div>
					<div className={styles.formGroup}>
						<label htmlFor="password">Mot de passe</label>
						<input
							title="inpPass"
							autoComplete="current-password"
							type="password"
							name="password"
							id="password"
							ref={users.password}
							onFocus={() => clearError("password")}
						/>
						{errors.password && <span>{errors.password.message}</span>}
					</div>
					<button
						title="btn"
						type="submit"
						className={styles.btn}
						disabled={!isValid}>
						Valider
					</button>
					<div className={styles.links}>
						<Link href="/reset">
							<a>Mot de passe oublié ?</a>
						</Link>
					</div>
				</form>
			)}
			{signup && (
				<form
					className={styles.form}
					onSubmit={onSubmitLogic}
					autoComplete="off">
					<div className={styles.formGroup}>
						<label htmlFor="email">Email</label>
						<input
							autoComplete="off"
							type="email"
							name="email"
							id="email"
							ref={users.email}
							onFocus={() => clearError("email")}
						/>
						{errors.email && <span>{errors.email.message}</span>}
					</div>
					<div className={styles.formGroup}>
						<label htmlFor="username">Nom d'utilisateur</label>
						<input
							autoComplete="off"
							type="text"
							name="username"
							id="username"
							ref={users.username}
							onFocus={() => clearError("username")}
						/>
						{errors.username && <span>{errors.username.message}</span>}
					</div>
					<div className={styles.formGroup}>
						<label htmlFor="password">Mot de passe</label>
						<input
							autoComplete="off"
							type="password"
							name="password"
							id="password"
							ref={users.password}
							onFocus={() => clearError("password")}
						/>
						{errors.password && <span>{errors.password.message}</span>}
					</div>
					<button type="submit" className={styles.btn} disabled={!isValid}>
						Valider
					</button>
				</form>
			)}
			{forgot && (
				<form
					className={styles.form}
					autoComplete="off"
					onSubmit={onSubmitLogic}>
					<div className={styles.formGroup}>
						<label htmlFor="username">Nom d'utilisateur</label>
						<input
							autoComplete="username"
							type="text"
							name="username"
							id="username"
							ref={users.username}
							onFocus={() => clearError("username")}
						/>
						{errors.username && <span>{errors.username.message}</span>}
					</div>
					<button type="submit" className={styles.btn} disabled={!isValid}>
						Valider
					</button>
				</form>
			)}
			{reset && (
				<form
					className={styles.form}
					onSubmit={onSubmitLogic}
					autoComplete="off">
					<div className={styles.formGroup}>
						<label htmlFor="password">Mot de passe</label>
						<input
							autoComplete="off"
							type={state.secure1 ? "password" : "text"}
							name="password"
							id="password"
							ref={users.password}
							onFocus={() => clearError("password")}
						/>
						{state.toggle1 ? (
							<VisibilityIcon
								className={styles.iconEye}
								onClick={() => handleVisible(1)}
							/>
						) : (
							<VisibilityOffIcon
								className={styles.iconEye}
								onClick={() => handleVisible(1)}
							/>
						)}
						{errors.password && <span>{errors.password.message}</span>}
					</div>
					<div className={styles.formGroup}>
						<label htmlFor="pass2">Retapez votre mot de passe</label>
						<input
							autoComplete="off"
							type={state.secure2 ? "password" : "text"}
							name="pass2"
							id="pass2"
							ref={users.pass2}
							onFocus={() => clearError("pass2")}
						/>
						{state.toggle2 ? (
							<VisibilityIcon
								className={styles.iconEye}
								onClick={() => handleVisible(2)}
							/>
						) : (
							<VisibilityOffIcon
								className={styles.iconEye}
								onClick={() => handleVisible(2)}
							/>
						)}
						{errors.pass2 && <span>{errors.pass2.message}</span>}
					</div>
					<button type="submit" className={styles.btn} disabled={!isValid}>
						Valider
					</button>
				</form>
			)}
		</>
	);
};
