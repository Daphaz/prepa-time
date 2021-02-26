import { Steps, Prepas } from "../models";
import VerifyJWT from "../utils/verifyJWT";

const controllerStep = {
	add: async (req, res) => {
		const { title, description, prepa, image_url, time, unit_time } = req.body;
		try {
			const id = await VerifyJWT(req, res);
			if (image_url) {
				const response = await Steps.create({
					title,
					description,
					prepa,
					time,
					unit_time,
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
					unit_time,
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
	getOne: async (req, res) => {
		const { prepa, step_id } = req.query;
		try {
			const id = await VerifyJWT(req, res);
			if (step_id && prepa) {
				const step = await Steps.findOne({
					_id: step_id,
					id_user: id,
					prepa,
				});
				if (step) {
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
		const { step_id } = req.body;
		try {
			const id = await VerifyJWT(req, res);
			if (step_id) {
				const response = await Steps.findOneAndDelete({
					_id: step_id,
					id_user: id,
				});
				if (response) {
					res.status(200).send({
						sucess: true,
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
	modify: async (req, res) => {
		const {
			title,
			description,
			time,
			unit_time,
			image_url,
			prepa,
			step_id,
		} = req.body;
		try {
			const id = await VerifyJWT(req, res);
			if (
				title &&
				description &&
				time &&
				unit_time &&
				image_url &&
				prepa &&
				step_id
			) {
				const date = Date.now();
				const query = {
					title,
					description,
					time,
					unit_time,
					image_url,
					updatedAt: date,
				};
				const response = await Steps.findOneAndUpdate(
					{ _id: step_id, id_user: id, prepa },
					query
				);
				if (response) {
					res.status(200).send({
						sucess: true,
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
};

export default controllerStep;
