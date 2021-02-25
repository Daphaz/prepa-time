import dbConnect from "../../../utils/dbConnect";
import controllerIngredient from "../../../controllers/ingredientController";

dbConnect();

export default async (req, res) => {
	const { method } = req;

	switch (method) {
		case "GET":
			try {
				controllerIngredient.get(req, res);
			} catch (error) {
				res.status(error.code).send(error.message);
			}
			break;
		case "POST":
			try {
				controllerIngredient.add(req, res);
			} catch (error) {
				res.status(error.code).send(error.message);
			}
			break;
		case "PUT":
			try {
				controllerIngredient.modify(req, res);
			} catch (error) {
				res.status(error.code).send(error.message);
			}
			break;
		case "DELETE":
			try {
				controllerIngredient.delete(req, res);
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
