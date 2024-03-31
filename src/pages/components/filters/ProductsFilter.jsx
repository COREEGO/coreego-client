import { Stack } from "@mui/material";
import ClearFilterButton from "./inputs-rework/ClearFilterButton";
import SearchFilterRework from "./inputs-rework/SearchFilerRework";
import LocalisationFilterRework from "./inputs-rework/LocalisationFilterRework";
import PriceFilterRework from "./inputs-rework/PriceFilterRework";

const ProductsFilter = ({ data }) => {

	return (
		<Stack
			py={1}
			borderTop="1px solid black"
			borderBottom="1px solid black"
			direction="row"
			gap={1}
			flexWrap="wrap"
		>
			<SearchFilterRework />
			<LocalisationFilterRework />
			<PriceFilterRework
				min={data?.min_price}
				max={data?.max_price}
			/>
			<ClearFilterButton />
		</Stack>
	);
};

export default ProductsFilter;
