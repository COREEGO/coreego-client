import logo from '../../images/svgs/coreego-logo.svg'
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthProvider";
import { BsPerson } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import UserSniped from "../react-ux/UserSniped";
import React from "react";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import PersonIcon from '@mui/icons-material/Person';
import { CardMedia, Divider, Hidden, ImageListItem, ListItemIcon, ListItemText } from "@mui/material";
import { DASHBOARD_ICON, FORUM_ICON, LOGOUT_ICON, MARKET_PLACE_ICON, PROFIL_ICON, SAVED_PLACE_ICON, TRAVEL_ICON, UNSAVED_PLACE_ICON } from "../../utils/icon";
import { AVATAR_PATH } from '../../utils/variables';
import { isAdmin } from '../../utils';


const links = [
    {
        path: '/forum',
        label: "Forum",
        icon: FORUM_ICON
    },
    {
        path: '/market-place',
        label: "Market place",
        icon: MARKET_PLACE_ICON
    },
    {
        path: '/voyage',
        label: 'Voyage',
        icon: TRAVEL_ICON
    }
]

const NavigationUserMenu = () => {
    const { user, logout }: any = useAuthContext()

    return (
        <>
            {user ? <>
                {
                    isAdmin(user.role.name) &&
                    <NavLink to="/dashboard">
                        <MenuItem sx={{ color: 'black' }}>
                            <ListItemIcon sx={{ color: "black" }}><DASHBOARD_ICON /></ListItemIcon>
                            <ListItemText>Dashboard</ListItemText>
                        </MenuItem>
                    </NavLink>
                }
                <NavLink to={`/user/profil/${user.slug}`}>
                    <MenuItem sx={{ color: 'black' }}>
                        <ListItemIcon sx={{ color: "black" }}><PROFIL_ICON /></ListItemIcon>
                        <ListItemText>Profil</ListItemText>
                    </MenuItem>
                </NavLink>
                <NavLink to={`/user/carnet-de-voyage`}>
                    <MenuItem sx={{ color: 'black' }}>
                        <ListItemIcon sx={{ color: "black" }}><UNSAVED_PLACE_ICON /></ListItemIcon>
                        <ListItemText>Mon carnet de voyage</ListItemText>
                    </MenuItem>
                </NavLink>
                <Divider />
                <MenuItem sx={{ color: 'black' }} onClick={logout} >
                    <ListItemIcon sx={{ color: "black" }}><LOGOUT_ICON /></ListItemIcon>
                    <ListItemText>Se déconnecter</ListItemText>
                </MenuItem>
            </>

                : <>
                    <NavLink style={{ display: "block", color: 'black' }} to="/login">
                        <MenuItem>
                            Se connecter
                        </MenuItem>
                    </NavLink>
                    <NavLink style={{ display: "block", color: 'black' }} to="/register">
                        <MenuItem>S'inscrire</MenuItem>
                    </NavLink>
                </>
            }
        </>
    )

}

const Navigation = () => {

    const { user }: any = useAuthContext()
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);


    return (
        <AppBar position="sticky" sx={{ top: 0, backgroundColor: 'white' }} color="transparent"  >
            <Container>
                <Toolbar disableGutters>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <NavLink className="nav_logo" to="/">
                            <img
                                width={150}
                                height="auto"
                                src={logo}
                                title="coreego"
                            />
                        </NavLink>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={(event: React.MouseEvent<HTMLElement>) =>
                                setAnchorElNav(event.currentTarget)
                            }
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={() => setAnchorElNav(null)}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >

                            {links.map((link: any) => (
                                <NavLink to={link.path} key={link.path}>
                                    <MenuItem sx={{ color: 'black' }} onClick={() => setAnchorElNav(null)}>
                                        <ListItemIcon sx={{ color: 'black' }}><link.icon /></ListItemIcon>
                                        <Typography textAlign="center" >{link.label} </Typography>
                                    </MenuItem>
                                </NavLink>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, mr: 1 }}>
                        <NavLink className="nav_logo" to="/">
                            <img
                                width={150}
                                height="auto"
                                src={logo}
                                title="coreego"
                            />
                        </NavLink>
                    </Box>

                    <Box className="navlink" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                        {links.map((link: any) => (
                            <NavLink style={{ display: 'flex', alignItems: 'center', margin: '0 20px' }} to={link.path} key={link.path}>
                                <link.icon sx={{ mr: 1 }} />
                                {link.label}
                            </NavLink>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton onClick={(event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget)} sx={{ p: 0 }}>
                            <Avatar src={AVATAR_PATH + user?.avatarPath} />
                        </IconButton>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={() => setAnchorElUser(null)}
                        >
                            <Box onClick={() => setAnchorElUser(null)}>
                                <NavigationUserMenu />
                            </Box>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    )
}

export default Navigation