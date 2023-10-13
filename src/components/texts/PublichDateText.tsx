import { Text } from "@chakra-ui/react"
import { dateParse } from "../../utils"



const PublishDateText : React.FC<{date: any, size?: any}> = ({date, size}) => {

    return <Text textTransform="uppercase" fontSize={size} color="gray">{dateParse(date)}</Text>

}

export default PublishDateText