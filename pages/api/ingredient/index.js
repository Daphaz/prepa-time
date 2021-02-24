import dbConnect from "../../../utils/dbConnect";
import controllerIngredient from "../../../controllers/ingredientController";

dbConnect();

export default async (req, res) => {
	const { method } = req;

	switch (method) {
		case "GET":
			try {
				controllerIngredient.get(req, res);
			} catch (err) {
				res.status(400).json({
					success: false,
					data: err,
				});
			}
			break;
		case "POST":
			try {
				controllerIngredient.add(req, res);
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
			try {
				controllerIngredient.delete(req, res);
			} catch (err) {
				res.status(400).json({
					success: false,
					data: err,
				});
			}
			break;
		default:
			res.status(400).json({
				success: false,
			});
			break;
	}
};
