import LikeCountIcon from "../icons/LikeCountIcon";
import StarsAverageIcon from "../icons/StarsAverageIcon";
import CategoryText from "../texts/CategoryText";
import {
	Avatar,
	Card,
	CardActionArea,
	CardContent,
	CardHeader,
	CardMedia,
	Stack,
	Typography
} from "@mui/material";
import CommentCountIcon from "../icons/CommentCounterIcon";
import {
	AVATAR_PATH,
	IMAGE_PATH,
	UNKNOWN_USER
} from "../../utils/variables";
import moment from "moment";
import { MARKER_ICON } from "../../utils/icon";

const PlaceCard = ({ place }) => {
	return (
		<Card elevation={3}>
			<CardActionArea component="div">
				<CardHeader
					avatar={<Avatar alt={place?.user?.pseudo} src={AVATAR_PATH + place?.user?.avatar} />}
					title={
						<Typography component="div" fontWeight="bold">
							{place?.user?.pseudo || UNKNOWN_USER}
						</Typography>
					}
					subheader={moment(place.created_at).format("D MMMM YYYY")}
				/>
				<CardMedia
					alt={place.title}
					component="img"
					height="194"
					image={
						place?.thumbnail?.name
							? IMAGE_PATH + place?.thumbnail?.name
							: "https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png"
					}
				/>
				<CardContent>
					<CategoryText category={place.category} />
					<Typography
						mt={1}
						color="var(--coreego-blue)"
						component="div"
						variant="h6"
						fontWeight="inherit"
						noWrap
						gutterBottom
					>
						{place.title}
					</Typography>
					<Stack direction="row">
						<MARKER_ICON />
						<Typography noWrap component="div">
							{place.city.label}, {place.district.label}
						</Typography>
					</Stack>
					<Stack
						mt={2}
						direction="row"
						justifyContent="space-between"
					>
						<StarsAverageIcon datas={place.review_average} />
						<Stack direction="row" gap={1}>
							<CommentCountIcon count={place.comments_count} />
							<LikeCountIcon count={place.likes_count} />
						</Stack>
					</Stack>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default PlaceCard;
