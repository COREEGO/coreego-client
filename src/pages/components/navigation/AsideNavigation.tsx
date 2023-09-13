import { Box, List, ListIcon, ListItem } from "@chakra-ui/react";
import { ICON_SIZE_HEADER } from "../../../utils/variables";
import { MdOutlineComment, MdOutlineShoppingBag } from "react-icons/md";
import logowhite from '../../../images/svgs/coreego-logo-white.svg'
import { NavLink } from "react-router-dom";

const links = [
    {
        path: '/discussion/feed',
        label: "Discussions",
        icon: MdOutlineComment
    },
    {
        path: '/shopping/feed',
        label: "Shooping",
        icon: MdOutlineShoppingBag
    },
]

export default function AsideNavigation() {

    return (
        <Box position="sticky" top={0} bg="var(--coreego-blue)" height="100vh" >
            <List>
                <ListItem bg="var(--coreego-blue-dark)" mb={5} px={5} py={2} borderBottom="2px solid white" >
                    <img width={180} height="auto" src={logowhite} />
                </ListItem>
                {
                    links.map((link: any, index: number) => {
                        return (
                            <NavLink to={link.path}
                                key={index}
                                className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "navigation_link active" : "navigation_link"}
                            >
                                <ListItem px={5} py={5} key={index} color="white"
                                    alignItems="center"
                                    display="flex"
                                    width="100%"
                                    cursor="pointer"
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'var(--coreego-blue-light)',
                                        }
                                    }}>
                                    <ListIcon fontSize={ICON_SIZE_HEADER} as={link.icon} />
                                    <Box as="span"> {link.label} </Box>
                                </ListItem>
                            </NavLink>
                        );
                    })
                }
            </List>
        </Box>
    )
}