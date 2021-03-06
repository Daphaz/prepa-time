import dbConnect from "../../../utils/dbConnect";
import controllerPrepa from "../../../controllers/prepaController";

dbConnect();

export default async (req, res) => {
	const { method } = req;

	switch (method) {
		case "GET":
			try {
				controllerPrepa.getOne(req, res);
			} catch (error) {
				res.status(error.code).send(error.message);
			}
			break;
		case "POST":
			res.status(400).json({
				success: false,
			});
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
