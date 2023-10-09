import { Box, Container, Divider, Stack, Image, ListItem, ListIcon, List, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerBody, Button, DrawerHeader, IconButton, DrawerCloseButton, Avatar, Menu, MenuButton, MenuList, MenuItem, Hide } from "@chakra-ui/react";
import { CONTAINER_SIZE } from "../../utils/variables";
import { MdOutlineComment, MdOutlineShoppingBag, MdOutlineTravelExplore, MdLogin, MdOutlineMenu, MdClose } from "react-icons/md";
import logo from '../../images/svgs/coreego-logo.svg'
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthProvider";
import AvatarUx from "../react-ux/AvatarUx";

const links = [
    {
        path: '/discussions',
        label: "Discussions",
        icon: MdOutlineComment
    },
    {
        path: '/shopping',
        label: "Shooping",
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


const DrawerNavigation = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { user } = useAuthContext()

    return (
        <>
            <IconButton fontSize={24} color="black" onClick={onOpen} variant="link" icon={<MdOutlineMenu />} aria-label={"er"} />
            <Drawer size="full" useInert={true} placement="right" onClose={onClose} isOpen={isOpen}>
                <DrawerContent opacity={0.98}>
                    <DrawerHeader fontSize={16}>
                        <Stack direction="row" alignItems="center" justifyContent="end">
                            {
                                !user && <>
                                    <List onClick={onClose} className="navbar" display="flex" alignItems="center">
                                        <NavLink to="/login">
                                            <ListItem
                                                fontWeight={600}
                                                alignItems="center"
                                                display="flex"
                                                width="100%"
                                                cursor="pointer"
                                            >
                                                <ListIcon as={MdLogin} />
                                                <Box as="span">Se connecter</Box>
                                            </ListItem>
                                        </NavLink>
                                        <Box as="span" height="3px" mx={2} width="3px" borderRadius={90} bg="black"></Box>
                                        <NavLink to="/register" style={{ fontWeight: 'bold' }} >
                                            <Box as="span">S'inscrire</Box>
                                        </NavLink>
                                    </List>
                                </>
                            }
                            <IconButton fontSize={24} color={"black"} onClick={onClose} variant="link" icon={<MdClose />} aria-label={"close drawer"} />
                        </Stack>
                    </DrawerHeader>
                    <DrawerBody display={"flex"} alignItems={"center"} justifyContent={"center"}>
                        <List className="navbar" alignItems="center">
                            {
                                links.map((link: any, index: number) => {
                                    return (
                                        <NavLink to={link.path}
                                            key={index}
                                            onClick={onClose}
                                            style={{ marginBottom: 20, display: 'block' }}
                                        >
                                            <ListItem key={index}
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
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )

}


const Navigation: React.FC<NavigationInterface> = () => {

    const { user, logout } = useAuthContext()

    const handleLogOut = () => {
        logout()
    }

    return (
        <Box bg="white" position="sticky" className="navbar" top={0} zIndex={900}>
            <Container maxW={CONTAINER_SIZE}>
                <Box py={5} >
                    <Stack direction="row" alignItems="center">
                        <Stack flex={1} role="navigation left" direction="row" alignItems="center">
                            <Image mr={3} position="relative" src={logo} width={100} height="auto" />
                            {
                                user && <Hide below="md">
                                    <List alignItems="center" display="flex" >
                                        {
                                            links.map((link: any, index: number) => {
                                                return (
                                                    <NavLink to={link.path}
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
                                </Hide>
                            }

                        </Stack>
                        <Stack direction="row" alignItems="center">
                            {/* Si l'utilisateur n'est pas connecter */}
                            {

                                !user ? <Hide below="md">
                                    <List alignItems="center" display="flex">
                                        <NavLink to="/login">
                                            <ListItem
                                                fontWeight={600}
                                                alignItems="center"
                                                display="flex"
                                                width="100%"
                                                cursor="pointer"
                                            >
                                                <ListIcon as={MdLogin} />
                                                <Box as="span">Se connecter</Box>
                                            </ListItem>
                                        </NavLink>
                                        <Box as="span" height="3px" mx={2} width="3px" borderRadius={90} bg="black"></Box>
                                        <NavLink to="/register" style={{ fontWeight: 'bold' }} >
                                            <Box as="span">S'inscrire</Box>
                                        </NavLink>
                                    </List>
                                </Hide> : <Menu>
                                    <MenuButton>
                                        <AvatarUx size="xs" user={user} />
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem>Download</MenuItem>
                                        <MenuItem>Create a Copy</MenuItem>
                                        <MenuItem onClick={handleLogOut} >Se deconnecter</MenuItem>
                                    </MenuList>
                                </Menu>

                            }
                            <Hide above="md">
                                <DrawerNavigation />
                            </Hide>
                        </Stack>
                    </Stack>
                </Box>
            </Container>
            <Divider borderColor="var(--coreego-blue)" borderBottomWidth={1} />
        </Box>
    )

}

export default Navigation