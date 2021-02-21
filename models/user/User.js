import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import VerifyJWT from "../../utils/verifyJWT";

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

let users;
try {
	users = mongoose.model("users");
} catch (error) {
	users = mongoose.model("users", usersSchema);
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
};

export default modelUsers;
