import { Box, Button, Center, Container, Flex, Spacer, Stack, Text } from "@chakra-ui/react"
import { CONTAINER_SIZE, VERTICAL_SPACING } from "../../utils/variables"
import ThumbSwiper from "../../components/swipers/ThumbSwiper"
import { useParams } from "react-router"
import useSWR from "swr"
import { Suspense } from "react"
import LoadingPage from "../../components/LoadingPage"
import UserInfo from "../../components/card/_UserInfo"
import Title from "../../components/texts/Title"
import City from "../../components/card/_City"
import Price from "../../components/card/_Price"
import { MdSend } from "react-icons/md"
import FeedInfo from "../components/FeedInfo"




const Detail = () => {

    const params = useParams()

    const { data, error, mutate, isLoading } = useSWR('/products/' + params.id, { suspense: true })

    return <Box my={VERTICAL_SPACING}>
        <Container maxW={CONTAINER_SIZE}>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={30} >
                <Box h={{ base: 300, sm: 350, md: 400 }} w="100%">
                    <ThumbSwiper images={data.images} />
                </Box>
                <Stack w="100%">
                    <FeedInfo data={data} />
                    <Button w="fit-content" colorScheme="messenger" leftIcon={<MdSend />}>Contactez {data.user.pseudo} </Button>
                </Stack>
            </Stack>
        </Container>
    </Box>
}

const ProductDetail = () => {

    return <Suspense fallback={<LoadingPage type="page" />}>
        <Detail />
    </Suspense>
}

export default ProductDetail