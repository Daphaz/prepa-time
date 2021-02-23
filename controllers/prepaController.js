import modelPrepa from "../models/prepa/Prepa";

const controllerPrepa = {
	add: (req, res) => {
		modelPrepa.add(req, res);
	},
	get: (req, res) => {
		modelPrepa.get(req, res);
	},
};

export default controllerPrepa;
