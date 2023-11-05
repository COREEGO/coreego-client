import { Suspense } from "react"
import { useParams } from "react-router"
import useSWR from "swr"
import LoadingPage from "../../components/LoadingPage"
import { Avatar, Box, Button, FormControl, FormErrorMessage, Grid, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Textarea, VStack, useDisclosure } from "@chakra-ui/react"
import { VERTICAL_SPACING } from "../../utils/variables"
import ContainerSection from "../components/ContainerSection"
import UserSniped from "../../components/react-ux/UserSniped"
import { noEmptyValidator, noEmtyFileValidator } from "../../utils/formValidation"
import { Controller, useForm } from "react-hook-form"
import UploadImageModule from "../components/modules/UploadImageModule"
import { useAuthContext } from "../../contexts/AuthProvider"
import FeedList from "../components/FeedList"
import SmallDiscussionCard from "../../components/card/SmallDiscusionCard"
import FeedProfil from "../components/FeedProfil"



const Publications = () => {
    const params = useParams()

    const { data: publications, error } = useSWR(`/user/${params.id}/publications`, { suspense: true })

    if (error) console.error(error)

    return (
        <Stack spacing={VERTICAL_SPACING}>
            <Stack>
                <Text as="b" fontSize="lg" >Discussions</Text>
                <FeedProfil datas={publications.discussions} noLengthLabel={"Aucune discussions publié"} cardName={"discussion"} />
            </Stack>
            <Stack>
                <Text as="b" fontSize="lg" >Produits en vente</Text>
                <FeedProfil datas={publications.products} noLengthLabel={"Aucun produit en vente"} cardName="product" />
            </Stack>
            <Stack>
                <Text as="b" fontSize="lg" >Lieux partagés</Text>
                <FeedProfil datas={publications.places} noLengthLabel={"Aucun lieux publié"} cardName="place" />
            </Stack>
        </Stack>
    )

}

const PublicationsLike = () => {
    const params = useParams()

    const { data, error } = useSWR(`/user/${params.id}/publications/liked`, { suspense: true })


    if (error) console.error({ error })

    const discussions = data.likes.filter((item:any) => item.hasOwnProperty("discussion")).map((item: any) => item.discussion)
    const places = data.likes.filter((item:any) => item.hasOwnProperty("place")).map((item: any) => item.place)

    return (
        <Stack spacing={VERTICAL_SPACING}>
            <Stack>
                <Text as="b" fontSize="lg" >Discussions</Text>
                <FeedProfil datas={discussions} noLengthLabel={"Aucune discussions publié"} cardName={"discussion"} />
            </Stack>
            <Stack>
                <Text as="b" fontSize="lg" >Lieux</Text>
                <FeedProfil datas={places} noLengthLabel={"Aucun lieux aimé"} cardName="place" />
            </Stack>
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
        <>
            <Box py={VERTICAL_SPACING} bg="white">
                <ContainerSection withPadding={true}>
                    <Stack alignItems="flex-start">
                        <HStack>
                            <UserSniped size="lg" avatar={user.avatar} pseudo={user.pseudo} />
                            {currentUserProfil && <Button size="sm" variant="outline">Modifier mon profil</Button>}
                        </HStack>
                        <Text>
                            "The quick brown fox jumps over the lazy dog" is an English-language pangram—a
                            sentence that contains all of the letters of the English alphabet. Owing to
                            its existence, Chakra was created.
                        </Text>
                        <HStack>
                            <Box>FB</Box>
                            <Box>YT</Box>
                            <Box>TIKTOK</Box>
                        </HStack>
                    </Stack>
                </ContainerSection>
            </Box>
            <Box>
                <ContainerSection withPadding={true}>
                    <Tabs>
                        <TabList>
                            <Tab>Publications</Tab>
                            {currentUserProfil && <Tab>Publications aimées</Tab>}
                            <Tab>Three</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel px={0}>
                                <Publications />
                            </TabPanel>
                            {
                                currentUserProfil && <TabPanel px={0}>
                                    <PublicationsLike />
                                </TabPanel>
                            }
                            <TabPanel px={0}>
                                <p>Oh, hello there.</p>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </ContainerSection>
            </Box>
        </>
    )
}

const ProfilPage = () => {

    return <Suspense fallback={<LoadingPage type="page" />}>
        <UserDetail />
    </Suspense>
}

export default ProfilPage