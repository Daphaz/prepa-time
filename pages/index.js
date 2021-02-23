import { useEffect } from "react";
import Head from "next/head";
import { Layout } from "../components/Layout";
import { Banner } from "../components/Banner";
import { Features } from "../components/Features";
import useFormContext from "../auth/formContext";

export default function Home() {
	const { setFormState } = useFormContext();
	useEffect(() => {
		setFormState({
			check: false,
			data: "",
		});
	}, []);

	return (
		<>
			<Head>
				<title>Prepa-Time</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta
					name="Description"
					content="La préparation de produits fermenter controllé"
				/>
			</Head>
			<Layout footer>
				<Banner />
				<Features />
			</Layout>
		</>
	);
}
