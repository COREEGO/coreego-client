import { Box, Button, Card, CardBody, Center, Container, Divider, Flex, Grid, GridItem, Spacer, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { VERTICAL_SPACING } from "../../utils/variables"
import { useParams } from "react-router"
import useSWR from "swr"
import { Suspense } from "react"
import LoadingPage from "../../components/LoadingPage"
import { BsSend } from "react-icons/bs";
import ProductCard from "../../components/card/ProductCard"
import ContainerSection from "../components/ContainerSection"
import SlideSwiper from "../../components/swipers/SlideSwiper"




const Detail = () => {

    const params = useParams()

    const { data, error, mutate, isLoading } = useSWR('/products/' + params.id, { suspense: true })

    return (
        <Box my={VERTICAL_SPACING}>
            <ContainerSection>
                <Stack spacing={VERTICAL_SPACING}>
                    {
                        data.images.length && <Card borderRadius={0}>
                            <SlideSwiper images={data.images} />
                        </Card>
                    }
                    <ProductCard mode="detail" product={data}>
                        <Divider />
                        <Button width="fit-content" leftIcon={<BsSend />} colorScheme="blue">Contacter le vendeur</Button>
                    </ProductCard>
                </Stack>
            </ContainerSection>
        </Box>
    )
}

const ProductDetail = () => {

    return <Suspense fallback={<LoadingPage type="page" />}>
        <Detail />
    </Suspense>
}

export default ProductDetail