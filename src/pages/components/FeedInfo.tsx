import { Stack, Text } from "@chakra-ui/react"
import Category from "../../components/card/_Category"
import UserInfo from "../../components/card/_UserInfo"
import Title from "../../components/texts/Title"
import Price from "../../components/card/_Price"
import City from "../../components/card/_City"


interface FeedInfoInterface {
    data: any,
}

const FeedInfo: React.FC<FeedInfoInterface> = ({ data }) => {


    return (
        <Stack>
            <UserInfo user={data.user} date={data.createdAt} />
            {data?.category && <Category category={data?.category} />}
            {data?.city && <City fontSize="xl" city={data?.city} />}
            <Title color="var(--coreego-blue)"> {data.title} </Title>
            <Text as="p" whiteSpace="pre-line">{data?.content || data?.description}</Text>
            {data?.price && <Price price={data?.price} fontSize="xl" />}
        </Stack>
    )

}


export default FeedInfo