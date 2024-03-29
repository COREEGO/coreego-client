import React from "react";
import { useLocation } from "react-router-dom";
import {
	MenuItem,
	Container,
	Pagination,
	Box,
	Grid,
	Typography,
	Button,
	Stack,
	IconButton,
	PaginationItem,
	Select,
	Dialog,
	DialogTitle,
	DialogContent,
	Hidden,
	TextField
} from "@mui/material";
import useSWR from "swr";
import { useFilterContext } from "../../contexts/FilterProvider";
import HEADER_IMG from "../../images/headers/i-seoul-u.jpg";
import { CLOSE_ICON, FILTER_ICON } from "../../utils/icon";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingPage from "../../components/LoadingPage";
import SearchInput from "../../components/inputs/SearchInput";
import DiscussionCard from "../../components/card/DiscussionCard";
import HeroBannerFeed from "../components/templates/HeroBannerFeed";
import PaginationData from "../../components/PaginationData";
import DiscussionsFilter from "../components/filters/DiscussionsFilter";
import { FORUM_DESCRIPTION } from "../../utils";
import NotFindComponent from "../../components/NotFindComponent";

const ForumPage = () => {
	const { updateFilter, searchParams } = useFilterContext();

	const [isOpenFilterModal, setIsOpenFilterModal] =
		React.useState(false);

	const location = useLocation();

	const {
		data: discussions,
		isLoading,
		error
	} = useSWR(`/discussions${location.search}`);

	if (error) console.error("API ERROR:", error);

	const { discussionCategories } = useSelector((state) => state.app);

	return (
		<Container>
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
						{discussions.data.length ? (
							<Grid container spacing={2}>
								{discussions.data.map((discussion) => {
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
							<NotFindComponent showText width="100%" height={300} />
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
