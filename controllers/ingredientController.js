import modelIngredient from "../models/ingredient/Ingredient";

const controllerIngredient = {
	add: (req, res) => {
		modelIngredient.add(req, res);
	},
	get: (req, res) => {
		modelIngredient.get(req, res);
	},
	delete: (req, res) => {
		modelIngredient.delete(req, res);
	},
	modify: (req, res) => {
		modelIngredient.modify(req, res);
	},
};

export default controllerIngredient;
