import React from "react";
import { Layout } from "../components/Layout";
import { redirectFromServerNotConnected } from "../auth/cookies";

const Preparation = () => {
	return (
		<Layout>
			<div className="container">
				<h2>Ajouter une Preparation</h2>
			</div>
		</Layout>
	);
};

export const getServerSideProps = async (context) => {
	redirectFromServerNotConnected(context);
	return {
		props: {},
	};
};

export default Preparation;
