import { useParams } from "react-router";
import React from "react";
import LoadingPage from "../../components/LoadingPage";
import PlaceForm from "../../components/forms/PlaceForm";
import axios from "axios";
import useMiddleware from "../../hooks/useMiddleware";
import { Helmet } from 'react-helmet'


const PlaceEditPage = () => {
	const params = useParams();
	const [isLoaded, setIsLoaded] = React.useState(false);
	const [place, setPlace] = React.useState();

	const { canEdit } = useMiddleware();

	React.useEffect(() => {
		loadPlace();
	}, []);

	const loadPlace = async () => {
		try {
			const response = await axios.get(`/places/${params.slug}`);
			canEdit(response.data.user.id);
			setPlace(response.data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoaded(true);
		}
	};

	return isLoaded ? (
		<>
			<Helmet>
				<title>Modification lieu | Coreego</title>
			</Helmet>
			<PlaceForm isEditMode={true} place={place} mutate={loadPlace} />
		</>
	) : (
		<LoadingPage type="page" />
	);
};

export default PlaceEditPage;
