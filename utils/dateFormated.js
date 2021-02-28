import dateFormat from "dateformat";

dateFormat.i18n = {
	dayNames: [
		"Dim",
		"Lun",
		"Mar",
		"Mer",
		"Jeu",
		"Ven",
		"Sam",
		"Dimanche",
		"Lundi",
		"Mardi",
		"Mercredi",
		"Jeudi",
		"Vendredi",
		"Samedi",
	],
	monthNames: [
		"Jan",
		"Fev",
		"Mar",
		"Avr",
		"Mai",
		"Jui",
		"Juil",
		"Aou",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
		"Janvier",
		"Fevrier",
		"Mars",
		"Avril",
		"Mai",
		"Juin",
		"Juillet",
		"Aout",
		"Septembre",
		"Octobre",
		"Novembre",
		"Decembre",
	],
	timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"],
};

export const prepaDate = (now) => {
	dateFormat.masks.prepaAdd = "dd mmmm yyyy";
	return dateFormat(now, "prepaAdd");
};

export const stepDate = (now) => {
	dateFormat.masks.stepAdd = 'dd mmmm yyyy "à" HH:MM';
	return dateFormat(now, "stepAdd");
};

export const fieldDate = (now) => {
	const date = `${dateFormat(now, "isoDate")}T${dateFormat(now, "isoTime")}`;
	return date;
};

export const startDateTime = (time) => {
	const date = new Date(time);
	const parsed = Date.parse(date);
	return parsed;
};
