import React from "react";
import TextField from "@material-ui/core/TextField";
import dateFormat from "dateformat";

export const DateTime = () => {
	const now = new Date();
	const date = `${dateFormat(now, "isoDate")}T${dateFormat(now, "isoTime")}`;
	console.log(date);
	return (
		<TextField id="datetime-local" type="datetime-local" defaultValue={date} />
	);
};
