export default async (req, res) => {
	const { method } = req;

	switch (method) {
		case "GET":
			res.status(200).json({
				success: true,
			});
			break;

		default:
			res.status(500).json({
				success: false,
			});
			break;
	}
};
