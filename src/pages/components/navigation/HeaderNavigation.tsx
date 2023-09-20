import { Box, Button, Container, Input, InputGroup, InputLeftElement, InputRightElement, Stack } from "@chakra-ui/react"
import { useLocation } from 'react-router'
import AvatarUx from "../../../components/react-ux/AvatarUx"
import { MdComment, MdSearch, MdShoppingBag } from "react-icons/md";
import { ICON_SIZE_HEADER, CONTAINER_SIZE } from "../../../utils/variables";
import { useAuthContext } from "../../../contexts/AuthProvider";
import { useFilterContext } from "../../../contexts/FilterProvider";
import React, { useEffect } from "react";
import logo from '../../../images/svgs/coreego-logo.svg'

interface HeaderNavigationInterface {
    children: React.ReactNode,
}

const links = [
    {
        path: '/discussion/feed',
        label: "Discussions",
        icon: <MdComment size={ICON_SIZE_HEADER} />
    },
    {
        path: '/shopping/feed',
        label: "Shooping",
        icon: <MdShoppingBag size={ICON_SIZE_HEADER} />
    },
]



const HeaderNavigation: React.FC<HeaderNavigationInterface> = () => {

    return (

        <Box position="sticky" zIndex={1000} bg="white" top={0} boxShadow="0 0 5px gray" py="3">
            <Container maxW={CONTAINER_SIZE} centerContent={true}>
                <Stack direction="row" alignItems="center" justify="space-between" width="100%">
                    <img width={150} height="auto" src={logo} />
                    <AvatarUx />
                </Stack>
            </Container>
        </Box>

    )
}

export default HeaderNavigation