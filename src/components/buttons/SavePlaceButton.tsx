
import { IconButton, VStack, Text } from "@chakra-ui/react";
import { BsBookmark } from "react-icons/bs";



const SavePlaceButton: React.FC<{showLabel: boolean}> = ({showLabel = false}) => {

    return (
        <VStack>
            <IconButton colorScheme="twitter" isRound variant="outline" icon={<BsBookmark />} aria-label={"save place button"} />
            {showLabel && <Text as="small"> Enregistrer </Text>}
        </VStack>
    )
}

export default SavePlaceButton