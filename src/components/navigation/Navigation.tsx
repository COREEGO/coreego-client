import { Box, Divider, Stack, Image, ListItem, ListIcon, List, useDisclosure, Drawer, DrawerContent, DrawerBody, Button, DrawerHeader, IconButton, Avatar, Menu, MenuButton, MenuList, MenuItem, Hide } from "@chakra-ui/react";
import { MdOutlineComment, MdOutlineShoppingBag, MdOutlineTravelExplore, MdOutlineMenu, MdClose } from "react-icons/md";
import logo from '../../images/svgs/coreego-logo.svg'
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthProvider";
import ContainerSection from "../../pages/components/ContainerSection";
import { CLOSE_ICON, FORUM_ICON, MARKET_PLACE_ICON, PROFIL_ICON, TRAVEL_ICON } from "../../utils/icon";
import { BsPerson } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";

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

interface NavigationInterface {
    // children: React.ReactNode
}

const NavigationLink: React.FC<{ onClick?: any }> = ({ onClick }) => {
    return (
        <List alignItems="center" display={{ base: 'block', md: 'flex' }}  >
            {
                links.map((link: any, index: number) => {
                    return (
                        <NavLink to={link.path}
                            onClick={onClick}
                            key={index}
                            style={{ marginRight: 10 }}
                        >
                            <ListItem key={index}
                                fontSize="md"
                                fontWeight={600}
                                alignItems="center"
                                display="flex"
                                width="100%"
                                cursor="pointer"
                            >
                                <ListIcon as={link.icon} />
                                <Box as="span"> {link.label} </Box>
                            </ListItem>
                        </NavLink>
                    );
                })
            }
        </List>
    )
}


const DrawerNavigation = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <IconButton fontSize={24} color="black" onClick={onOpen} variant="link" icon={<MdOutlineMenu />} aria-label={"er"} />
            <Drawer size="full" useInert={true} placement="right" onClose={onClose} isOpen={isOpen}>
                <DrawerContent opacity={0.98}>
                    <DrawerHeader>
                        <IconButton fontSize={24} color={"black"} onClick={onClose} variant="link" icon={<CLOSE_ICON />} aria-label={"close drawer"} />
                    </DrawerHeader>
                    <DrawerBody display={"flex"} alignItems={"center"} justifyContent={"center"}>
                        <NavigationLink onClick={onClose} />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )

}

const NavigationUserMenu = () => {
    const { user, logout }: any = useAuthContext()

    const UserloggedMenu = () => {
        return (
            <>
                <NavLink to={`/user/profil/${user.id}`}>
                    <MenuItem icon={<AiOutlineUser fontSize={16} />}>Profil</MenuItem>
                </NavLink>
                <NavLink to={`/user/carnet-de-voyage`}>
                    <MenuItem>Mon carnet de voyage</MenuItem>
                </NavLink>
                <MenuItem>menu 2</MenuItem>
                <Divider />
                <MenuItem onClick={logout} >Se deconnecter</MenuItem>
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
        <Menu>
            <MenuButton borderRadius={90} borderWidth={2} p={1}>
                <Stack direction="row" alignItems="center">
                    <Avatar size="xs" />
                    <MdOutlineMenu fontSize={20} />
                </Stack>
            </MenuButton>
            <MenuList>
                {user ? <UserloggedMenu /> : <UserUnloggedMenu />}
            </MenuList>
        </Menu>
    )

}

const Navigation: React.FC<NavigationInterface> = () => {

    const { user, logout } = useAuthContext()

    return (
        <Box bg="white" borderBottomWidth={2} position="sticky" top={0} zIndex={900}>
            <ContainerSection withPadding={true}>
                <Box py={5} >
                    <Stack direction="row" alignItems="center">
                        <Stack flex={1} role="navigation left" direction="row" alignItems="center">
                            <Image mr={3} position="relative" src={logo} width={100} height="auto" />
                            {user && <Hide below="md"> <NavigationLink /></Hide>}
                        </Stack>
                        <Stack direction="row" alignItems="center">
                            <NavigationUserMenu />
                            <Hide above="md">
                                <DrawerNavigation />
                            </Hide>
                        </Stack>
                    </Stack>
                </Box>
            </ContainerSection>
        </Box>
    )

}

export default Navigation