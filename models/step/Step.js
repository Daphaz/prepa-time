import mongoose from "mongoose";
import VerifyJWT from "../../utils/verifyJWT";

const Schema = mongoose.Schema;

const stepSchema = new Schema({
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
	time: Date,
});

let steps;
try {
	steps = mongoose.model("steps");
} catch (error) {
	steps = mongoose.model("steps", stepSchema);
}

const modelStep = {
	add: async (req, res) => {
		const { title, description, prepa, image_url, time } = req.body;
		const id = await VerifyJWT(req, res);
		try {
			if (image_url) {
				const response = await steps.create({
					title,
					description,
					prepa,
					time,
					image_url,
					id_user: id,
				});
				if (response) {
					const { prepas: Prepas } = mongoose.connection.models;
					const resp = await Prepas.findOne({ _id: prepa, id_user: id });
					if (resp) {
						await Prepas.updateOne(
							{ _id: prepa, id_user: id },
							{
								steps_id: [...resp.steps_id, response._id],
							}
						);
						res.json({
							sucess: true,
							data: "Nouvelle etape ajoutée",
						});
						return;
					} else {
						res.json({
							sucess: false,
						});
						return;
					}
				} else {
					res.json({
						sucess: false,
					});
					return;
				}
			} else {
				const response = await steps.create({
					title,
					description,
					prepa,
					time,
					id_user: id,
				});
				if (response) {
					const { prepas: Prepas } = mongoose.connection.models;
					const resp = await Prepas.findOne({ _id: prepa, id_user: id });
					if (resp) {
						await Prepas.updateOne(
							{ _id: prepa, id_user: id },
							{
								steps_id: [...resp.steps_id, response._id],
							}
						);
						res.json({
							sucess: true,
							data: "Nouvelle etape ajoutée",
						});
						return;
					} else {
						res.json({
							sucess: false,
						});
						return;
					}
				} else {
					res.json({
						sucess: false,
					});
					return;
				}
			}
		} catch (error) {
			console.log("StepAdd: ", error);
		}
	},
	get: async (req, res) => {
		const id = await VerifyJWT(req, res);
		const { prepa } = req.query;
		if (prepa) {
			const step = await ingredients.find({ id_user: id, prepa: prepa });
			if (ign.length > 0) {
				res.json({
					sucess: true,
					data: step,
				});
				return;
			} else {
				res.json({
					sucess: false,
				});
				return;
			}
		}
	},
};

export default modelStep;
