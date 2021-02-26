import dbConnect from "../../../utils/dbConnect";
import controllerPrepa from "../../../controllers/prepaController";

dbConnect();

export default async (req, res) => {
	const { method } = req;

	switch (method) {
		case "GET":
			try {
				controllerPrepa.get(req, res);
			} catch (error) {
				res.status(error.code).send(error.message);
			}
			break;
		case "POST":
			try {
				controllerPrepa.add(req, res);
			} catch (error) {
				res.status(error.code).send(error.message);
			}
			break;
		case "PUT":
			try {
				controllerPrepa.modify(req, res);
			} catch (error) {
				res.status(error.code).send(error.message);
			}
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
