import { Badge } from "@chakra-ui/react"
import { dateParse } from "../../utils"



const DateBadge : React.FC<{date: any}> = ({date}) => {

    return <Badge width="fit-content" p={1} fontWeight="bold" colorScheme="blue"> {dateParse(date)} </Badge>

}

export default DateBadge