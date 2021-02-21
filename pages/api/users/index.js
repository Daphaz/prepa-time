import dbConnect from "../../../utils/dbConnect";
import controllerUsers from "../../../controllers/usersController";

dbConnect();

export default async (req, res) => {
	const { method } = req;

	switch (method) {
		case "GET":
			try {
				controllerUsers.login(req, res);
			} catch (err) {
				res.status(400).json({
					success: false,
					data: err,
				});
			}
			break;
		case "POST":
			try {
				controllerUsers.signUp(req, res);
			} catch (err) {
				res.status(400).json({
					success: false,
					data: err,
				});
			}
			break;
		case "PUT":
			res.status(400).json({
				success: false,
			});
			break;
		case "DELETE":
			res.status(400).json({
				success: false,
			});
			break;
		default:
			res.status(400).json({
				success: false,
			});
			break;
	}
};
