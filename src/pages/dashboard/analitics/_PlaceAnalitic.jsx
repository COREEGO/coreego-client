import {
	Grid,
	Card,
	CardHeader,
	CardContent,
    List,
    ListItem,
    Divider,
    ListItemText
} from "@mui/material";
import CamamberChart from "../../../components/charts/CamamberChart";
import DefaultLinechart from "../../../components/charts/DefaultLinechart";

const PlaceAnalitic = ({ datas }) => {
	return (
		<Grid container spacing={5}>
			<Grid item xs={12} md={6}>
				<Card>
					<CardHeader
						title="Publications par catégorie"
						subheader={datas?.by_categories?.total}
					/>
					<CardContent>
						<CamamberChart datas={datas?.by_categories?.groups} />
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={12} md={6}>
				<Card>
					<CardHeader title="Publication par date" />
					<CardContent>
						<DefaultLinechart datas={datas?.by_dates} />
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={12} md={6}>
				<Card>
					<CardHeader
						title="Lieux par ville"
						subheader={datas?.by_cities?.total}
					/>
					<CardContent>
						<List>
							{datas?.by_cities?.groups.map((city) => {
								return (
									<>
										<ListItem secondaryAction={city.value}>
											<ListItemText primary={city.label} />
										</ListItem>
										<Divider />
									</>
								);
							})}
						</List>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
};

export default PlaceAnalitic;
