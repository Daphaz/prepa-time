import dbConnect from "../../utils/dbConnect";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

dbConnect();

const usersSchema = mongoose.Schema({
	username: String,
	email: String,
	hash: String,
	salt: String,
	picture: String,
	role: String,
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

const Users = mongoose.model("Users", usersSchema);

const modelUsers = {
	signUp: async (req, res) => {
		//
	},
};

export default modelUsers;
