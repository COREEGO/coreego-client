import { getFirstImage } from "../../utils";
import { NavLink } from "react-router-dom";
import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	IconButton,
	Menu,
	Typography,
	useTheme,
	Stack
} from "@mui/material";
import {
	CALENDAR_ICON,
	CLOSE_ICON,
	EYE_ICON,
	GPS_ICON,
	MARKER_ICON,
	TRASH_ICON
} from "../../utils/icon";
import CategoryText from "../texts/CategoryText";
import {
	DateCalendar,
	LocalizationProvider
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
	BEARER_HEADERS,
	IMAGE_PATH,
	goToKakaoMapByLatLong
} from "../../utils/variables";
import moment from "moment";
import dayjs from "dayjs";
import { LoadingButton } from "@mui/lab";

const DatePicker = ({ place, mutate }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [isBusyAddDate, setIsBusyAddDate] = React.useState(false);
	const [isBusyDeleteDate, setIsBusyDeleteDate] =
		React.useState(false);
	const [selectedDate, setSelectedDate] = React.useState(
		place?.visit_at || new Date()
	);

	const onUpdateDate = async () => {
		try {
			setIsBusyAddDate(true);
			const formattedDate = dayjs(selectedDate).format(
				"YYYY-MM-DD HH:mm:ss"
			);

			const response = await axios.put(
				`/save-place/edit/${place.save_id}`,
				{
					visit_at: formattedDate
				},
				BEARER_HEADERS
			);
			toast.success(response.data.message);
			mutate();
		} catch (error) {
			console.log(error);
		} finally {
			setIsBusyAddDate(false);
		}
	};

	const onDeleteDate = async () => {
		try {
			setIsBusyDeleteDate(true);
			const response = await axios.put(
				`/save-place/edit/${place.save_id}`,
				{
					visit_at: null
				},
				BEARER_HEADERS
			);
			toast.success(response.data.message);
			mutate();
		} catch (error) {
			console.log(error);
		} finally {
			setIsBusyDeleteDate(false);
		}
	};

	const labelButton = place?.visit_at
		? moment(place?.visit_at).format("dddd DD MMMM YYYY")
		: "Choisir une date";

	return (
		<>
			<Button
				color="warning"
				startIcon={<CALENDAR_ICON />}
				onClick={(event) => setAnchorEl(event.currentTarget)}
				variant="outlined"
				size="small"
			>
				{labelButton}
			</Button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={() => setAnchorEl(null)}
			>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DateCalendar
						value={dayjs(selectedDate)}
						onChange={(event) => setSelectedDate(event)}
					/>
				</LocalizationProvider>
				<LoadingButton
					loading={isBusyAddDate}
					variant="contained"
					onClick={onUpdateDate}
					fullWidth
				>
					Valider cette date
				</LoadingButton>
				{place.visit_at && (
					<Box mt={1}>
						<LoadingButton
							loading={isBusyDeleteDate}
							startIcon={<TRASH_ICON />}
							variant="contained"
							color="error"
							onClick={onDeleteDate}
							fullWidth
						>
							Supprimer la date
						</LoadingButton>
					</Box>
				)}
			</Menu>
		</>
	);
};

const PlaceMapCard = ({
	place,
	onClose,
	readOnly = true,
	mutate
}) => {
	const theme = useTheme(); // Utiliser le hook useTheme pour accéder au thème

	return (
		<Card sx={{ width: "100%", height: "100%" }}>
			{onClose && (
				<IconButton
					onClick={onClose}
					size="small"
					sx={{ position: "absolute", right: 1, top: 1 }}
				>
					<CLOSE_ICON />
				</IconButton>
			)}
			{
				<CardMedia
					component="img"
					height="194"
					image={IMAGE_PATH + place?.thumbnail}
					alt={place?.title}
				/>
			}

			<CardContent>
				<Stack flex={1} spacing={2}>
					<CategoryText category={place.category} />
					<Box>
						<Typography
							color="var(--coreego-blue)"
							component="p"
							variant="h6"
							noWrap={true}
						>
							{place.title}
						</Typography>
						<Typography color="var(--grey-bold)" noWrap={true}>
							{place.description}
						</Typography>
					</Box>
					<Typography display="flex" alignItems="center">
						<MARKER_ICON sx={{ mr: 1 }} />
						<Typography component="span" flex={1} noWrap={true}>
							{place?.city?.label}, {place?.district?.label}
						</Typography>
					</Typography>

					{readOnly ? (
						place.visit_at ? (
							<Typography
								color={theme.palette.warning.main}
								sx={{ display: "flex", alignItems: "center", gap: 1 }}
							>
								<CALENDAR_ICON />{" "}
								{moment(place.visit_at).format("dddd DD MMMM YYYY")}
							</Typography>
						) : (
							"Non planifié"
						)
					) : (
						<DatePicker place={place} mutate={mutate} />
					)}

					<Stack direction="row" spacing={2} mt={3}>
						<NavLink to={`/explorer/lieu/${place.slug}`}>
							<Button
								startIcon={<EYE_ICON />}
								size="small"
								variant="outlined"
							>
								Détail
							</Button>
						</NavLink>
						<NavLink
							target="_blank"
							to={goToKakaoMapByLatLong(
								place.title,
								place.latitude,
								place.longitude
							)}
						>
							<Button
								startIcon={<GPS_ICON />}
								size="small"
								variant="outlined"
							>
								Naviguer
							</Button>
						</NavLink>
					</Stack>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default PlaceMapCard;
