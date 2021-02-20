import Head from "next/head";
import { Layout } from "../components/Layout";

export default function Home() {
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
				<h1>Home</h1>
			</Layout>
		</>
	);
}
