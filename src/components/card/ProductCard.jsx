import {
	Card,
	CardContent,
	Stack,
	CardMedia,
	Typography
} from "@mui/material";
import { getFirstImage } from "../../utils";
import LocalisationText from "../texts/LocalisationText";
import PriceText from "../texts/PriceText";
import { LOCALISATION_ICON, MARKER_ICON } from "../../utils/icon";

const ProductCard = ({ product }) => {
	return (
		<Card
			elevation={3}
			raised={true}
			sx={{
				transition: "0.3s ease",
				":hover": {
					boxShadow: "0 0 8px" // Change this value to the desired elevation on hover
				}
			}}
		>
			<CardMedia
				component="img"
				sx={{
					height: { xs: 200, md: 150 }
				}}
				width="100%"
				image={
					getFirstImage(product.images) ||
					"https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png"
				}
				alt={product.title}
			/>
			<CardContent>
				<Stack spacing={1}>
					<Typography
						color="var(--coreego-blue)"
						component="span"
						variant="h6"
						noWrap={true}
					>
						{product.title}
					</Typography>
					<Typography fontWeight="bold" noWrap={true}>
						{" "}{product.price} KRW{" "}
					</Typography>
					<Typography>
						{" "}<MARKER_ICON /> {product.city.label},{" "}
						{product.district.label}{" "}
					</Typography>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default ProductCard;
