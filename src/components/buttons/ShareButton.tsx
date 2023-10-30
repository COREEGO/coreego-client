
import { IconButton, VStack, Text } from "@chakra-ui/react";
import { BsShare } from "react-icons/bs";



const ShareButton:  React.FC<{showLabel?: boolean}> = ({showLabel = false}) => {

    return (
        <VStack>
            <IconButton color="var(--coreego-blue)" borderColor="var(--coreego-blue)" colorScheme="twitter" isRound variant="outline" icon={<BsShare />} aria-label={"save place button"} />
            {showLabel && <Text as="small">Partager</Text>}
        </VStack>
    )
}

export default ShareButton