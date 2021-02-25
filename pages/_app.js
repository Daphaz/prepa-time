import "../styles/globals.css";
import Head from "next/head";
import { AuthProvider } from "../auth/context";
import { FormProvider } from "../auth/formContext";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&family=Poppins:wght@300;400;700&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<AuthProvider>
				<FormProvider>
					<Component {...pageProps} />
				</FormProvider>
			</AuthProvider>
		</>
	);
}

export default MyApp;
