import {
	Grid,
	Card,
	CardHeader,
	CardContent,
	List,
	ListItem,
	ListItemText,
    Divider
} from "@mui/material";
import DefaultLinechart from "../../../components/charts/DefaultLinechart";

const ProductAnalitic = ({ datas }) => {
	return (
		<Grid container spacing={5}>
			<Grid item xs={12} md={6}>
				<Card>
					<CardHeader
						title="Produits par ville"
						subheader={datas?.by_cities?.total}
					/>
					<CardContent>
						<List>
                            {
                                datas?.by_cities?.groups.map(city => {
                                    return (
                                        <>
                                        <ListItem secondaryAction={city.value}>
                                        <ListItemText primary={city.label} />
                                    </ListItem>
                                    <Divider />
                                        </>
                                    )
                                })
                            }
						</List>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={12} md={6}>
				<Card>
					<CardHeader title="Produits publiés par date" />
					<CardContent>
						<DefaultLinechart datas={datas?.by_dates} />
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
};

export default ProductAnalitic;
