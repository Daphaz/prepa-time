import mongoose from "mongoose";
import VerifyJWT from "../../utils/verifyJWT";

const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
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
});

let ingredients;
try {
	ingredients = mongoose.model("ingredients");
} catch (error) {
	ingredients = mongoose.model("ingredients", ingredientSchema);
}

const modelIngredient = {
	add: async (req, res) => {
		const { title, quantity, unit, prepa } = req.body;
		try {
			const id = await VerifyJWT(req, res);
			const response = await ingredients.create({
				title,
				quantity,
				unit,
				prepa,
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
		} catch (error) {
			console.log("IngredienAdd: ", error);
		}
	},
	get: async (req, res) => {
		const { prepa } = req.query;
		try {
			const id = await VerifyJWT(req, res);
			if (prepa) {
				const ing = await ingredients.find({ id_user: id, prepa: prepa });
				if (ing.length > 0) {
					res.json({
						sucess: true,
						data: ing,
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
		} catch (error) {
			console.log("IngredientGet: ", error);
		}
	},
	getOne: async (req, res) => {
		const { prepa, ingredient_id } = req.query;
		try {
			const id = await VerifyJWT(req, res);
			if (ingredient_id) {
				const ing = await ingredients.findOne({
					_id: ingredient_id,
					id_user: id,
					prepa: prepa,
				});
				if (ing) {
					res.json({
						sucess: true,
						data: ing,
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
		} catch (error) {
			console.log("IngredientGetOne: ", error);
		}
	},
	delete: async (req, res) => {
		const { ingredient_id } = req.body;
		try {
			const id = await VerifyJWT(req, res);
			if (ingredient_id) {
				const response = await ingredients.findOneAndDelete({
					_id: ingredient_id,
					id_user: id,
				});
				if (response) {
					res.json({
						sucess: true,
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
		} catch (error) {
			console.log("IngredientDelete: ", error);
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
				const response = await ingredients.findOneAndUpdate(
					{ _id: ing_id, id_user: id, prepa: prepa },
					query
				);
				if (response) {
					res.json({
						sucess: true,
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
		} catch (error) {
			console.log("IngredientModify: ", error);
		}
	},
};

export default modelIngredient;
