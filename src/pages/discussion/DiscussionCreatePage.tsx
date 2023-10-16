import { Box, Button, Container, FormControl, FormLabel, Input, Select, Stack } from "@chakra-ui/react"
import { CONTAINER_SIZE, VERTICAL_SPACING } from "../../utils/variables"
import Title from "../../components/texts/Title"
import { useState } from "react"
import { useSelector } from "react-redux"
// import {Editor, EditorState} from 'draft-js';
// import 'draft-js/dist/Draft.css';



const DiscussionCreatePage = () => {

    const [isBusy, setIsBusy] = useState<boolean>(false)

    const { discussionCategories } = useSelector((state: any) => state.app);


    const onSubmit = (e:any) => {
        e.preventDefault()

        try {
            const formData = new FormData(e.target)



        } catch (error) {

        }
    }

    return (
        <Container maxW={CONTAINER_SIZE}>
            <Stack my={VERTICAL_SPACING}>
                <Title>Nouvelle discussion</Title>
                <Stack as="form" onSubmit={onSubmit} alignItems="flex-start">
                    <FormControl>
                        <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Titre</FormLabel>
                        <Input type="text" name="title" id="title" placeholder="Titre de la discussion" />
                    </FormControl>
                    <FormControl>
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
                    <Button isLoading={isBusy} type="submit" className="btn_blue">Créer</Button>
                </Stack>
                <p>create form discussion</p>
            </Stack>
        </Container>
    )
}

export default DiscussionCreatePage