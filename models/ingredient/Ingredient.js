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
	},
	get: async (req, res) => {
		try {
			const id = await VerifyJWT(req, res);
			const { prepa } = req.query;
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
			console.log("IngredientAdd: ", error);
		}
	},
	delete: async (req, res) => {
		try {
			const id = await VerifyJWT(req, res);
			const { ingredient_id } = req.body;
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
};

export default modelIngredient;
