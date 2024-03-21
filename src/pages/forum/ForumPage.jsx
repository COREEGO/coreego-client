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
import HEADER_IMG from "../../images/headers/espace-discussion.jpg";
import { CLOSE_ICON, FILTER_ICON } from "../../utils/icon";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingPage from "../../components/LoadingPage";
import SearchInput from "../../components/inputs/SearchInput";
import DiscussionCard from "../../components/card/DiscussionCard";
import HeroBannerFeed from "../components/templates/HeroBannerFeed";
import PaginationData from "../../components/PaginationData";

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
		<React.Fragment>
			<HeroBannerFeed
				theme="red"
				titleFr="Forum"
				titleKr="포럼"
				description="
				MACC Essentials has an important role in making
				supplies and services available to customers and
				their patients during this critical time. This
				includes services from various domains. Our aim is
				to aid you. As much we can.
				"
				imageLink={HEADER_IMG}
				buttonLabel="créer une discussion"
				buttonLink="/forum/discussion/create"
				imageDirection="end"
			/>

			<Box>
				<Container>
					<Hidden smDown>
						<Stack direction="row" gap={2} flexWrap="wrap">
							<SearchInput
								defaultValue={searchParams.get("q")}
								onChange={(value) => updateFilter("q", value)}
							/>
							<TextField
								value={searchParams.get("category") || "0"}
								onChange={(value) =>
									updateFilter(
										"category",
										value.target.value.toString()
									)
								}
								select
							>
								<MenuItem value="0">Toutes les catégories</MenuItem>
								{discussionCategories.map((category) => (
									<MenuItem key={category.id} value={category.id}>
										{category.label}
									</MenuItem>
								))}
							</TextField>
						</Stack>
					</Hidden>
					<Hidden smUp>
						<Box>
							<Button
								fullWidth
								size="large"
								onClick={() => setIsOpenFilterModal(true)}
								variant="outlined"
								startIcon={<FILTER_ICON />}
							>
								Filtres
							</Button>
							<Dialog
								onClose={() => setIsOpenFilterModal(false)}
								open={isOpenFilterModal}
							>
								<DialogTitle display="flex" alignItems="center">
									<FILTER_ICON sx={{ mr: 2 }} /> Filtres{" "}
								</DialogTitle>
								<IconButton
									aria-label="close"
									onClick={() => setIsOpenFilterModal(false)}
									sx={{
										position: "absolute",
										right: 8,
										top: 8
									}}
								>
									<CLOSE_ICON />
								</IconButton>
								<DialogContent dividers>
									<Stack direction="row" gap={1} flexWrap="wrap">
										<SearchInput
											fullWidth
											placeholder="Rechercher une discussion..."
											defaultValue={searchParams.get("q")}
											onChange={(value) => updateFilter("q", value)}
										/>
										<TextField
											margin="normal"
											fullWidth
											value={searchParams.get("category") || "0"}
											onChange={(value) =>
												updateFilter(
													"category",
													value.target.value.toString()
												)
											}
											select
										>
											<MenuItem value="0">
												Toutes les catégories
											</MenuItem>
											{discussionCategories.map((category) => (
												<MenuItem
													key={category.id}
													value={category.id}
												>
													{category.label}
												</MenuItem>
											))}
										</TextField>
									</Stack>
								</DialogContent>
							</Dialog>
						</Box>
					</Hidden>
				</Container>
			</Box>

			{isLoading ? (
				<LoadingPage type="data" />
			) : (
				<>
					<Box my={5}>
						<Container>
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
								<Typography textAlign="center">
									Aucune discussion trouvé
								</Typography>
							)}
						</Container>
					</Box>
					<Box
						sx={{ display: "flex", justifyContent: "center", mb: 5 }}
					>
						<PaginationData lastPage={discussions?.meta.last_page} />
					</Box>
				</>
			)}
		</React.Fragment>
	);
};

export default ForumPage;
