import dbConnect from "../../utils/dbConnect";
import controllerUsers from "../../controllers/usersController";

dbConnect();

export default async (req, res) => {
	const { method } = req;

	switch (method) {
		case "GET":
			res.status(400).json({
				success: false,
			});
			break;
		case "POST":
			try {
				controllerUsers.forgot(req, res);
			} catch (error) {
				res.status(error.code).send(error.message);
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
