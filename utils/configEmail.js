import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	pool: true,
	host: process.env.EMAIL_HOST,
	port: 465,
	secure: true,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PWD,
	},
});

const sendEmail = async (res, to, subject, html, sucessMessage) => {
	const mailOptions = {
		from: process.env.EMAIL_USER,
		to,
		subject,
		html,
	};

	try {
		const response = await transporter.sendMail(mailOptions);
		if (response) {
			res.status(200).send({
				sucess: true,
				data: sucessMessage,
			});
			return;
		}
	} catch (error) {
		res.status(error.code).send(error.message);
	}
};

export default sendEmail;
