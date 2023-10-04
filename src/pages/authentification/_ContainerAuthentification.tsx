import { Box, Center, Container, ScaleFade, Stack } from "@chakra-ui/react"
import { CONTAINER_SIZE } from "../../utils/variables"
import WaveBackground from "../../components/custom-background/WaveBackground"
import HeaderSection from "../../components/sections/HeaderSection"


const ContainerAuthentification: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    return (
        <>
            <Container maxW={CONTAINER_SIZE}>
                <Box m="50px auto" maxW="100%" w={400}  >
                    <Stack spacing={5}>
                        {children}
                    </Stack>
                </Box>
            </Container>
        </>
    )

}

export default ContainerAuthentification