


import { Button } from "@chakra-ui/react"
import { MdTurnedInNot } from "react-icons/md"

interface AddTravelBookButtonInterface {
    placeId?: any,
    size?: any,
    mutate?: Function
}

const AddTravelBookButton : React.FC<AddTravelBookButtonInterface> = ({placeId, size, mutate }) => {


    return (
        <Button size={size} colorScheme="green" leftIcon={<MdTurnedInNot />}>
            Je souhaite visiter
        </Button>
    )
}

export default AddTravelBookButton