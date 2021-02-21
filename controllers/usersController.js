import modelUsers from "../models/user/User";

const controllerUsers = {
	signUp: (req, res) => {
		modelUsers.signUp(req, res);
	},
	login: (req, res) => {
		modelUsers.login(req, res);
	},
	userInfo: (req, res) => {
		modelUsers.userInfo(req, res);
	},
};

export default controllerUsers;
