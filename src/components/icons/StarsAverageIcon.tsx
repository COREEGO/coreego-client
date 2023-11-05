import { HStack, Text } from "@chakra-ui/react"
import { BsFillStarFill } from "react-icons/bs"

interface PropsInterface {
    datas: Array<any>
}

const StarsAverageIcon: React.FC<PropsInterface> = ({ datas }) => {

    const sum = datas.reduce((prev: number, curr: any) => prev + curr.stars, 0)

    const average: any = sum / datas.length || 0

    const reviewLabel = `(${datas.length} review${datas.length > 1 ? 's' : ''})`


    return (
        <HStack>
            <BsFillStarFill color="orange" />
            {average && <Text>{average + '/5'}  </Text>}
            <Text fontSize="sm"> {reviewLabel} </Text>
        </HStack>
    )
}

export default StarsAverageIcon