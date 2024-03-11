import { getFirstImage } from "../../utils";
import LocalisationText from "../texts/LocalisationText";
import { BiCloset } from "react-icons/bi";
import { CloseIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	IconButton,
	Stack,
	Typography
} from "@mui/material";
import {
	CLOSE_ICON,
	EYE_ICON,
	GPS_ICON,
	MARKER_ICON
} from "../../utils/icon";
import CategoryText from "../texts/CategoryText";

const PlaceMapCard = ({ place, onClose }) => {
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
					image={getFirstImage(place?.images)}
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
					<Stack direction="row" spacing={2} mt={3}>
						<NavLink to={`/voyage/place/${place.slug}`}>
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
							to={`https://map.kakao.com/link/to/${place.title},${place.latitude},${place.longitude}`}
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
