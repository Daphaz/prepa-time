import dbConnect from "../../../utils/dbConnect";
import controllerStep from "../../../controllers/stepController";

dbConnect();

export default async (req, res) => {
	const { method } = req;

	switch (method) {
		case "GET":
			try {
				controllerStep.get(req, res);
			} catch (error) {
				res.status(error.code).send(error.message);
			}
			break;
		case "POST":
			try {
				controllerStep.add(req, res);
			} catch (error) {
				res.status(error.code).send(error.message);
			}
			break;
		case "PUT":
			try {
				controllerStep.modify(req, res);
			} catch (error) {
				res.status(error.code).send(error.message);
			}
			break;
		case "DELETE":
			try {
				controllerStep.delete(req, res);
			} catch (error) {
				res.status(error.code).send(error.message);
			}
			break;
		default:
			res.status(400).json({
				success: false,
			});
			break;
	}
};
