import mongoose from "mongoose";

export const Prepas =
	mongoose.models.Prepas ||
	mongoose.model(
		"Prepas",
		new mongoose.Schema({
			title: String,
			description: String,
			image_url: {
				type: String,
				default:
					"https://res.cloudinary.com/daphaz/image/upload/v1614110736/estate-agency/preparation/g2cvcvc1dohhdgnwdkbv.jpg",
			},
			createdAt: {
				type: Date,
				default: Date.now(),
			},
			updatedAt: {
				type: Date,
				default: Date.now(),
			},
			id_user: String,
			time: Date,
			steps_id: [
				{
					type: mongoose.SchemaTypes.ObjectId,
					ref: "steps",
				},
			],
			finish: {
				type: Boolean,
				default: false,
			},
			type: String,
		})
	);
