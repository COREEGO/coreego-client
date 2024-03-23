import React from "react";
import { useSelector } from "react-redux";
import HEADER_IMG from "../../images/headers/espace-discussion.jpg";
import { useFilterContext } from "../../contexts/FilterProvider";
import CityDistrictSelectInput from "../../components/inputs/CityDistrictSelectInput";
import { NavLink, useLocation } from "react-router-dom";
import { CLOSE_ICON, FILTER_ICON } from "../../utils/icon";
import {
	Box,
	Container,
	Grid,
	Typography,
	Button,
	Pagination,
	Stack,
	Hidden,
	Select,
	Dialog,
	DialogTitle,
	IconButton,
	DialogContent,
	PaginationItem,
	MenuItem,
	TextField
} from "@mui/material";
import useSWR from "swr";
import LoadingPage from "../../components/LoadingPage";
import PlaceCard from "../../components/card/PlaceCard";
import SearchInput from "../../components/inputs/SearchInput";
import HeroBannerFeed from "../components/templates/HeroBannerFeed";
import PaginationData from "../../components/PaginationData";
import PlacesFilter from "../components/filters/PlacesFilter";

const TravelPage = () => {
	const location = useLocation();

	const {
		data: places,
		isLoading,
		error
	} = useSWR(`/places${location.search}`);

	if (error) console.error("API ERROR:", error);

	return (
		<Container>
			<HeroBannerFeed
				theme="red"
				titleFr="Voyage"
				titleKr="여행"
				description="
				MACC Essentials has an important role in making
				supplies and services available to customers and
				their patients during this critical time. This
				includes services from various domains. Our aim is
				to aid you. As much we can.
				"
				imageLink={HEADER_IMG}
				buttonLabel="Partager un lieu"
				buttonLink="/voyage/place/create"
				imageDirection="end"
			/>


			<PlacesFilter />


			{isLoading ? (
				<LoadingPage type="data" />
			) : (
				<Box my={5}>
						{places.data.length ? (
							<Grid container spacing={2}>
								{places.data.map((place) => {
									return (
										<Grid key={place.id} item xs={12} sm={6} md={4}>
											<NavLink to={`/voyage/place/${place.slug}`}>
												<PlaceCard place={place} />
											</NavLink>
										</Grid>
									);
								})}
							</Grid>
						) : (
							<Typography textAlign="center">
								Aucune lieu trouvé
							</Typography>
						)}
				</Box>
			)}
			<Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
				<PaginationData lastPage={places?.meta?.last_page} />
			</Box>
		</Container>
	);
};

export default TravelPage;
