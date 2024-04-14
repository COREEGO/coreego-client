import { useLocation } from "react-router-dom";
import {
	Container,
	Box,
	Grid} from "@mui/material";
import useSWR from "swr";
import HEADER_IMG from "../../images/headers/i-seoul-u.jpg";
import { NavLink } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";
import DiscussionCard from "../../components/card/DiscussionCard";
import HeroBannerFeed from "../components/templates/HeroBannerFeed";
import PaginationData from "../../components/PaginationData";
import DiscussionsFilter from "../components/filters/DiscussionsFilter";
import { FORUM_DESCRIPTION } from "../../utils";
import NotFoundComponent from "../../components/NotFoundComponent";
import { Helmet } from "react-helmet";

const ForumPage = () => {
	const location = useLocation();

	const {
		data: discussions,
		isLoading,
		error
	} = useSWR(`/discussions${location.search}`);

	if (error) console.error("API ERROR:", error);

	return (
		<Container>
			<Helmet>
				<title>Forum | Coreego</title>
				<meta name="title" content="Forum sur la Corée Du Sud" />
				<meta
					name="keywords"
					content="forum, Corée Du Sud, discussions"
				/>
				<meta
					name="description"
					content={FORUM_DESCRIPTION.slice(0, 150)}
				/>
			</Helmet>

			<HeroBannerFeed
				theme="red"
				titleFr="Forum"
				titleKr="포럼"
				description={FORUM_DESCRIPTION}
				imageLink={HEADER_IMG}
				buttonLabel="créer une discussion"
				buttonLink="/forum/discussion/creation"
				imageDirection="end"
			/>

			<DiscussionsFilter />

			{isLoading ? (
				<LoadingPage type="data" />
			) : (
				<>
					<Box my={5}>
						{discussions?.data.length ? (
							<Grid container spacing={2}>
								{discussions?.data.map((discussion) => {
									return (
										<Grid key={discussion.id} item xs={12} md={6}>
											<NavLink
												to={`/forum/discussion/${discussion.slug}`}
											>
												<DiscussionCard discussion={discussion} />
											</NavLink>
										</Grid>
									);
								})}
							</Grid>
						) : (
							<NotFoundComponent showText width="100%" height={300} />
						)}
					</Box>
					<Box
						sx={{ display: "flex", justifyContent: "center", mb: 5 }}
					>
						<PaginationData lastPage={discussions?.meta.last_page} />
					</Box>
				</>
			)}
		</Container>
	);
};

export default ForumPage;
