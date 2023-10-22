import { Box, Button, Card, CardBody, CardFooter, CardHeader, Container, FormControl, FormErrorMessage, FormHelperText, FormLabel, Grid, GridItem, Input, Select, Stack, Textarea, useToast } from "@chakra-ui/react"
import { CONTAINER_SIZE, VERTICAL_SPACING } from "../../utils/variables"
import Title from "../../components/texts/Title"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import RichEditor from "../../components/editor/RichEditor"
import UploadImageModule from "../components/modules/UploadImageModule"
import useFile from "../../hooks/useFile"
import { apiFetch } from "../../http-common/apiFetch"
import { useNavigate } from "react-router"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { noEmptyValidator } from "../../utils/formValidation"
import ContainerSection from "../components/ContainerSection"

type Inputs = {
    title: string
    content: string
    category: number,
    files: Array<any>
}

const DiscussionCreatePage = () => {

    const navigate = useNavigate()
    const toast = useToast()

    const { discussionCategories } = useSelector((state: any) => state.app);

    const {
        control,
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        mode: 'onTouched'
    })



    const onSubmit: SubmitHandler<Inputs> = async (data: any) => {

        try {
            const response: any = await apiFetch('/discussions', 'post', {
                category: 'api/discussion_categories/' + data.category,
                title: data.title,
                content: data.content,
            })
            if (response && data.files && Array.isArray(data.files) && data.files.length) {
                for (const file of data.files) {
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
            navigate('/discussions/detail/' + response.id)
        } catch (error: any) {
            if ('violations' in JSON.parse(error.message)) {
                for (const violation of JSON.parse(error.message).violations) {
                    setError(violation.propertyPath, {
                        type: 'manual',
                        message: violation.message
                    })
                }
            }
        }
    }


    return (
        <Stack my={VERTICAL_SPACING}>
            <ContainerSection>
                <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader><Title text="Ajouter une discussion" /></CardHeader>
                        <CardBody>
                            <Stack>
                                <FormControl isInvalid={errors.title ? true : false}>
                                    <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Titre</FormLabel>
                                    <Input size="lg" {...register('title', noEmptyValidator)} type="text"
                                        placeholder="Titre de la discussion"
                                    />
                                    {errors.title && <FormErrorMessage> {errors.title.message} </FormErrorMessage>}
                                </FormControl>

                                <FormControl isInvalid={errors.category ? true : false}>
                                    <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Catégorie</FormLabel>
                                    <Select size="lg"  {...register('category', noEmptyValidator)} name="category" id="category">
                                        <option value="">--selectionner une catégorie</option>
                                        {discussionCategories.map((category: any) => {
                                            return (
                                                <option key={category.id} value={category.id}>{category.label}</option>
                                            )
                                        })
                                        }
                                    </Select>
                                    {errors.category && <FormErrorMessage>{errors.category.message}</FormErrorMessage>}
                                </FormControl>

                                <FormControl isInvalid={errors.content ? true : false}>
                                    <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Contenu de la discussion</FormLabel>
                                    <Textarea
                                        {...register('content', noEmptyValidator)}
                                        size="lg"
                                        rows={10}  placeholder="Mon contenu" />
                                    {errors.content && <FormErrorMessage>{errors.content.message}</FormErrorMessage>}
                                </FormControl>

                                <FormControl>
                                    <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Ajouter des photos</FormLabel>
                                    <Controller
                                        control={control}
                                        name="files"
                                        render={({ field: { onChange } }) => (
                                            <UploadImageModule onChange={(files: Array<any>) => onChange(files)} />
                                        )}
                                    />
                                </FormControl>
                            </Stack>
                        </CardBody>
                        <CardFooter>
                            <Button w="fit-content" isLoading={isSubmitting} type="submit" colorScheme="blue">Créer la discussion</Button>
                        </CardFooter>
                    </Card>
                </Stack>
            </ContainerSection>
        </Stack>
    )
}

export default DiscussionCreatePage