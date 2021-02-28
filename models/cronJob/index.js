import { CronJob } from "cron";
import sendEmail from "../../utils/configEmail";
import { jobEmail } from "../email";
import { Progs } from "../Prog";

const scheduleEmail = (
	to,
	subject,
	sucessMessage,
	prepaId,
	scheduleDate,
	username,
	prepaTitle,
	progId
) => {
	if (!scheduleDate.status) {
		const date = new Date(scheduleDate.time);

		const job = new CronJob(date, async function () {
			try {
				const html = await jobEmail(
					prepaId,
					username,
					prepaTitle,
					scheduleDate.id
				);
				await sendEmail(undefined, to, subject, html, sucessMessage, true);
			} catch (error) {
				console.log("JOB: ", error);
			}
		});

		job.start();

		job.addCallback(async () => {
			try {
				await Progs.findOneAndUpdate(
					{ _id: progId, "scheduleDate.id": scheduleDate.id },
					{
						$set: {
							"scheduleDate.$.status": true,
						},
					}
				);
				console.log("CRONJOB: sucess");
			} catch (error) {
				console.log("CRONJOB: ", error);
			}
		});
	}
	return;
};

export default scheduleEmail;
