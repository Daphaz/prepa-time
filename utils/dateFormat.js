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
