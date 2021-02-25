import mongoose from "mongoose";

export const Steps =
	mongoose.models.Steps ||
	mongoose.model(
		"Steps",
		new mongoose.Schema({
			title: String,
			description: String,
			prepa: String,
			id_user: String,
			image_url: {
				type: String,
				default:
					"https://res.cloudinary.com/daphaz/image/upload/v1614229858/estate-agency/preparation/w4agpvkraq6zgzbh81vo.jpg",
			},
			createdAt: {
				type: Date,
				default: Date.now(),
			},
			updatedAt: {
				type: Date,
				default: Date.now(),
			},
			time: String,
		})
	);
