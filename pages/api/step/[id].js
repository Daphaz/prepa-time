import dbConnect from "../../../utils/dbConnect";
import controllerStep from "../../../controllers/stepController";

dbConnect();

export default async (req, res) => {
	const { method } = req;
	//const { id } = req.query;

	switch (method) {
		case "GET":
			try {
				controllerStep.getOne(req, res);
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
