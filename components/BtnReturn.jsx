import React from "react";
import { useRouter } from "next/router";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export const BtnReturn = ({ url }) => {
	const router = useRouter();
	const handleClick = () => {
		router.push(url);
	};

	return (
		<div className="btn-return" onClick={handleClick}>
			<ArrowBackIcon className="back" />
		</div>
	);
};
