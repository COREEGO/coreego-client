import {
	Grid,
	Card,
	CardHeader,
	CardContent,
	Box,
	Tab
} from "@mui/material";
import DefaultLinechart from "../../../components/charts/DefaultLinechart";
import DefaultTinyBarChart from "../../../components/charts/DefaultTinyBarChart";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TinyBarFilterChart from "../../../components/charts/TinyBarFilterChart";

const UserAnalitic = ({ datas }) => {
	return (
		<Grid container spacing={5}>
			<Grid item xs={12} md={6}>
				<Card>
					<CardHeader
						title="Utilisateurs"
						subheader={datas?.count?.total}
					/>
					<CardContent>
						<DefaultTinyBarChart
							datas={datas?.count?.by_categories}
						/>
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
			<Grid item xs={12} md={6}>
				<Card>
					<CardHeader title="Top utilisateurs" />
					<TabContext value={"1"}>
						<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
							<TabList
								onChange={event => console.log(event)}
								aria-label="lab API tabs example"
							>
								<Tab label="Discussions" value="1" />
								<Tab label="Lieux" value="2" />
							</TabList>
						</Box>
						<TabPanel value="1">
							<TinyBarFilterChart datas={datas?.top_publishers?.discussions} />
						</TabPanel>
						<TabPanel value="2">Item Two</TabPanel>
					</TabContext>
				</Card>
			</Grid>
		</Grid>
	);
};

export default UserAnalitic;
