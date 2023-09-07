import { Stack, Text } from "@chakra-ui/react"

interface PriceInterface {
    price: number
}

const Price: React.FC<PriceInterface> = ({ price }) => {

    return (
        <Stack direction="row" alignItems="center" fontWeight="bold">
           <Text>₩</Text>
           <Text>{price}</Text>
        </Stack>
    )

}

export default Price