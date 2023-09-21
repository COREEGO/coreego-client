import { Box, Divider, List, ListIcon, ListItem } from "@chakra-ui/react";
import { ICON_SIZE_HEADER } from "../../utils/variables";
import { MdOutlineComment, MdOutlineShoppingBag, MdOutlineTravelExplore } from "react-icons/md";
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
    {
        path: '/voyage/feed',
        label: 'Voyage',
        icon: MdOutlineTravelExplore
    }
]

export default function AsideNavigation() {

    return (
        <Box position="sticky" top="69"  bottom={0} left={0} h="fit-content" width="fit-content">
            <List>
                {
                    links.map((link: any, index: number) => {
                        return (
                            <NavLink to={link.path}
                                key={index}
                                style={{position: 'relative' }}
                                className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "navigation_link active" : "navigation_link"}
                            >
                                <ListItem px={5} py={3} key={index} color="var(--coreego-blue)"
                                    alignItems="center"
                                    display="flex"
                                    width="100%"
                                    cursor="pointer"
                                  >
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