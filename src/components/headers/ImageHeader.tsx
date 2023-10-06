import { Box, Container, Stack } from "@chakra-ui/react"
import { CONTAINER_SIZE } from "../../utils/variables"

interface ImageHeaderInterface {
    children: React.ReactNode,
    imgPath: string
}

const ImageHeader: React.FC<ImageHeaderInterface> = ({ children, imgPath }) => {

    return (
        <Stack
        as="header"
        backgroundImage={imgPath}
        backgroundPosition="center"
        position="relative"
        backgroundSize="cover"
        backgroundClip="border-box"
        py={5} h="auto" alignContent="center">
            <Box zIndex={1} opacity={0.7} as="span" bg="var(--coreego-blue)" position="absolute" left={0} top={0} h="100%" w="100%"></Box>
            <Container maxW={CONTAINER_SIZE} zIndex={100}>
                {children}
            </Container>
        </Stack>
    )

}

export default ImageHeader