import { Box, Container, Stack } from "@chakra-ui/react"
import { NavLink } from 'react-router-dom'
import logo from '../../../images/svgs/coreego-logo.svg'
import AvatarUx from "../../../components/react-ux/AvatarUx"
import { MdComment, MdShoppingBag } from "react-icons/md";
import { ICON_SIZE_HEADER, CONTAINER_SIZE } from "../../../utils/variables";
import { useAuthContext } from "../../../contexts/AuthProvider";

interface HeaderNavigationInterface {
    children: React.ReactNode
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



const HeaderNavigation: React.FC<HeaderNavigationInterface> = ({ children }) => {

    const { user } = useAuthContext()

    return (
        <Stack direction="column" width="100%">
            <Box position="sticky" zIndex={1000} bg="white" top={0} boxShadow="0 0 5px gray" py="5">
                <Container maxW={CONTAINER_SIZE} centerContent={true}>
                    <Stack direction="row" alignItems="center" justify="space-between" width="100%">

                        <AvatarUx />
                    </Stack>
                </Container>
            </Box>
            {children}
        </Stack>
    )
}





export default HeaderNavigation