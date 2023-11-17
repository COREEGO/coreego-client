import { Box, IconButton, Image } from "@chakra-ui/react"
import { TRASH_ICON } from "../../utils/icon"


interface PropsInterface {
    imageUrl: string,
    onRemove: () => void
}

const FormImage: React.FC<PropsInterface> = ({ imageUrl, onRemove }) => {
    return (
        <Box position="relative" w={100} h={100}>
            <Image
                src={imageUrl}
                objectFit={"cover"}
                borderRadius={"md"}
                w={"100%"}
                h={"100%"}
            />
            <IconButton
                onClick={onRemove}
                size="sm"
                colorScheme="red"
                isRound
                position={"absolute"}
                bottom={1} right={1}
                aria-label="remove image" icon={<TRASH_ICON />} />
        </Box>
    )
}

export default FormImage