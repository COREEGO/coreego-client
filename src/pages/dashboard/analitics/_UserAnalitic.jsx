import {
	Grid,
	Card,
	CardHeader,
	CardContent,
} from "@mui/material";
import DefaultLinechart from "../../../components/charts/DefaultLinechart";
import DefaultTinyBarChart from "../../../components/charts/DefaultTinyBarChart";


const UserAnalitic = ({ datas }) => {
	return (
		<Grid container spacing={5}>
			<Grid item xs={12} md={6}>
				<Card>
					<CardHeader
						title="Utilisateurs"
						subheader={datas?.by_roles?.total}
					/>
					<CardContent>
						<DefaultTinyBarChart
							datas={datas?.by_roles?.groups}
						/>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={12} md={6}>
				<Card>
					<CardHeader title="Inscription par date" />
					<CardContent>
						<DefaultLinechart datas={datas?.by_dates} />
					</CardContent>
				</Card>
			</Grid>

		</Grid>
	);
};

export default UserAnalitic;
