import React, { useEffect } from "react";
import useAuth from "./context";
import { useRouter } from "next/router";

export const ProtectedRoute = (Component) => {
	return () => {
		const { isAuthenticated, loading } = useAuth();
		const router = useRouter();

		useEffect(() => {
			if (!isAuthenticated && !loading) {
				router.push("/");
			}
		}, [isAuthenticated, loading]);

		return <Component {...arguments} />;
	};
};
