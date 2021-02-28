import { Progs, Users, Prepas, Steps } from "../models";
import VerifyJWT from "../utils/verifyJWT";
import scheduleEmail from "../models/cronJob";

const controllerProgs = {
	add: async (req, res) => {
		const { prepaId, timeStart } = req.body;
		try {
			const id = await VerifyJWT(req, res);
			if (prepaId) {
				const { steps_id, title, image_url } = await Prepas.findOne({
					_id: prepaId,
				});
				if (steps_id) {
					const times = [];
					const stepsId = [];
					const stepInformation = [];
					for (let i = 0; i < steps_id.length; i++) {
						const stepName = `step${i}`;
						const stepId = steps_id[i];
						if (req.body[stepName]) {
							const { time, unit_time } = await Steps.findOne({ _id: stepId });
							const timeToMilli = time * 1000;
							switch (unit_time) {
								case "minute":
									const totalm = timeToMilli * 60;
									times.push(totalm);
									stepsId.push(stepId);
									stepInformation.push({ temp: time, unit: unit_time });
									break;
								case "heure":
									const totalH = timeToMilli * 60 * 60;
									times.push(totalH);
									stepsId.push(stepId);
									stepInformation.push({ temp: time, unit: unit_time });
									break;
								case "jour":
									const totalJ = timeToMilli * 60 * 60 * 24;
									times.push(totalJ);
									stepsId.push(stepId);
									stepInformation.push({ temp: time, unit: unit_time });
									break;
								case "semaine":
									const totalS = timeToMilli * 60 * 60 * 24 * 7;
									times.push(totalS);
									stepsId.push(stepId);
									stepInformation.push({ temp: time, unit: unit_time });
									break;
								case "mois":
									const totalM = timeToMilli * 60 * 60 * 24 * 7 * 4;
									times.push(totalM);
									stepsId.push(stepId);
									stepInformation.push({ temp: time, unit: unit_time });
									break;
								default:
									res.status(400).send();
									break;
							}
						}
					}

					if (times.length > 0) {
						const newTimes = [];
						times.reduce((acc, current) => {
							newTimes.push(acc + current);
							return acc + current;
						}, 0);
						const query = [];
						for (let j = 0; j < newTimes.length; j++) {
							const time = newTimes[j] + timeStart;
							const obj = {
								id: j + 1,
								name: `step${j + 1}`,
								time,
								status: false,
								stepId: stepsId[j],
								stepInfo: stepInformation[j],
							};
							query.push(obj);
						}

						const resp = await Progs.create({
							prepa: prepaId,
							prepaTitle: title,
							image_url,
							startDate: timeStart,
							idUser: id,
							scheduleDate: query,
						});
						if (resp) {
							const { email, username } = await Users.findById(id);
							const subject = "Alerte preparation";
							const sucessMessage = "Email envoyé";
							for (let k = 0; k < resp.scheduleDate.length; k++) {
								const sheduleDate = resp.scheduleDate[k];
								scheduleEmail(
									email,
									subject,
									sucessMessage,
									prepaId,
									sheduleDate,
									username,
									title,
									resp._id
								);
							}
							res.status(200).send({
								sucess: true,
							});
							return;
						}
						res.status(400).send();
						return;
					} else {
						res.status(204).send();
						return;
					}
				}
				res.status(400).send();
				return;
			}
			res.status(400).send();
			return;
		} catch (error) {
			console.log("PROGS: ", error);
			res.status(400).send();
		}
	},
	get: async (req, res) => {
		try {
			const id = await VerifyJWT(req, res);
			const items = await Progs.find({ idUser: id });
			if (items.length > 0) {
				res.status(200).send({
					sucess: true,
					data: items,
				});
				return;
			}
			res.status(204).send();
			return;
		} catch (error) {
			console.log("PROGS: ", error);
			res.status(400).send();
		}
	},
};

export default controllerProgs;
