import { Box, Button, Container, FormControl, FormLabel, Grid, GridItem, Input, Select, Stack, Textarea, useToast } from "@chakra-ui/react"
import { CONTAINER_SIZE, VERTICAL_SPACING } from "../../utils/variables"
import Title from "../../components/texts/Title"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import RichEditor from "../../components/editor/RichEditor"
import UploadImageModule from "../components/modules/UploadImageModule"
import useFile from "../../hooks/useFile"
import { apiFetch } from "../../http-common/apiFetch"
import { useNavigate } from "react-router"



const DiscussionCreatePage = () => {

    const navigate = useNavigate()
    const toast = useToast()

    const [isBusy, setIsBusy] = useState<boolean>(false)

    const [files, setFiles] = useState<Array<any>>([])

    const { discussionCategories } = useSelector((state: any) => state.app);

    const onSubmit = async (e: any) => {
        e.preventDefault()

        try {
            setIsBusy(true)
            const form = e.target
            const element = form.elements

            const response: any = await apiFetch('/discussions', 'post', {
                category: 'api/discussion_categories/' + element.category.value,
                title: element.title.value,
                content: element.content.value,
            })

            if (response && files && Array.isArray(files) && files.length) {
                for (const file of files) {
                    const formData = new FormData();
                    formData.append('file', file.file);
                    formData.append('discussion', response.id);
                    await apiFetch('/images', 'post', formData);
                }
            }
            toast({
                description: "Discussion crée",
                status: 'success',
            })
            form.reset()

            // navigate('/discussions/detail/' + response.id)

        } catch (error:any) {
            toast({
                description: error.message,
                status: 'success',
            })
        } finally {
            setIsBusy(false)
        }
    }

    return (
        <Container maxW={CONTAINER_SIZE}>
            <Box my={VERTICAL_SPACING}>
                <Stack as="form" onSubmit={onSubmit} >
                    <Title>Nouvelle discussion</Title>
                    <Grid templateColumns='repeat(10, 1fr)' gap={{ base: 3, md: 20 }}>
                        <GridItem colSpan={{ base: 10, sm: 10, md: 6 }}>
                            <Stack>
                                <FormControl isRequired>
                                    <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Titre</FormLabel>
                                    <Input type="text" name="title" id="title" placeholder="Titre de la discussion" />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Catégorie</FormLabel>
                                    <Select name="category" id="category">
                                        <option value="">--selectionner une catégorie</option>
                                        {
                                            discussionCategories.map((category: any) => {
                                                return (
                                                    <option key={category.id} value={category.id}>{category.label}</option>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Contenu</FormLabel>
                                    <Textarea rows={10} name="content" placeholder="Mon contenu" />
                                </FormControl>
                            </Stack>
                        </GridItem>
                        <GridItem colSpan={{ base: 10, sm: 10, md: 4 }}>
                            <Stack>
                                <FormControl>
                                    <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Ajouter des photos</FormLabel>
                                    <UploadImageModule onChangeFile={(files: Array<any>) => setFiles(files)} />
                                </FormControl>
                            </Stack>
                        </GridItem>
                    </Grid>
                    <Button w="fit-content" isLoading={isBusy} type="submit" className="btn_blue">Créer</Button>
                </Stack>
            </Box>
        </Container>
    )
}

export default DiscussionCreatePage