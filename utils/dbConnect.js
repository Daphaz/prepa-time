import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
	if (connection.isConnected) {
		return;
	}

	try {
		const db = await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});

		connection.isConnected = db.connections[0].readyState;
		console.log("dbConnect : ", connection.isConnected);
	} catch (error) {
		console.log("dbConnect : ", error);
	}
}

export default dbConnect;
