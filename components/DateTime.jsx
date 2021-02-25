import React from "react";
import TextField from "@material-ui/core/TextField";
import dateFormat from "dateformat";

export const DateTime = ({ reference, onFocus }) => {
	const now = new Date();
	const date = `${dateFormat(now, "isoDate")}T${dateFormat(now, "isoTime")}`;
	return (
		<TextField
			id="datetime-local"
			type="datetime-local"
			defaultValue={date}
			name="time"
			ref={reference}
			onFocus={onFocus}
		/>
	);
};
