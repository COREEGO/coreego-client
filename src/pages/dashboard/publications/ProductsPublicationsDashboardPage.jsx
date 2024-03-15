import {
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Avatar,
	Typography,
	Menu,
	Box
} from "@mui/material";
import TitleSectionText from "../../../components/texts/TitleSectionText";
import React, { useMemo } from "react";
import LoadingPage from "../../../components/LoadingPage";
import axios from "axios";
import { AVATAR_PATH } from "../../../utils/variables";
import PaginationData from "../../../components/PaginationData";
import CategoryText from "../../../components/texts/CategoryText";
import { useLocation } from "react-router";
import { IconButton } from "@chakra-ui/react";
import { MARKER_ICON, MORE_OPTIONS_ICON } from "../../../utils/icon";
import OptionPublicationButton from "../../../components/buttons/OptionPublicationButton";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";

const ProductsPublicationsDashboardPage = () => {
	const [products, setProducts] = React.useState([]);
	const [isBusy, setIsBusy] = React.useState(true);

	const location = useLocation();

	React.useEffect(() => {
		loadProducts();
	}, [location.search]);

	const loadProducts = async () => {
		try {
			setIsBusy(true);
			const response = await axios.get(`/products${location.search}`);
			setProducts(response.data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsBusy(false);
		}
	};

	return (
		<Stack spacing={3}>
			<TitleSectionText endText="Produits mis en vente" />
			{isBusy ? (
				<LoadingPage type="data" />
			) : (
				<TableContainer component={Paper}>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Utilisateur</TableCell>
								<TableCell>Titre</TableCell>
								<TableCell>Prix</TableCell>
								<TableCell>Localisation de la vente</TableCell>
								<TableCell>Date publication</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{products?.data?.data.map((product) => {
								return (
									<TableRow key={product.id}>
										<TableCell component="th" scope="row">
											<Stack
												direction="row"
												alignItems="center"
												spacing={1}
											>
												<Avatar
													sx={{ width: 40, height: 40 }}
													src={AVATAR_PATH + product.user.avatar}
												/>
												<Stack>
													<Typography fontWeight="bold">
														{product.user.pseudo}
													</Typography>
													<Typography>
														{product.user.email}
													</Typography>
												</Stack>
											</Stack>
										</TableCell>
										<TableCell component="th" scope="row">
											{product.title}
										</TableCell>
										<TableCell component="th" scope="row">
											₩ {product.price}
										</TableCell>
										<TableCell component="th" scope="row">
											<Stack direction="row">
												<MARKER_ICON />
												<Typography noWrap component="div">
													{product.city.label},
													{product.district.label}
												</Typography>
											</Stack>
										</TableCell>
										<TableCell component="th" scope="row">
											{moment(product.created_at).format(
												"D MMMM YYYY"
											)}
										</TableCell>
										<TableCell component="th" scope="row">
											<OptionPublicationButton
												editLink={`/market-place/product/edit/${product.slug}`}
												deleteUrl={`/products/${product.id}`}
												mutate={loadProducts}
											/>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			)}
			<PaginationData lastPage={products?.meta?.last_page} />
		</Stack>
	);
};

export default ProductsPublicationsDashboardPage;
