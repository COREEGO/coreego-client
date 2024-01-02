// import { Box, Divider, Stack, Image, ListItem, ListIcon, List, useDisclosure, Drawer, DrawerContent, DrawerBody, Button, DrawerHeader, IconButton, Avatar, Menu, MenuButton, MenuList, MenuItem, Hide, Container, MenuIcon, Tooltip } from "@chakra-ui/react";
import { MdOutlineComment, MdOutlineShoppingBag, MdOutlineTravelExplore, MdOutlineMenu, MdClose } from "react-icons/md";
import logo from '../../images/svgs/coreego-logo.svg'
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthProvider";
import ContainerSection from "../../pages/components/ContainerSection";
// import { CLOSE_ICON, FORUM_ICON, MARKET_PLACE_ICON, PROFIL_ICON, TRAVEL_ICON } from "../../utils/icon";
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
import { CardMedia, Divider, ImageListItem, ListItemIcon, ListItemText } from "@mui/material";
import { LOGOUT_ICON, PROFIL_ICON, SAVED_PLACE_ICON } from "../../utils/icon";


const links = [
    {
        path: '/forum',
        label: "Forum",
    },
    {
        path: '/market-place',
        label: "Market place",
    },
    {
        path: '/voyage',
        label: 'Voyage',

    }
]

interface NavigationInterface {
    // children: React.ReactNode
}

const NavigationUserMenu = () => {
    const { user, logout }: any = useAuthContext()

    const UserloggedMenu = () => {
        return (
            <>
                <NavLink to={`/user/profil/${user.id}`}>
                    <MenuItem sx={{ color: 'black' }}>
                        <ListItemIcon><PROFIL_ICON /></ListItemIcon>
                        <ListItemText>Profil</ListItemText>
                    </MenuItem>
                </NavLink>
                <NavLink to={`/user/carnet-de-voyage`}>
                    <MenuItem sx={{ color: 'black' }}>
                        <ListItemIcon><SAVED_PLACE_ICON /></ListItemIcon>
                        <ListItemText>Mon carnet de voyage</ListItemText>
                    </MenuItem>
                </NavLink>
                <Divider />
                <MenuItem sx={{ color: 'black' }} onClick={logout} >
                    <ListItemIcon><LOGOUT_ICON /></ListItemIcon>
                    <ListItemText>Se déconnecter</ListItemText>
                </MenuItem>
            </>
        )
    }

    const UserUnloggedMenu = () => {
        return (
            <>
                <NavLink style={{ display: "block" }} to="/login">
                    <MenuItem>
                        Se connecter
                    </MenuItem>
                </NavLink>
                <NavLink style={{ display: "block" }} to="/register">
                    <MenuItem>S'inscrire</MenuItem>
                </NavLink>
            </>
        )
    }

    return (
        <>
            {user ? <UserloggedMenu /> : <UserUnloggedMenu />}
        </>
    )

}

const Navigation: React.FC<NavigationInterface> = () => {

    const { user }: any = useAuthContext()
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    return (
        <AppBar position="sticky" sx={{ top: 0, backgroundColor: 'white' }} color="transparent"  >
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                        <img
                            width={120}
                            height="auto"
                            src={logo}
                            title="coreego"
                        />
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
                                        <Typography textAlign="center" >{link.label} </Typography>
                                    </MenuItem>
                                </NavLink>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, mr: 1 }}>
                        <img
                            width={120}
                            height="auto"
                            src={logo}
                            title="coreego"
                        />
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {links.map((link: any) => (
                            <NavLink to={link.path} key={link.path}>
                                <Button
                                    sx={{ my: 2, color: 'black', fontWeight: 'bold', display: 'block' }}
                                >
                                    {link.label}
                                </Button>
                            </NavLink>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={(event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget)} sx={{ p: 0 }}>
                                <UserSniped styles={{ width: 40, height: 40 }} avatar={user?.avatarPath} />
                            </IconButton>
                        </Tooltip>
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