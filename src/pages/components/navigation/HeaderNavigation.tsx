import { Box, Container, Stack } from "@chakra-ui/react"
import { NavLink } from 'react-router-dom'
import logo from '../../../images/svgs/coreego-logo.svg'
import AvatarUx from "../../../components/react-ux/AvatarUx"
import { MdComment, MdShoppingBag } from "react-icons/md";
import { ICON_SIZE_HEADER, CONTAINER_SIZE } from "../../../utils/variables";
import { useAuthContext } from "../../../contexts/AuthProvider";

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



const HeaderNavigation = () => {

    const { user } = useAuthContext()

    return (
        <Box position="sticky" zIndex={1000} bg="white" top={0} boxShadow="0 0 5px gray" py="5">
            <Container maxW={CONTAINER_SIZE} centerContent={true}>
                <Stack direction="row" alignItems="center" justify="space-between" width="100%">
                    <img width={130} height="auto" src={logo} />
                    {
                      user && <>
                            <Stack direction="row" alignItems="center" spacing={3}>
                                {
                                    links.map((link: any) => {
                                        return (
                                            <NavLink style={{ display: 'flex', alignItems: 'center' }}
                                                key={link.label}
                                                to={link.path}
                                                className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "navigation_link active" : "navigation_link"}>
                                                <Box mr={1}>{link.icon}</Box>
                                                <Box>{link.label} </Box>
                                            </NavLink>
                                        )
                                    })
                                }
                            </Stack>
                            <AvatarUx />
                        </>
                    }
                </Stack>
            </Container>
        </Box>
    )
}





export default HeaderNavigation