import jwt from "jsonwebtoken";

const VerifyJWT = (req, res) =>
	new Promise((resolve, reject) => {
		let token;
		if (req.headers.authorization || req.headers.cookie) {
			token =
				req.headers.authorization || req.headers.cookie.split("token=")[1];
		} else {
			token = undefined;
		}

		if (!token) {
			res.json({
				sucess: false,
				data: "no token find",
			});
			return;
		} else {
			try {
				jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
					if (err) {
						res.status(401).json({
							sucess: false,
							data: "failed to authenticate",
						});
						return;
					} else {
						resolve(decoded.id);
					}
				});
			} catch (error) {
				reject(error);
			}
		}
	});

export default VerifyJWT;
