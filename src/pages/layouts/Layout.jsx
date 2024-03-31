import React from "react";
import { useAuthContext } from "../../contexts/AuthProvider";
import LoadingPage from "../../components/LoadingPage";
import { useDispatch } from "react-redux";
import {
	initCities,
	initDiscussionCategories,
	initPlaceCategories,
	initLanguages
} from "../../store/reducers/app.reducer";
import Navigation from "../../components/navigation/Navigation";
import axios from "axios";
import { TOKEN } from "../../utils/variables";
import DashboardLayout from "./DashboardLayout";
import { useLocation } from "react-router";
import Footer from "../Footer";

const Layout = ({ children }) => {
	const [isLoaded, setIsLoaded] = React.useState(false);
	const dispath = useDispatch();
	const { authentification } = useAuthContext();

	const location = useLocation();

	React.useEffect(() => {
		onLoadedApplication();
	}, []);

	React.useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	const onLoadedApplication = async () => {
		try {
			const application = await axios.get("/start-application");

			dispath(
				initDiscussionCategories(
					application.data.discussion_categories
				)
			);
			dispath(initPlaceCategories(application.data.place_categories));
			dispath(initCities(application.data.cities));
			dispath(initLanguages(application.data.languages));

			if (TOKEN) {
				await authentification();
			}
		} catch (error) {
			console.error(error.message);
		} finally {
			setIsLoaded(true);
		}
	};

	return isLoaded ? (
		<>
			{location.pathname.startsWith("/dashboard") ? (
				<DashboardLayout>{children}</DashboardLayout>
			) : (
				<>
					<Navigation />
					{children}
					<Footer  />
				</>
			)}
		</>
	) : (
		<LoadingPage type="app" />
	);
};

export default Layout;
