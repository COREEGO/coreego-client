import { Box, Center, Container, Stack } from "@chakra-ui/react"
import { CONTAINER_SIZE } from "../../utils/variables"




const CenterLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    return (
        <Container maxW={CONTAINER_SIZE}>
            <Box m="40px auto" maxW="100%" w={500}>
                <Center>
                    <Stack width={"100%"} spacing={10}>
                        {children}
                    </Stack>
                </Center>
            </Box>
        </Container>
    )
}

export default CenterLayout