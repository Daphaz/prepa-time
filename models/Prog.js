import mongoose from "mongoose";

export const Progs =
	mongoose.models.Progs ||
	mongoose.model(
		"Progs",
		new mongoose.Schema({
			prepa: String,
			prepaTitle: String,
			image_url: String,
			startDate: Number,
			idUser: String,
			scheduleDate: Array,
			createdAt: {
				type: Date,
				default: Date.now(),
			},
			status: {
				type: Boolean,
				default: false,
			},
		})
	);
