import { Box, Button, Center, Divider, Grid, GridItem, IconButton, Modal, ModalContent, Stack, Text } from "@chakra-ui/react"
import { VERTICAL_SPACING } from "../../utils/variables"
import { useParams } from "react-router"
import useSWR from "swr"
import { Suspense, useEffect } from "react"
import LoadingPage from "../../components/LoadingPage"
import { BsMessenger, BsXLg } from "react-icons/bs";
import ThumbSwiper from "../../components/swipers/ThumbSwiper"
import { NavLink } from "react-router-dom"
import TitleText from "../../components/texts/TitleText"
import KakaoMap from "../../components/maps/KakaoMap"
import UserSniped from "../../components/react-ux/UserSniped"
import LocalisationText from "../../components/texts/LocalisationText"
import PriceText from "../../components/texts/PriceText"
import ContainerSection from "../components/ContainerSection"
import SlideSwiper from "../../components/swipers/SlideSwiper"
import { belongsToAuth } from "../../utils"
import { EDIT_ICON } from "../../utils/icon"
import { useAuthContext } from "../../contexts/AuthProvider"

const Detail = () => {

    const params = useParams()
    const { user }: any = useAuthContext()
    const { data, error, mutate } = useSWR('/product/' + params.id, { suspense: true })

    useEffect(()=>{
        if(data){
            mutate()
        }
    }, [])

    if (error) console.error(error)

    return (
        <Box my={VERTICAL_SPACING}>
            <ContainerSection withPadding={true}>
                <Box w={{ base: 500, lg: '100%' }} m="auto" maxW={"100%"}>
                    <Grid
                        gap={10}
                        templateColumns={{
                            base: "repeat(1, 1fr)",
                            lg: "repeat(10, 1fr)",
                        }}
                    >
                        <GridItem colSpan={{
                            base: 1,
                            lg: 6,
                        }}>
                            <Box w="100%" h={{ base: 300, lg: 500 }}>
                                <ThumbSwiper images={data.images} />
                            </Box>
                        </GridItem>
                        <GridItem colSpan={{
                            base: 1,
                            lg: 4,
                        }}>
                            <Stack>
                                {
                                    belongsToAuth(data.user.id, user?.id) ?
                                        <NavLink to={`/market-place/product/edit/${params.id}`}>
                                            <Button variant="outline" leftIcon={<EDIT_ICON />}>Modifier</Button>
                                        </NavLink>
                                        :
                                        <></>
                                }
                                <TitleText text={data.title} />
                                <Text whiteSpace="pre-line"> {data.description} </Text>
                                <Divider />
                                <PriceText price={data.price} />
                                <Stack>
                                    <Divider />
                                    <UserSniped
                                        avatar={data.user.avatar}
                                        pseudo={data.user.pseudo}
                                        publishDate={data.createdAt}
                                    />
                                    <Divider />
                                </Stack>
                                <Stack>
                                    <Text as="b">Localisation :</Text>
                                    <LocalisationText city={data.city} district={data.district} />
                                    <Box h={200} w={"100%"} maxW={"100%"}>
                                        <KakaoMap
                                            lat={data.district.latitude}
                                            lng={data.district.longitude}
                                            withCircle={true}
                                        />
                                    </Box>
                                </Stack>
                                {
                                    !belongsToAuth(data.user.id, user?.id) ? <Box py={3} position={"sticky"} bottom={0} bg="white" zIndex={10} >
                                        <Button w="100%" colorScheme="messenger" leftIcon={<BsMessenger />}>Contacter le vendeur</Button>
                                    </Box> : <></>
                                }

                            </Stack>
                        </GridItem>
                    </Grid>

                </Box>
            </ContainerSection>
        </Box>

        // <Modal size="full" motionPreset="none" onClose={() => console.log('closed')} isOpen={true}>
        //     <ModalContent>
        //         <NavLink to="/market-place">
        //             <IconButton
        //                 isRound={true}
        //                 width={"fit-content"}
        //                 position={"fixed"}
        //                 left={2} top={2}
        //                 colorScheme="red"
        //                 aria-label={"close"}
        //                 icon={<BsXLg />}
        //                 zIndex={10}
        //                 opacity={0.8}
        //             />
        //         </NavLink>
        //         <Stack
        //             spacing={0}
        //             direction={{ base: 'column', md: 'row' }}>
        //             <Center h={{ base: 300, md: "100vh" }} width={"100%"} flex={1} bg="gray.100">
        //                 <Box w="100%" h={"100%"}>
        //                     <ThumbSwiper images={data.images} />
        //                 </Box>
        //             </Center>
        //             <Box bg="white" boxShadow={"0 0 5px grey"} w={{ base: '100%', md: 400 }} >
        //                 <Stack p={3} spacing={VERTICAL_SPACING}>
        //                     <Stack>
        //                         <TitleText text={data.title} />
        //                         <Box maxH={200} overflowY="auto">
        //                             <Text whiteSpace="pre-line"> {data.description} </Text>
        //                         </Box>
        //                         <PriceText price={data.price} />
        //                     </Stack>

        //                     <Stack>
        //                         <Text as="b">Localisation :</Text>
        //                         <LocalisationText city={data.city} district={data.district} />
        //                         <Box h={200} w={"100%"} maxW={"100%"}>
        //                             <KakaoMap
        //                                 lat={data.district.latitude}
        //                                 lng={data.district.longitude}
        //                                 withCircle={true}
        //                             />
        //                         </Box>
        //                     </Stack>
        //                     <Button colorScheme="messenger" leftIcon={<BsMessenger />}>Contacter le vendeur</Button>
        //                 </Stack>
        //             </Box>
        //         </Stack>
        //     </ModalContent>
        // </Modal>
    )
}

const ProductDetail = () => {

    return (
        <Suspense fallback={<LoadingPage type="page" />}>
            <Detail />
        </Suspense>
    )
}

export default ProductDetail