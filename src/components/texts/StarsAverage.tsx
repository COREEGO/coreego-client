import { HStack, Text } from "@chakra-ui/react"
import { BsFillStarFill } from "react-icons/bs"


interface StarsAverageInterface {
    datas: Array<any>
}

const StarsAverage: React.FC<StarsAverageInterface> = ({ datas }) => {

    const sum = datas.reduce((prev:number, curr: any) => prev + curr.stars, 0)

    const average = sum / datas.length || 0


    return (
        <HStack spacing={1}>
            <BsFillStarFill color="orange" />
            {
                average > 0 &&  <Text> {average} </Text>
            }
            <Text color="grey">({datas.length} review) </Text>
        </HStack>
    )

}

export default StarsAverage