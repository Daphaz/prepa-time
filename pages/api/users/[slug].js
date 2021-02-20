import controllerUsers from "../../../controllers/usersController";

export default async (req, res) => {
	const { method } = req;
	const { slug } = req.query;

	switch (method) {
		case "GET":
			if (slug.length < 0) {
				res.status(200).json({
					success: true,
				});
			}
			res.status(418).json({
				success: "I'm a teapot",
			});
			break;
		case "POST":
			if (slug.length === 0 && slug[0] === "signup") {
				controllerUsers.signUp(req, res);
			}
			break;

		default:
			res.status(500).json({
				success: false,
			});
			break;
	}
};
