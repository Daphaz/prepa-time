import { Prepas, Ingredients, Steps } from "../models";
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
			res.status(204).send();
		}
	},
	get: async (req, res) => {
		const { finish } = req.query;
		if (finish) {
			try {
				const id = await VerifyJWT(req, res);
				const items = await Prepas.find({ id_user: id, finish });
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
		}
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
			const { prepaId, finish, title, description, image_url, type } = req.body;
			if (title && description && type) {
				const updatePrepa = await Prepas.findOneAndUpdate(
					{ _id: prepaId, id_user },
					{
						title,
						description,
						image_url,
						type,
						updatedAt: date,
					}
				);
				if (updatePrepa) {
					res.status(200).send({
						sucess: true,
					});
					return;
				}
				res.status(204).send();
				return;
			} else {
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
						});
						return;
					}
					res.status(204).send();
					return;
				}
				const prepa = await Prepas.findOneAndUpdate(
					{ _id: prepaId, id_user },
					{
						finish,
					}
				);
				if (prepa) {
					res.status(200).send({
						sucess: true,
					});
					return;
				}
			}
			res.status(204).send();
			return;
		} catch (error) {
			// res.status(204).send();
			console.log("UPDATE: ", error);
		}
	},
	delete: async (req, res) => {
		const { prepa_id } = req.body;
		try {
			const id = await VerifyJWT(req, res);
			const resp1 = await Prepas.findOneAndDelete({
				_id: prepa_id,
				id_user: id,
			});
			const resp2 = await Ingredients.deleteMany({ prepa: prepa_id });
			const resp3 = await Steps.deleteMany({ prepa: prepa_id });
			if (resp1 && resp2 && resp3) {
				res.status(200).send({
					sucess: true,
				});
				return;
			}
			res.status(204).send();
			return;
		} catch (error) {
			res.status(204).send();
		}
	},
};

export default controllerPrepa;
