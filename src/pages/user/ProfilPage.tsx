import { Suspense } from "react"
import { useParams } from "react-router"
import useSWR from "swr"
import LoadingPage from "../../components/LoadingPage"
import { Box, Button, Card, CardBody, Divider, Grid, GridItem, HStack, Stack, Text, VStack, Wrap } from "@chakra-ui/react"
import { VERTICAL_SPACING } from "../../utils/variables"
import ContainerSection from "../components/ContainerSection"
import UserSniped from "../../components/react-ux/UserSniped"
import { useAuthContext } from "../../contexts/AuthProvider"
import ModalWrapper from "../../components/Modals/ModalWraper"
import { templateColumns } from "../../utils"
import DiscussionCard from "../../components/card/DiscussionCard"
import PlaceCard from "../../components/card/PlaceCard"
import { NavLink } from "react-router-dom"
import { FORUM_ICON, DISLIKE_ICON, TRAVEL_ICON, MARKET_PLACE_ICON } from "../../utils/icon"
import ProductCard from "../../components/card/ProductCard"

const ButtonOpenModal: React.FC<{ onClick: () => void, label: string, icon: any }> = ({ onClick, label, icon }) => {
    return (
        <Card w="100%" as="button" onClick={onClick}>
            <CardBody display={"flex"} justifyContent={"center"} w="100%">
                <Text fontSize="lg" as="span">
                    <HStack>
                        {icon}
                        <Text>{label}</Text>
                    </HStack>
                </Text>
            </CardBody>
        </Card>
    )
}

