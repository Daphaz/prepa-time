import { Ingredients } from "../models";
import VerifyJWT from "../utils/verifyJWT";

const controllerIngredient = {
	add: async (req, res) => {
		const { title, quantity, unit, prepa } = req.body;
		try {
			const id = await VerifyJWT(req, res);
			const response = await Ingredients.create({
				title,
				quantity,
				unit,
				prepa,
				id_user: id,
			});
			if (response) {
				res.status(201).send({
					sucess: true,
					data: "Nouveaux ingredient ajouté",
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
		const { prepa } = req.query;
		try {
			const id = await VerifyJWT(req, res);
			if (prepa) {
				const ing = await Ingredients.find({ id_user: id, prepa });
				if (ing.length > 0) {
					res.status(200).send({
						sucess: true,
						data: ing,
					});
					return;
				}
				res.status(204).send();
				return;
			}
			res.status(204).send();
			return;
		} catch (error) {
			res.status(404).send();
		}
	},
	getOne: async (req, res) => {
		const { prepa, ingredient_id } = req.query;
		try {
			const id = await VerifyJWT(req, res);
			if (ingredient_id) {
				const ing = await Ingredients.findOne({
					_id: ingredient_id,
					id_user: id,
					prepa,
				});
				if (ing) {
					res.status(200).send({
						sucess: true,
						data: ing,
					});
					return;
				}
				res.status(204).send();
				return;
			}
			res.status(204).send();
			return;
		} catch (error) {
			res.status(404).send();
		}
	},
	delete: async (req, res) => {
		const { ingredient_id } = req.body;
		try {
			const id = await VerifyJWT(req, res);
			if (ingredient_id) {
				const response = await Ingredients.findOneAndDelete({
					_id: ingredient_id,
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
			res.status(204).send();
		}
	},
	modify: async (req, res) => {
		const { title, quantity, unit, prepa, ing_id } = req.body;
		try {
			const id = await VerifyJWT(req, res);
			if (title && quantity && unit && prepa && ing_id) {
				const date = Date.now();
				const query = {
					title,
					quantity,
					unit,
					updatedAt: date,
				};
				const response = await Ingredients.findOneAndUpdate(
					{ _id: ing_id, id_user: id, prepa },
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
			res.status(204).send();
		}
	},
};

export default controllerIngredient;
