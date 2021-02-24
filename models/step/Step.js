import mongoose from "mongoose";
import VerifyJWT from "../../utils/verifyJWT";

const Schema = mongoose.Schema;

const stepSchema = new Schema({
	title: String,
	description: String,
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
	time: Number,
});

let steps;
try {
	steps = mongoose.model("steps");
} catch (error) {
	steps = mongoose.model("steps", stepSchema);
}

const modelStep = {
	add: async (req, res) => {
		const { title, description, prepa, time } = req.body;
		const id = await VerifyJWT(req, res);
		const response = await prepas.ingredients({
			title,
			description,
			prepa,
			time,
			id_user: id,
		});
		if (response) {
			res.json({
				sucess: true,
				data: "Nouveaux ingredient ajouté",
			});
			return;
		} else {
			res.json({
				sucess: false,
			});
			return;
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
