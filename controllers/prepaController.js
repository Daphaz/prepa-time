import { Prepas } from "../models";
import VerifyJWT from "../utils/verifyJWT";

const controllerPrepa = {
	add: async (req, res) => {
		const { title, description, image_url, type } = req.body;
		try {
			const id = await VerifyJWT(req, res);
			const response = await Prepas.create({
				title,
				description,
				image_url,
				id_user: id,
				type,
			});
			if (response) {
				res.status(201).send({
					sucess: true,
					data: "Nouvelle preparation créer",
				});
				return;
			}
			res.status(204).send();
			return;
		} catch (error) {
			res.status(error.code).send(error.message);
		}
	},
	get: async (req, res) => {
		try {
			const id = await VerifyJWT(req, res);
			const items = await Prepas.find({ id_user: id });
			if (items.length > 0) {
				res.status(200).send({
					sucess: true,
					data: items,
				});
				return;
			}
			res.status(204).send();
			return;
		} catch (error) {
			res.status(204).send();
		}
	},
	getOne: async (req, res) => {
		try {
			const id_user = await VerifyJWT(req, res);
			const { id } = req.query;
			const prepa = await Prepas.findOne({ id_user: id_user, _id: id });
			if (prepa) {
				res.status(200).send({
					sucess: true,
					data: prepa,
				});
				return;
			}
			res.status(204).send();
			return;
		} catch (error) {
			res.status(204).send();
		}
	},
	modify: async (req, res) => {
		const date = Date.now();
		try {
			const id_user = await VerifyJWT(req, res);
			const { prepaId, finish } = req.body;
			if (finish) {
				const prepa = await Prepas.findOneAndUpdate(
					{ _id: prepaId, id_user },
					{
						finish,
						updatedAt: date,
					}
				);
				if (prepa) {
					res.status(200).send({
						sucess: true,
						data: prepa,
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

export default controllerPrepa;
