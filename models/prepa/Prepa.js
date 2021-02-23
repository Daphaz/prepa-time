import mongoose from "mongoose";
import VerifyJWT from "../../utils/verifyJWT";

const Schema = mongoose.Schema;

const prepaSchema = new Schema({
	title: String,
	description: String,
	image_url: {
		type: String,
		default:
			"https://res.cloudinary.com/daphaz/image/upload/v1614110736/estate-agency/preparation/g2cvcvc1dohhdgnwdkbv.jpg",
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	updatedAt: {
		type: Date,
		default: Date.now(),
	},
	id_user: String,
	time: Date,
	steps_id: {
		type: Array,
		default: [],
	},
});

let prepas;
try {
	prepas = mongoose.model("prepas");
} catch (error) {
	prepas = mongoose.model("prepas", prepaSchema);
}

const modelPrepa = {
	add: async (req, res) => {
		const { title, description, image_url } = req.body;
		const id = await VerifyJWT(req, res);
		const response = await prepas.create({
			title,
			description,
			image_url,
			id_user: id,
		});
		if (response) {
			res.json({
				sucess: true,
				data: "Nouvelle preparation créer",
			});
			return;
		} else {
			res.json({
				sucess: false,
			});
			return;
		}
	},
	get: async (req, res) => {
		const id = await VerifyJWT(req, res);
		const items = await prepas.find({ id_user: id });
		if (items.length > 0) {
			res.json({
				sucess: true,
				data: items,
			});
			return;
		} else {
			res.json({
				sucess: false,
			});
			return;
		}
	},
};

export default modelPrepa;
