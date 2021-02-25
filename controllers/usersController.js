import { Users, ResetPass } from "../models";
import { resetPass } from "../models/email";
import sendEmail from "../utils/configEmail";
import bcrypt from "bcrypt";
import randToken from "rand-token";
import jwt from "jsonwebtoken";
import VerifyJWT from "../utils/verifyJWT";

const controllerUsers = {
	signUp: async (req, res) => {
		const { email, username, password } = req.body;
		try {
			const testEmail = await Users.findOne({ email });
			const testUsername = await Users.findOne({ username });
			if (testEmail) {
				if (testUsername) {
					res.status(200).send({
						success: false,
						data: ["email", "username"],
					});
					return;
				}
				res.status(200).send({
					success: false,
					data: ["email"],
				});
				return;
			}
			if (testUsername) {
				res.status(200).send({
					success: false,
					data: ["username"],
				});
				return;
			}
			const salt = await bcrypt.genSalt(12);
			const hash = bcrypt.hashSync(password, salt);
			await Users.create({
				email,
				username,
				salt,
				hash,
			});
			res.status(200).send({
				success: true,
				data: "Votre compte à bien été crée",
			});
			return;
		} catch (error) {
			res.status(error.code).send(error.message);
		}
	},
	login: async (req, res) => {
		const { username, password } = req.body;
		try {
			if (username && password) {
				const user = await Users.findOne({ username });
				if (!user) {
					res.status(204).send();
					return;
				}
				const response = await bcrypt.compare(password, user.hash);
				if (response) {
					const id = user._id;
					const token = jwt.sign({ id }, process.env.JWT_TOKEN, {
						expiresIn: 21600, //300
					});
					res.status(200).send({
						success: true,
						data: token,
					});
					return;
				}
				res.status(204).send();
				return;
			}
			res.status(204).send();
			return;
		} catch (error) {
			res.status(error.code).send(error.message);
		}
	},
	userInfo: async (req, res) => {
		try {
			const id = await VerifyJWT(req, res);
			if (id) {
				const user = await Users.findOne({ _id: id });
				const { createdAt, email, picture, role, username, _id } = user;
				res.status(200).send({
					success: true,
					data: {
						createdAt,
						email,
						picture,
						role,
						username,
						_id,
					},
				});
				return;
			}
			res.status(204).send();
			return;
		} catch (error) {
			res.status(error.code).send(error.message);
		}
	},
	forgot: async (req, res) => {
		const { username } = req.body;
		try {
			if (username) {
				const findUser = await Users.findOne({ username });
				if (findUser) {
					const token = randToken.generate(24);
					await ResetPass.create({
						username: findUser.username,
						resetPasswordToken: token,
						resetPasswordExpires: Date.now() + 3600000,
					});
					const subject = "Votre lien pour reset votre mot de passe ✅";
					const html = await resetPass(findUser.username, token);
					const sucessMessage =
						"Votre nouveaux mot de passe vous as été envoyé sur votre email.";
					await sendEmail(res, findUser.email, subject, html, sucessMessage);
				}
				res.status(204).send();
				return;
			}
			res.status(204).send();
			return;
		} catch (error) {
			res.status(error.code).send(error.message);
		}
	},
	tokenReset: async (req, res) => {
		const { token } = req.body;
		const date = Date.now();
		try {
			const result = await ResetPass.findOne({
				resetPasswordToken: token,
				resetPasswordExpires: { $gt: date },
			});
			if (result) {
				res.status(200).send({
					sucess: true,
					data: result,
				});
			}
			res.status(204).send();
			return;
		} catch (error) {
			res.status(error.code).send(error.message);
		}
	},
	reset: async (req, res) => {
		const { password, token } = req.body;
		const date = Date.now();
		try {
			const result = await ResetPass.findOne({
				resetPasswordToken: token,
				resetPasswordExpires: { $gt: date },
			});
			if (result) {
				const salt = await bcrypt.genSalt(12);
				const hash = bcrypt.hashSync(password, salt);
				const UpdateUser = await Users.findOneAndUpdate(
					{ username: result.username },
					{
						salt,
						hash,
					}
				);
				if (UpdateUser) {
					const updateReset = {
						resetPasswordToken: null,
						resetPasswordExpires: null,
					};
					const update = await ResetPass.findOneAndUpdate(
						{ resetPasswordToken: token },
						updateReset
					);
					if (update) {
						res.status(200).send({
							sucess: true,
							data: "Nouveaux mot de passe bien enregistré !",
						});
						return;
					}
					res.status(204).send();
					return;
				}
			}
			res.status(204).send();
			return;
		} catch (error) {
			res.status(error.code).send(error.message);
		}
	},
};

export default controllerUsers;
