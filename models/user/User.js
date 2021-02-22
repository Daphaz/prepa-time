import mongoose from "mongoose";
import bcrypt from "bcrypt";
import randToken from "rand-token";
import jwt from "jsonwebtoken";
import VerifyJWT from "../../utils/verifyJWT";
import { resetPass } from "../email";
import sendEmail from "../../utils/configEmail";

const Schema = mongoose.Schema;

const usersSchema = new Schema({
	email: String,
	username: String,
	hash: String,
	salt: String,
	picture: {
		type: String,
		default:
			"https://res.cloudinary.com/daphaz/image/upload/v1613917940/estate-agency/users/atyqdlxoldr7c1totblp.png",
	},
	role: {
		type: String,
		default: "user",
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

const resetSchema = new Schema({
	username: String,
	resetPasswordToken: String,
	resetPasswordExpires: Number,
});

let users;
let resets;
try {
	users = mongoose.model("users");
	resets = mongoose.model("resets");
} catch (error) {
	users = mongoose.model("users", usersSchema);
	resets = mongoose.model("resets", resetSchema);
}

const modelUsers = {
	signUp: async (req, res) => {
		const { email, username, password } = req.body;
		try {
			const testEmail = await users.findOne({ email: email });
			const testUsername = await users.findOne({ username: username });
			if (testEmail) {
				if (testUsername) {
					res.json({
						success: false,
						data: ["email", "username"],
					});
					return;
				} else {
					res.json({
						success: false,
						data: ["email"],
					});
					return;
				}
			} else {
				if (testUsername) {
					res.json({
						success: false,
						data: ["username"],
					});
					return;
				}
				const salt = await bcrypt.genSalt(12);
				const hash = bcrypt.hashSync(password, salt);
				const newUser = new users({
					email,
					username,
					salt,
					hash,
				});
				newUser.save((err) => {
					if (err) {
						res.json({
							success: false,
							data: err,
						});
						return;
					} else {
						res.json({
							success: true,
							data: "Votre compte à bien été crée",
						});
						return;
					}
				});
			}
		} catch (error) {
			console.log("SignUp: ", error);
		}
	},
	login: async (req, res) => {
		const { username, password } = req.body;

		try {
			if (username && password) {
				const user = await users.findOne({ username });
				if (!user) {
					res.json({
						success: false,
						data: "",
					});
					return;
				} else {
					const response = await bcrypt.compare(password, user.hash);
					if (response) {
						const id = user._id;
						const token = jwt.sign({ id }, process.env.JWT_TOKEN, {
							expiresIn: 300,
						});
						res.json({
							success: true,
							data: token,
						});
						return;
					} else {
						res.json({
							success: false,
							data: "",
						});
						return;
					}
				}
			} else {
				res.json({
					success: false,
				});
				return;
			}
		} catch (error) {
			console.log("Login: ", error);
		}
	},
	userInfo: async (req, res) => {
		try {
			const id = await VerifyJWT(req, res);
			if (id) {
				const user = await users.findOne({ _id: id });
				const { createdAt, email, picture, role, username, _id } = user;
				res.json({
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
			} else {
				res.json({
					success: false,
				});
				return;
			}
		} catch (error) {
			console.log("UserInfo: ", error);
		}
	},
	forgot: async (req, res) => {
		const { username } = req.body;

		try {
			if (username) {
				const findUser = await users.findOne({ username: username });
				if (findUser) {
					const token = randToken.generate(24);
					resets.create({
						username: findUser.username,
						resetPasswordToken: token,
						resetPasswordExpires: Date.now() + 3600000,
					});
					const subject = "Votre lien pour reset votre mot de passe ✅";
					const html = await resetPass(findUser.username, token);
					await sendEmail(res, findUser.email, subject, html);
				} else {
					res.json({
						success: false,
					});
					return;
				}
			} else {
				res.json({
					success: false,
				});
				return;
			}
		} catch (error) {
			console.log("Forgot: ", error);
		}
	},
	tokenReset: async (req, res) => {
		const { token } = req.body;
		const date = Date.now();
		try {
			const result = await resets.findOne({
				resetPasswordToken: token,
				resetPasswordExpires: { $gt: date },
			});
			if (result) {
				res.send({
					sucess: true,
					data: result,
				});
			} else {
				res.send({
					sucess: false,
				});
			}
		} catch (error) {
			console.log("TokenReset: ", error);
		}
	},
	reset: async (req, res) => {
		const { password, token } = req.body;
		const date = Date.now();
		try {
			const result = await resets.findOne({
				resetPasswordToken: token,
				resetPasswordExpires: { $gt: date },
			});
			if (result) {
				const salt = await bcrypt.genSalt(12);
				const hash = bcrypt.hashSync(password, salt);
				const UpdateUser = await users.findOneAndUpdate(
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
					const update = await resets.findOneAndUpdate(
						{ resetPasswordToken: token },
						updateReset
					);
					if (update) {
						res.json({
							sucess: true,
							data: "Nouveaux mot de passe bien enregistré !",
						});
						return;
					}
				}
			} else {
				res.json({
					sucess: false,
				});
				return;
			}
		} catch (error) {
			console.log("Reset: ", error);
		}
	},
};

export default modelUsers;
