import mongoose from "mongoose";

export const Ingredients =
	mongoose.models.Ingredients ||
	mongoose.model(
		"Ingredients",
		new mongoose.Schema({
			title: String,
			quantity: Number,
			unit: String,
			prepa: String,
			id_user: String,
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
