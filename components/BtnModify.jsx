import React from "react";
import EditIcon from "@material-ui/icons/Edit";

export const BtnModify = ({ handleClick }) => {
	return (
		<div className="btn-edit" onClick={handleClick}>
			<EditIcon className="edit" />
		</div>
	);
};
