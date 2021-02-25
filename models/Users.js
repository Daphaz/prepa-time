import mongoose from "mongoose";

export const Users =
	mongoose.model("Users") ||
	mongoose.model(
		"Users",
		new mongoose.Schema({
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
			updatedAt: {
				type: Date,
				default: Date.now(),
			},
		})
	);

export const ResetPass =
	mongoose.model("Resets") ||
	mongoose.model(
		"Resets",
		new mongoose.Schema({
			username: String,
			resetPasswordToken: String,
			resetPasswordExpires: Number,
		})
	);
