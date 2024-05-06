import React, { useEffect, useMemo, useState } from "react"; // Import React from 'react'
import LoadingPage from "../../components/LoadingPage";
import { useLocation } from "react-router-dom"; // Import from "react-router-dom"
import TravelLogueModal from "../../components/Modals/TravelLogueModal";

import {
	Box,
	Container,
	Grid,
	Stack,
} from "@mui/material";

import HEADER_IMG from "../../images/headers/han-gang-bridge.webp";
import PlaceMapCard from "../../components/card/PlaceMapCard";
import { useFilterContext } from "../../contexts/FilterProvider";
import axios from "axios";
import { BEARER_HEADERS } from "../../utils/variables";
import HeroBannerFeed from "../components/templates/HeroBannerFeed";
import { useSelector } from "react-redux";
import TitleSectionText from "../../components/texts/TitleSectionText";
import TravelLogueFilter from "../components/filters/TravelLogueFilter";
import { TRAVELLOGUE_DESCRIPTION } from "../../utils";
import NotFoundComponent from "../../components/NotFoundComponent";

const TravelLoguePage = () => {
	const [isBusy, setIsBusy] = React.useState(true);
	const [places, setPlaces] = React.useState([]);

	const location = useLocation();

	React.useEffect(() => {
		loadData();
	}, [location.search]);

	const loadData = async () => {
		try {
			setIsBusy(true);
			const response = await axios.get(
				`/save-place${location.search}`,
				BEARER_HEADERS
			);
			setPlaces(response.data);
		} catch (error) {
			console.error(error.message.message);
		} finally {
			setIsBusy(false);
		}
	};

	return (
		<Container>
			<HeroBannerFeed
				theme="red"
				titleFr="Mon carnet de voyage"
				titleKr="나의 여행담"
				description={TRAVELLOGUE_DESCRIPTION}
				imageLink={HEADER_IMG}
				imageDirection="end"
			/>

			<TravelLogueFilter />

			{isBusy ? (
				<LoadingPage type="data" />
			) : (
				<Box my={5}>
					{places?.length ? (
						<Stack gap={3}>
							<TitleSectionText
								startText="Lieux à visiter"
								endText="prochainement"
							/>
							<Grid container spacing={2}>
								{places.map((place) => {
									return (
										<Grid key={place.id} item xs={12} sm={6} md={4}>
											<PlaceMapCard
												readOnly={false}
												place={place}
												mutate={loadData}
											/>
										</Grid>
									);
								})}
							</Grid>
						</Stack>
					) : (
						<NotFoundComponent showText mt={3} width="100%" height={300} />
					)}
				</Box>
			)}

			{places.length ? (
				<TravelLogueModal readOnly={true} places={places} />
			) : (
				<></>
			)}
		</Container>
	);
};

export default TravelLoguePage;
