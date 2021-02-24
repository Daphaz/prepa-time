import modelPrepa from "../models/prepa/Prepa";

const controllerPrepa = {
	add: (req, res) => {
		modelPrepa.add(req, res);
	},
	get: (req, res) => {
		modelPrepa.get(req, res);
	},
	getOne: (req, res) => {
		modelPrepa.getOne(req, res);
	},
};

export default controllerPrepa;
