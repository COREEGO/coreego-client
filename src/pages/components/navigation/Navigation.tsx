import { Box, Container, Stack } from "@chakra-ui/react";
import HeaderNavigation from "./HeaderNavigation";
import AsideNavigation from "./AsideNavigation";
import { CONTAINER_SIZE } from "../../../utils/variables";


interface NavigationInterface {
    children: React.ReactNode
}

const Navigation: React.FC<NavigationInterface> = ({ children }) => {

    return (
        <Box>
            <Stack direction="row" alignItems="flex-start" spacing={0}>
                <AsideNavigation />
                <HeaderNavigation>
                    <Container maxW={CONTAINER_SIZE} centerContent={true}>
                        {children}
                    </Container>
                </HeaderNavigation>
            </Stack>
        </Box>
    )

}

export default Navigation