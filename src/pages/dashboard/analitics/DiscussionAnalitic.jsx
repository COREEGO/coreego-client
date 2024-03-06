import {
	Grid,
	Card,
	CardHeader,
	CardContent,
	Box
} from "@mui/material";
import CamamberChart from "../../../components/charts/CamamberChart";
import DefaultLinechart from "../../../components/charts/DefaultLinechart";

const DiscussionAnalitic = ({ datas }) => {
	return (
		<Grid container spacing={5}>
			<Grid item xs={12} md={6}>
				<Card>
					<CardHeader
						title="Publications"
						subheader={datas?.count?.total}
					/>
					<CardContent>
							<CamamberChart datas={datas?.count?.by_categories} />
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={12} md={6}>
				<Card>
					<CardHeader title="Filtre par date" />
					<CardContent>
						<DefaultLinechart datas={datas?.charts} />
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
};

export default DiscussionAnalitic;
