import { Steps, Prepas } from "../models";
import VerifyJWT from "../utils/verifyJWT";

const controllerStep = {
	add: async (req, res) => {
		const { title, description, prepa, image_url, time } = req.body;
		try {
			const id = await VerifyJWT(req, res);
			if (image_url) {
				const response = await Steps.create({
					title,
					description,
					prepa,
					time,
					image_url,
					id_user: id,
				});
				await Prepas.findByIdAndUpdate(prepa, {
					$push: {
						steps_id: response._id,
					},
				});
				res.status(201).send({
					sucess: true,
					data: "Nouvelle etape ajoutée",
				});
				return;
			} else {
				const response = await Steps.create({
					title,
					description,
					prepa,
					time,
					id_user: id,
				});
				await Prepas.findByIdAndUpdate(prepa, {
					$push: {
						steps_id: response._id,
					},
				});
				res.status(201).send({
					sucess: true,
					data: "Nouvelle etape ajoutée",
				});
				return;
			}
		} catch (error) {
			res.status(error.code).send(error.message);
		}
	},
	get: async (req, res) => {
		const { prepa } = req.query;
		try {
			if (prepa) {
				const id = await VerifyJWT(req, res);
				const step = await Steps.find({ id_user: id, prepa });
				if (step.length > 0) {
					res.status(200).send({
						sucess: true,
						data: step,
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
	delete: async (req, res) => {
		res.status(204).send();
		return;
	},
	modify: async (req, res) => {
		res.status(204).send();
		return;
	},
};

export default controllerStep;
