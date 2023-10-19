import { Box, Container, Stack } from "@chakra-ui/react"
import { CONTAINER_SIZE } from "../../utils/variables"

interface ImageHeaderInterface {
    imgUrl: string
}

const ImageHeader: React.FC<ImageHeaderInterface> = ({ imgUrl }) => {

    return (
        <Box
            as="header"
            height={{ base: 150, md: 300 }}
            backgroundImage={imgUrl}
            backgroundPosition="bottom"
            position="relative"
            backgroundSize="cover">
        </Box>
    )

}

export default ImageHeader