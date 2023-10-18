import { Box, Button, Center, Container, Flex, Grid, GridItem, Spacer, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
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
import PublishDateText from "../../components/texts/PublichDateText"
import { BsSend } from "react-icons/bs";
import { wonToEuro } from "../../utils"




const Detail = () => {

    const params = useParams()

    const { data, error, mutate, isLoading } = useSWR('/products/' + params.id, { suspense: true })

    return (
        <Stack my={VERTICAL_SPACING}>
            <Container maxW={CONTAINER_SIZE}>
                <Grid templateColumns='repeat(10, 1fr)' gap={{ base: 3, md: 20 }}>
                    <GridItem colSpan={{ base: 10, sm: 10, md: 5 }}>
                        <Stack>
                            <Box h={{ base: 200, sm: 350, md: 450 }} maxW="100%" bg="var(--light)">
                                <ThumbSwiper images={data.images} />
                            </Box>
                        </Stack>
                    </GridItem>
                    <GridItem colSpan={{ base: 10, md: 5 }}>
                        <Stack>
                            <Stack justifyContent="space-between" direction="row" alignItems="center">
                                <UserInfo user={data.user} size={{ base: 'sm', md: 'md' }} />
                                <PublishDateText size={{ base: 'sm', md: 'md' }} date={data.createdAt} />
                            </Stack>
                            <Title> {data.title} </Title>
                            <Text whiteSpace="pre-line">{data.description}</Text>
                            <City size={{ base: 'xl', md: '2xl' }} city={data.city} />
                            <Stack direction="row" alignItems="center" flexWrap="wrap">
                                <Price price={data.price} size={{ base: 'xl', md: '2xl' }} />
                                <Text>  ~ {wonToEuro(data.price)} €  </Text>
                            </Stack>
                            <Button className="btn_blue" leftIcon={<BsSend />}>
                                Contacter le vendeur
                            </Button>
                        </Stack>
                    </GridItem>
                </Grid>

            </Container>
        </Stack>
    )
}

const ProductDetail = () => {

    return <Suspense fallback={<LoadingPage type="page" />}>
        <Detail />
    </Suspense>
}

export default ProductDetail