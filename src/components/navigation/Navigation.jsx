import logo from "../../images/coreego-logo-rb.png";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthProvider";
import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import {
	Badge,
	Button,
	Divider,
	Hidden,
	ListItemIcon,
	ListItemText,
	Stack
} from "@mui/material";
import {
	DASHBOARD_ICON,
	LOGOUT_ICON,
	NOTIFICATION_ICON,
	PROFIL_ICON,
	UNSAVED_PLACE_ICON
} from "../../utils/icon";
import { AVATAR_PATH } from "../../utils/variables";
import { LINKS, hasNotificationNotReaded } from "../../utils";

const NavigationauthMenu = () => {
	const { auth, logout } = useAuthContext();

	return (
		<>
			{auth?.role?.is_admin ? (
				<NavLink to="/dashboard/analyse-des-donnees">
					<MenuItem sx={{ color: "black" }}>
						<ListItemIcon sx={{ color: "black" }}>
							<DASHBOARD_ICON />
						</ListItemIcon>
						<ListItemText>Dashboard</ListItemText>
					</MenuItem>
				</NavLink>
			) : (
				<></>
			)}
			<Hidden mdUp>
				<NavLink to={`/mes-notifications`}>
					<MenuItem sx={{ color: "black" }}>
						<ListItemIcon sx={{ color: "black" }}>
							<Badge
								color={
									hasNotificationNotReaded(auth.notifications)
										? "error"
										: ""
								}
								variant="dot"
							>
								<NOTIFICATION_ICON />
							</Badge>
						</ListItemIcon>
						<ListItemText>Mes notifications</ListItemText>
					</MenuItem>
				</NavLink>
			</Hidden>
			<NavLink to={`/mon-compte`}>
				<MenuItem sx={{ color: "black" }}>
					<ListItemIcon sx={{ color: "black" }}>
						<PROFIL_ICON />
					</ListItemIcon>
					<ListItemText>Mon compte</ListItemText>
				</MenuItem>
			</NavLink>
			<NavLink to={`/mon-carnet-de-voyage`}>
				<MenuItem sx={{ color: "black" }}>
					<ListItemIcon sx={{ color: "black" }}>
						<UNSAVED_PLACE_ICON />
					</ListItemIcon>
					<ListItemText>Mon carnet de voyage</ListItemText>
				</MenuItem>
			</NavLink>
			<Divider />
			<MenuItem sx={{ color: "black" }} onClick={logout}>
				<ListItemIcon sx={{ color: "black" }}>
					<LOGOUT_ICON />
				</ListItemIcon>
				<ListItemText>Se déconnecter</ListItemText>
			</MenuItem>
		</>
	);
};

const Navigation = () => {
	const { auth } = useAuthContext();
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElauth, setAnchorElauth] = React.useState(null);

	return (
		<AppBar
			component="nav"
			position="sticky"
			sx={{ top: 0, backgroundColor: "white" }}
			color="transparent"
		>
			<Container>
				<Toolbar disableGutters>
					<Box sx={{ display: { xs: "none", md: "flex" } }}>
						<NavLink className="nav_logo" to="/">
							<img
								width={150}
								height={26}
								src={logo}
								title="coreego"
								alt="coreego logo"
							/>
						</NavLink>
					</Box>

					<Box sx={{ display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current auth"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={(event) => setAnchorElNav(event.currentTarget)}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left"
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left"
							}}
							open={Boolean(anchorElNav)}
							onClose={() => setAnchorElNav(null)}
							sx={{
								display: { xs: "block", md: "none" }
							}}
						>
							{LINKS.map((link) => (
								<NavLink to={link.path} key={link.path}>
									<MenuItem
										sx={{ color: "black" }}
										onClick={() => setAnchorElNav(null)}
									>
										<ListItemIcon sx={{ color: "black" }}>
											<link.icon />
										</ListItemIcon>
										<Typography textAlign="center">
											{link.label}{" "}
										</Typography>
									</MenuItem>
								</NavLink>
							))}
						</Menu>
					</Box>

					<Box
						sx={{
							flex: 1,
							justifyContent: "center",
							display: { xs: "flex", md: "none" }
						}}
					>
						<NavLink className="nav_logo" to="/">
							<img
								width={150}
								height={26}
								src={logo}
								title="coreego"
								alt="coreego logo"
							/>
						</NavLink>
					</Box>

					<Stack
						className="navlink"
						gap={3}
						direction="row"
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
							justifyContent: "center"
						}}
					>
						{LINKS.map((link) => (
							<NavLink
								style={{
									display: "flex",
									alignItems: "center"
								}}
								to={link.path}
								key={link.path}
							>
								<link.icon sx={{ mr: 1 }} />
								{link.label}
							</NavLink>
						))}
					</Stack>

					{auth ? (
						<Stack
							flexGrow={0}
							direction="row"
							alignItems="center"
							gap={1}
						>
							<Hidden mdDown>
								<Box>
									<NavLink to="/mes-notifications">
										<IconButton size="small">
											<Badge
												color={
													hasNotificationNotReaded(auth.notifications)
														? "error"
														: ""
												}
												variant="dot"
											>
												<NOTIFICATION_ICON />
											</Badge>
										</IconButton>
									</NavLink>
								</Box>
							</Hidden>
							<Box>
								<IconButton
									onClick={(event) =>
										setAnchorElauth(event.currentTarget)
									}
									sx={{ p: 0 }}
								>
									<Hidden mdUp>
										<Badge
											color={
												hasNotificationNotReaded(auth.notifications)
													? "error"
													: ""
											}
											variant="dot"
										>
											<Avatar
												alt={auth?.pseudo}
												src={AVATAR_PATH + auth?.avatar}
											/>
										</Badge>
									</Hidden>
									<Hidden mdDown>
										<Avatar
											alt={auth?.pseudo}
											src={AVATAR_PATH + auth?.avatar}
										/>
									</Hidden>
								</IconButton>
								<Menu
									anchorEl={anchorElauth}
									anchorOrigin={{
										vertical: "bottom",
										horizontal: "right"
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right"
									}}
									open={Boolean(anchorElauth)}
									onClose={() => setAnchorElauth(null)}
								>
									<Box onClick={() => setAnchorElauth(null)}>
										<NavigationauthMenu />
									</Box>
								</Menu>
							</Box>
						</Stack>
					) : (
						<NavLink to="/login">
							<Button>Se connecter</Button>
						</NavLink>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Navigation;
