import { Box, Container, Divider, Stack, Image, ListItem, ListIcon, List, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerBody, Button, DrawerHeader, IconButton, DrawerCloseButton, Avatar, Menu, MenuButton, MenuList, MenuItem, Hide } from "@chakra-ui/react";
import { CONTAINER_SIZE } from "../../utils/variables";
import { MdOutlineComment, MdOutlineShoppingBag, MdOutlineTravelExplore, MdLogin, MdOutlineMenu, MdClose } from "react-icons/md";
import logo from '../../images/svgs/coreego-logo.svg'
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthProvider";
import AvatarUx from "../react-ux/AvatarUx";

const links = [
    {
        path: '/discussions',
        label: "Discussions",
        icon: MdOutlineComment
    },
    {
        path: '/market-place',
        label: "Market place",
        icon: MdOutlineShoppingBag
    },
    {
        path: '/voyage',
        label: 'Voyage',
        icon: MdOutlineTravelExplore
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
                                fontSize={14}
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

    const { user } = useAuthContext()

    return (
        <>
            <IconButton fontSize={24} color="black" onClick={onOpen} variant="link" icon={<MdOutlineMenu />} aria-label={"er"} />
            <Drawer size="full" useInert={true} placement="right" onClose={onClose} isOpen={isOpen}>
                <DrawerContent opacity={0.98}>
                    <DrawerHeader>
                        <IconButton fontSize={24} color={"black"} onClick={onClose} variant="link" icon={<MdClose />} aria-label={"close drawer"} />
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
    const { user, logout } = useAuthContext()

    return (
        <Menu>
            <MenuButton borderRadius={90} borderWidth={2} p={1}>
                <Stack direction="row" alignItems="center">
                    <Avatar size="xs" />
                    <MdOutlineMenu fontSize={20} />
                </Stack>
            </MenuButton>
            <MenuList>
                {user ?
                    <>
                        <MenuItem>menu 1</MenuItem>
                        <MenuItem>menu 2</MenuItem>
                        <Divider />
                        <MenuItem onClick={logout} >Se deconnecter</MenuItem>
                    </> :
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
                }
            </MenuList>
        </Menu>
    )

}

const Navigation: React.FC<NavigationInterface> = () => {

    const { user, logout } = useAuthContext()

    return (
        <Box bg="white" borderBottomWidth={2} position="sticky" top={0} zIndex={900}>
            <Container maxW={CONTAINER_SIZE}>
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
            </Container>
        </Box>
    )

}

export default Navigation