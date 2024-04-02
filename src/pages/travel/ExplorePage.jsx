import HEADER_IMG from "../../images/headers/jeju-do.jpg";
import { useFilterContext } from "../../contexts/FilterProvider";
import { NavLink, useLocation } from "react-router-dom";
import {
	Box,
	Container,
	Grid} from "@mui/material";
import useSWR from "swr";
import LoadingPage from "../../components/LoadingPage";
import PlaceCard from "../../components/card/PlaceCard";
import HeroBannerFeed from "../components/templates/HeroBannerFeed";
import PaginationData from "../../components/PaginationData";
import PlacesFilter from "../components/filters/PlacesFilter";
import TitleSectionText from "../../components/texts/TitleSectionText";
import { EXPLORE_DESCRIPTION } from "../../utils";
import NotFoundComponent from "../../components/NotFoundComponent";
import {Helmet} from 'react-helmet'

const ExplorePage = () => {
	const location = useLocation();
	const { searchParams } = useFilterContext();

	const {
		data: places,
		isLoading,
		error
	} = useSWR(`/places${location.search}`);

	if (error) console.error("API ERROR:", error);

	return (
		<Container>
			<Helmet>
				<title>
					Explorer la Corée Du Sud | Coreego
				</title>
				<meta
					name="title"
					content="Découvrez la Corée Du Sud avec Coreego"
				/>
				<meta
					name="keywords"
					content="explorer, corée du sud, coreego"
				/>
				<meta name="description" content={EXPLORE_DESCRIPTION.slice(0,150)} />
			</Helmet>

			<HeroBannerFeed
				theme="red"
				titleFr="Explorer"
				titleKr="탐구하기"
				description={EXPLORE_DESCRIPTION}
				imageLink={HEADER_IMG}
				buttonLabel="Partager un lieu"
				buttonLink="/explorer/lieu/creation"
				imageDirection="end"
			/>

			<PlacesFilter />

			{isLoading ? (
				<LoadingPage type="data" />
			) : (
				<Box my={5}>
					{searchParams.get("longitude") &&
						searchParams.get("latitude") && (
							<TitleSectionText
								mb={3}
								startText="Lieux autour"
								endText="de moi"
							/>
						)}
					{places.data.length ? (
						<Grid container spacing={2}>
							{places.data.map((place) => {
								return (
									<Grid key={place.id} item xs={12} sm={6} md={4}>
										<NavLink to={`/explorer/lieu/${place.slug}`}>
											<PlaceCard place={place} />
										</NavLink>
									</Grid>
								);
							})}
						</Grid>
					) : (
						<NotFoundComponent showText width="100%" height={300} />
					)}
				</Box>
			)}
			<Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
				<PaginationData lastPage={places?.meta?.last_page} />
			</Box>
		</Container>
	);
};

export default ExplorePage;
