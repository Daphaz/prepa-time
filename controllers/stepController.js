import modelStep from "../models/step/Step";

const controllerStep = {
	add: (req, res) => {
		modelStep.add(req, res);
	},
	get: (req, res) => {
		modelStep.get(req, res);
	},
	delete: (req, res) => {
		modelStep.delete(req, res);
	},
	modify: (req, res) => {
		modelStep.modify(req, res);
	},
};

export default controllerStep;
