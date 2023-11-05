import { HStack, Text } from "@chakra-ui/react"
import { BsFillStarFill } from "react-icons/bs"


interface StarsAverageInterface {
    datas: Array<any>
}

const StarsAverage: React.FC<StarsAverageInterface> = ({ datas }) => {

    const sum = datas.reduce((prev:number, curr: any) => prev + curr.stars, 0)

    const average = sum / datas.length || 0

    const reviewLabel = `(${datas.length} review ${datas.length > 1 ? 's' : ''})`

    return (
        <HStack spacing={1}>
            <BsFillStarFill color="orange" />
            { average > 0 &&  <Text> {average} </Text> }
            <Text color="grey" fontSize="sm"> {reviewLabel} </Text>
        </HStack>
    )

}

export default StarsAverage