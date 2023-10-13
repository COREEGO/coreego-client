import { Text } from "@chakra-ui/react"
import { dateParse } from "../../utils"



const PublishDateBadge : React.FC<{date: any}> = ({date}) => {

    return <Text>{dateParse(date)}</Text>

}

export default PublishDateBadge