import { Box, Container, Divider, Stack } from "@chakra-ui/react";
import HeaderNavigation from "./HeaderNavigation";
import AsideNavigation from "./AsideNavigation";
import { CONTAINER_SIZE } from "../../../utils/variables";


interface NavigationInterface {
    children: React.ReactNode
}

const Navigation: React.FC<NavigationInterface> = ({ children }) => {

    return (
        <Box>
        <Stack direction="column" spacing={0}>
            <HeaderNavigation>
                {children}
            </HeaderNavigation>
            <Container maxW={CONTAINER_SIZE}>
                <Stack direction="row" alignItems="flex-start">
                    <AsideNavigation />
                    <Container maxW={CONTAINER_SIZE}>
                        {children}
                    </Container>
                </Stack>
            </Container>
        </Stack>
        </Box>

    )

}

export default Navigation