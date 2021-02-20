import modelUsers from "../models/user/User";

const controllerUsers = {
	signUp: (req, res) => {
		modelUsers.signUp(req, res);
	},
};

export default controllerUsers;
