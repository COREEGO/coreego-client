import { Suspense } from "react"
import { useParams } from "react-router"
import useSWR from "swr"
import LoadingPage from "../../components/LoadingPage"
import { Avatar, Box, Button, Card, CardBody, Divider, FormControl, FormErrorMessage, Grid, GridItem, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Textarea, VStack, Wrap, useDisclosure } from "@chakra-ui/react"
import { VERTICAL_SPACING } from "../../utils/variables"
import ContainerSection from "../components/ContainerSection"
import UserSniped from "../../components/react-ux/UserSniped"
import { noEmptyValidator, noEmtyFileValidator } from "../../utils/formValidation"
import { Controller, useForm } from "react-hook-form"
import UploadImageModule from "../components/modules/UploadImageModule"
import { useAuthContext } from "../../contexts/AuthProvider"
import ProfilPublicationsModal from "../../components/Modals/ProfilPublicationsModal"
import LikesUserModal from "../../components/Modals/LikesUserModal"



const Publications = () => {
    const params = useParams()

    const { data: places, error } = useSWR(`/places/user?user=${params.id}`, { suspense: true })
    const { data: discussions, error: errorPublication } = useSWR(`/discussions/user?user=${params.id}`, { suspense: true })
    const { data: products, error: errorProduct } = useSWR(`/products/user?user=${params.id}`, { suspense: true })
    const { data: likes, error: errorLike } = useSWR(`/likes/user?current_logged=true`, { suspense: true })

    const likesPlaces = likes.reduce((prev: any, curr: any) => {
        if ('place' in curr) prev.push(curr.place)
        return prev
    }, [])

    const likesDiscussion = likes.reduce((prev: any, curr: any) => {
        if ('discussion' in curr) prev.push(curr.discussion)
        return prev
    }, [])

    return (
        <Stack>
            <Text as="h2" fontWeight={"bold"} fontSize={"2xl"}>Publications</Text>
            <Grid
                gap={5}
                templateColumns={{
                    base: "repeat(1, 1fr)",
                    sm: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                }}>
                {places.length &&
                    <GridItem>
                        <ProfilPublicationsModal datas={places} cardName={"place"} />
                    </GridItem>
                }
                {
                    discussions.length &&
                    <GridItem>
                        <ProfilPublicationsModal datas={discussions} cardName={"discussion"} />
                    </GridItem>
                }
                {
                    products.length &&
                    <GridItem>
                        <ProfilPublicationsModal datas={products} cardName={"product"} />
                    </GridItem>
                }
                {
                    (likesPlaces.length && likesDiscussion.length) && <GridItem>
                        <LikesUserModal places={likesPlaces} discussions={likesDiscussion} />
                    </GridItem>
                }
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
        </Box>    )
}

const ProfilPage = () => {

    return <Suspense fallback={<LoadingPage type="page" />}>
        <UserDetail />
    </Suspense>
}

export default ProfilPage