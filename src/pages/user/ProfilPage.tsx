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



const UserDetail = () => {
    const params = useParams()

    const { data, error, mutate, isLoading } = useSWR('/users/' + params.id, { suspense: true })
    const { user }: any = useAuthContext()

    const currentUserProfil = user.id === data.id

    return (
        <>
            <Box py={VERTICAL_SPACING} bg="white">
                <ContainerSection withPadding={true}>
                    <Stack alignItems="flex-start">
                        <HStack>
                            <UserSniped size="lg" avatar={data.avatar} pseudo={data.pseudo} />
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
                            <Tab>Aimés</Tab>
                            <Tab>Three</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Stack spacing={VERTICAL_SPACING}>
                                    <Stack>
                                        <Text as="b" fontSize="lg" >Discussions</Text>
                                        <FeedProfil datas={data.discussions} noLengthLabel={"Aucune discussions publié"} cardName={"discussion"}  />
                                    </Stack>
                                    <Stack>
                                        <Text as="b" fontSize="lg" >Produits en vente</Text>
                                        <FeedProfil datas={data.products} noLengthLabel={"Aucun produit en vente"} cardName="product" />
                                    </Stack>
                                    <Stack>
                                        <Text as="b" fontSize="lg" >Lieux partagés</Text>
                                        <FeedProfil datas={data.places} noLengthLabel={"Aucun lieux publié"} cardName="place" />
                                    </Stack>
                                </Stack>
                            </TabPanel>
                            <TabPanel>
                                <p>Yeah yeah. What's up?</p>
                            </TabPanel>
                            <TabPanel>
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