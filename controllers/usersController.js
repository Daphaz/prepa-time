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
	forgot: (req, res) => {
		modelUsers.forgot(req, res);
	},
	tokenReset: (req, res) => {
		modelUsers.tokenReset(req, res);
	},
	reset: (req, res) => {
		modelUsers.reset(req, res);
	},
};

export default controllerUsers;
