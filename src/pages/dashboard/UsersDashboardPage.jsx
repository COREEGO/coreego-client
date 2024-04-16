import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
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
import { useAuthContext } from "../../contexts/AuthProvider";
import PaginationData from "../../components/PaginationData";

const UsersDashboardPage = () => {
	const [users, setUsers] = React.useState([]);
	const [isBusy, setIsBusy] = React.useState(true);
	const [roles, setRoles] = React.useState([]);
	const location = useLocation();

	const { auth } = useAuthContext();

	React.useEffect(() => {
		loadUsers();
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
		} finally {
			setIsBusy(false);
		}
	};

	const handleChangeRole = async (event, userId) => {
		try {
			await axios.post(
				`/users/edit/${userId}`,
				{
					role_id: event.target.value
				},
				BEARER_HEADERS
			);
		} catch (error) {}
	};

	return (
		<Stack spacing={3}>
			<TitleSectionText endText="Utilisateurs" />
			<TableContainer component={Paper}>
				<Table aria-label="simple table">
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
											<Avatar src={AVATAR_PATH + user.avatar} />
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
		</Stack>
	);
};

export default UsersDashboardPage;