const PublicationLiked = () => {

    const { data: likes, error } = useSWR(`/likes/user?current_logged=true`, { suspense: true })

    if (error) console.error(error)

    const places = likes.reduce((prev: any, curr: any) => {
        if ('place' in curr) prev.push(curr.place)
        return prev
    }, [])

    const discussions = likes.reduce((prev: any, curr: any) => {
        if ('discussion' in curr) prev.push(curr.discussion)
        return prev
    }, [])

    return <ModalWrapper
        id="like"
        title={<>{<DISLIKE_ICON />} J'aimes</>}
        renderButton={(onOpen) => <ButtonOpenModal onClick={onOpen} label={"J'aimes"} icon={<DISLIKE_ICON />} />}
        params={{ size: 'full' }}
    >
        <Stack spacing={VERTICAL_SPACING}>
            {
                places.length && <Stack>
                    <Text fontWeight={500} fontSize={"xl"}>Lieux</Text>
                    <Grid gap={5} templateColumns={templateColumns({ base: 1, sm: 1, md: 3, lg: 4 })}>
                        {
                            places.map((place: any) => {
                                return <GridItem key={'p-' + place.id}>
                                    <NavLink to={'/voyage/place/detail/' + place.id}>
                                        <PlaceCard size="sm" place={place} />
                                    </NavLink>
                                </GridItem>
                            })
                        }
                    </Grid>
                </Stack>
            }
            {
                discussions.length && <Stack>
                    <Text fontWeight={500} fontSize={"xl"}>Discussions</Text>
                    <Grid gap={5} templateColumns={templateColumns({ base: 1, sm: 1, md: 3, lg: 4 })}>
                        {
                            discussions.map((discussion: any) => {
                                return <GridItem key={'d-' + discussion.id}>
                                    <NavLink to={'/forum/discussion/detail/' + discussion.id}>
                                        <DiscussionCard size="sm" discussion={discussion} />
                                    </NavLink>
                                </GridItem>
                            })
                        }
                    </Grid>
                </Stack>
            }
        </Stack>
    </ModalWrapper>
}

const PlacePublication = () => {

    const params = useParams()

    const { data: places, error } = useSWR(`/places/user?user=${params.id}`, { suspense: true })
    if (error) console.error(error)

    return (
        <ModalWrapper
            id="places"
            title={<>{<TRAVEL_ICON />} Lieux</>}
            renderButton={(onOpen) => <ButtonOpenModal onClick={onOpen} label={"Lieux"} icon={<TRAVEL_ICON />} />}
            params={{ size: 'full' }}
        >
            <Grid gap={5} templateColumns={templateColumns({ base: 1, sm: 1, md: 3, lg: 4 })}>
                {
                    places.map((place: any) => {
                        return <GridItem key={place.id}>
                            <NavLink to={'/voyage/place/detail/' + place.id}>
                                <PlaceCard size="sm" place={place} />
                            </NavLink>
                        </GridItem>
                    })
                }
            </Grid>
        </ModalWrapper>
    )
}

const DiscusionPublication = () => {
    const params = useParams()

    const { data: discussions, error } = useSWR(`/discussions/user?user=${params.id}`, { suspense: true })

    if (error) console.error(error)

    return (
        <ModalWrapper
            id="discussions"
            title={<><FORUM_ICON />Discussions</>}
            renderButton={(onOpen) => <ButtonOpenModal onClick={onOpen} label={"Discussions"} icon={<FORUM_ICON />} />}
            params={{ size: 'full' }}
        >
            <Grid gap={5} templateColumns={templateColumns({ base: 1, sm: 1, md: 3, lg: 4 })}>
                {
                    discussions.map((discussion: any) => {
                        return <GridItem key={discussion.id}>
                            <NavLink to={'/forum/discussion/detail/' + discussion.id}>
                                <DiscussionCard size="sm" discussion={discussion} />
                            </NavLink>
                        </GridItem>
                    })
                }
            </Grid>
        </ModalWrapper>
    )
}

const ProductPublication = () => {
    const params = useParams()

    const { data: products, error: errorProduct } = useSWR(`/products/user?user=${params.id}`, { suspense: true })

    return (
        <ModalWrapper
            id="produits"
            title={<><MARKET_PLACE_ICON />Produits mis en vente</>}
            renderButton={(onOpen) => <ButtonOpenModal onClick={onOpen} label={"Produits mis en vente"} icon={<MARKET_PLACE_ICON />} />}
            params={{ size: 'full' }}
        >
            <Grid gap={5} templateColumns={templateColumns({ base: 1, sm: 1, md: 3, lg: 4 })}>
                {
                    products.map((product: any) => {
                        return <GridItem key={product.id}>
                            <NavLink to={'/market-place/product/detail/' + product.id}>
                                <ProductCard size="sm" product={product} />
                            </NavLink>
                        </GridItem>
                    })
                }
            </Grid>
        </ModalWrapper>
    )
}

const Publications = () => {
    const params = useParams()
    const { user: currentUser }: any = useAuthContext()

    return (
        <Stack>
            <Text as="h2" fontWeight={"bold"} fontSize={"2xl"}>Publications</Text>
            <Grid
                gap={5}
                templateColumns={templateColumns({ base: 1, sm: 1, md: 2 })}>
                <GridItem>
                    <PlacePublication />
                </GridItem>
                <GridItem>
                    <DiscusionPublication />
                </GridItem>
                <GridItem>
                    <ProductPublication />
                </GridItem>
                {currentUser && currentUser.id == params.id ? <GridItem> <PublicationLiked /> </GridItem> : <></>}
            </Grid>
        </Stack>
    )

}

const UserDetail = () => {
    const params = useParams()

    const { user: currentUser }: any = useAuthContext()

    const { data: user, error: userError } = useSWR('/user/' + params.id, { suspense: true })

    const currentUserProfil = currentUser.id === user.id

    if (userError) console.error({ userError })


    return (
        <Box my={VERTICAL_SPACING} >
            <ContainerSection withPadding={true}>
                <Grid
                    gap={10}
                    templateColumns={{
                        base: "repeat(1, 1fr)",
                        md: "repeat(10, 1fr)",
                    }}>
                    <GridItem colSpan={{
                        base: 1,
                        md: 3
                    }}>
                        <Card>
                            <CardBody>
                                <Stack direction={"row"} justifyContent={"center"}>
                                    <VStack>
                                        <UserSniped size="xl" avatar={user.avatar} />
                                        <Text as="h1" fontSize={"lg"} fontWeight={"bold"}> {user.pseudo} </Text>
                                    </VStack>
                                </Stack>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem colSpan={{
                        base: 1,
                        md: 7
                    }}>
                        <HStack spacing={VERTICAL_SPACING} alignItems={"flex-start"}>
                            <Stack spacing={VERTICAL_SPACING}>
                                <Stack alignItems={"flex-start"}>
                                    <Text as="h2" fontWeight={"bold"} fontSize={"2xl"}>A propos de {user.pseudo} </Text>
                                    {currentUserProfil && <Button size="sm" variant="outline">Modifier mon profil</Button>}
                                    <Wrap spacing={1}>
                                        <Text w={{ base: '100%', sm: '49%' }}>d'autre info comme airbnb azer tr er</Text>
                                        <Text w={{ base: '100%', sm: '49%' }}>d'autre info comme airbnb</Text>
                                        <Text w={{ base: '100%', sm: '49%' }}>d'autre info comme airbnb</Text>
                                    </Wrap>
                                </Stack>
                                <Stack>
                                    <Text fontWeight={500} fontSize={"xl"}>Présentation</Text>
                                    <Text> Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, doloremque nesciunt suscipit quos consequuntur accusamus ab optio nostrum aut labore laudantium natus necessitatibus sapiente earum sequi quasi culpa, porro voluptates. </Text>
                                </Stack>
                                <Divider opacity={1} />
                                <Publications />
                            </Stack>
                        </HStack>
                    </GridItem>
                </Grid>
            </ContainerSection>
        </Box>)
}

const ProfilPage = () => {

    return <Suspense fallback={<LoadingPage type="page" />}>
        <UserDetail />
    </Suspense>
}

export default ProfilPage