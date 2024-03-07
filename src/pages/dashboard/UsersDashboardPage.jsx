import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	Avatar,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Stack
} from "@mui/material";
import TitleSectionText from "../../components/texts/TitleSectionText";
import React from "react";
import axios from "axios";
import { AVATAR_PATH, BEARER_HEADERS } from "../../utils/variables";
import { useLocation } from "react-router";
import LoadingPage from "../../components/LoadingPage";
import { toast } from "react-toastify";
import { useAuthContext } from "../../contexts/AuthProvider";
import PaginationData from "../../components/PaginationData";

const UsersDashboardPage = () => {
	const [users, setUsers] = React.useState([]);
	const [isBusy, setIsBusy] = React.useState(true);
	const [roles, setRoles] = React.useState([]);
	const location = useLocation();

	const { user: auth } = useAuthContext();

	React.useEffect(() => {
		loadUsers();
		console.log(users?.meta?.last_page);
	}, [location.search]);

	const loadUsers = async () => {
		try {
			setIsBusy(true);
			const responseUsers = await axios.get(
				`/users${location.search}`,
				BEARER_HEADERS
			);

			const responseRoles = await axios.get("/roles");

			setUsers(responseUsers.data);
			setRoles(responseRoles.data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsBusy(false);
		}
	};

	const handleChangeRole = async (event, userId) => {
		try {
			const response = await axios.post(
				`/users/edit/${userId}`,
				{
					role_id: event.target.value
				},
				BEARER_HEADERS
			);
			toast.success(response.data.message);
		} catch (error) {
			toast.error(error.data.message);
		}
	};

	return (
		<Box>
			<TitleSectionText endText="Utilisateurs" />
			<TableContainer component={Paper} sx={{mt: 3}}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Avatar</TableCell>
							<TableCell>Pseudo</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Role</TableCell>
						</TableRow>
					</TableHead>

					{isBusy ? (
						<LoadingPage type="data" />
					) : (
						<TableBody>
							{users?.data?.map((user) => {
								return (
									<TableRow key={user.id}>
										<TableCell component="th" scope="row">
											<Avatar src={AVATAR_PATH + user.avatarPath} />
										</TableCell>
										<TableCell component="th" scope="row">
											{user.slug}
										</TableCell>
										<TableCell component="th" scope="row">
											{user.email}
										</TableCell>
										<TableCell component="th" scope="row">
											{auth.role.is_superadmin ? (
												<FormControl>
													<InputLabel>Role</InputLabel>
													<Select
                            size="small"
														label="Role"
														defaultValue={user.role.id} // Set the initial value based on user's role
														onChange={(event) =>
															handleChangeRole(event, user.id)
														}
													>
														{roles.map((role) => (
															<MenuItem key={role.id} value={role.id}>
																{role.name}
															</MenuItem>
														))}
													</Select>
												</FormControl>
											) : (
												user.role.name
											)}
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					)}
				</Table>
				<Stack
					py={2}
					justifyContent="flex-end"
					sx={{ width: "100%" }}
				>
					<PaginationData lastPage={users?.meta?.last_page} />
				</Stack>
			</TableContainer>
		</Box>
	);
};

export default UsersDashboardPage;
