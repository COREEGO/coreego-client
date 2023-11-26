import { Box, Button, Divider, Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Image, Input, Select, Spacer, Stack, Textarea, Wrap, useToast } from "@chakra-ui/react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import ContainerSection from "../../pages/components/ContainerSection"
import TitleText from "../texts/TitleText"
import { BASE_URL, VERTICAL_SPACING } from "../../utils/variables"
import { noEmptyValidator } from "../../utils/formValidation"
import UpladButton from "../buttons/UplaodButton"
import useFile from "../../hooks/useFile"
import { CAMERA_ICON, TRASH_ICON } from "../../utils/icon"
import FormImage from "../images/FormImage"
import { apiFetch } from "../../http-common/apiFetch"
import { useEffect } from "react"

interface PropsInterface {
    isEditMode?: boolean
    data?: any,
    mutate?: Function
}

type Inputs = {
    title: string
    content: string
    category: number,
    files: any
}

const DiscussionForm: React.FC<PropsInterface> = ({ isEditMode = false, data, mutate = null }) => {

    const navigate = useNavigate()
    const toast = useToast()
    const params = useParams()

    const { files,
        addFile,
        removeFile,
        deleteFile,
        clearFiles
    } = useFile(mutate)

    const { discussionCategories } = useSelector((state: any) => state.app);

    const {
        control,
        register,
        getValues,
        setValue,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        mode: 'onTouched',
        defaultValues: {
            title: data?.title,
            content: data?.content,
            category: data?.category.id,
            files: []
        }
    })

    const onSubmitForm: SubmitHandler<Inputs> = async (data: any) => {
        try {
            const response: any = await apiFetch(`/discussion${isEditMode ? `/${params.id}` : ''}`, `${isEditMode ? 'patch' : 'post'}`, {
                title: data.title,
                category: `/api/discussion_categories/${data.category}`,
                content: data.content
            })
            if (response && files && Array.isArray(files) && files.length) {
                for (const file of data.files) {
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('discussion', `/api/discussion/${response.id}`);
                    await apiFetch('/images', 'post', formData);
                }
            }
            toast({
                description: `${isEditMode ? 'Sujet modifier' : 'Sujet créé'}`,
                status: 'success'
            })
            clearFiles()
            navigate(`/forum/discussion/detail/${response.id}`)
        } catch (error: any) {
            toast({
                description: JSON.parse(error.message),
                status: 'error'
            })
        }
    }

    useEffect(()=>{
        setValue('files', files.map((file: any) => {
            return file.file
        }))
    }, [files])


    return (
        <Box py={VERTICAL_SPACING}>
            <Stack spacing={VERTICAL_SPACING} as="form" onSubmit={handleSubmit(onSubmitForm)}>
                <ContainerSection withPadding={true}>
                    <Stack>
                        <TitleText text={isEditMode ? "Modifier ce sujet" : "Nouveau sujet"} />
                        <Stack>
                            <FormControl isInvalid={errors.title ? true : false}>
                                <FormLabel>Titre</FormLabel>
                                <Input variant='filled' size="lg" {...register('title', noEmptyValidator)} type="text"
                                    placeholder="Donnez un titre à votre sujet ?"
                                />
                                {errors.title && <FormErrorMessage> {errors.title.message} </FormErrorMessage>}
                            </FormControl>

                            <FormControl isInvalid={errors.category ? true : false}>
                                <FormLabel>Catégorie</FormLabel>
                                <Select variant='filled' size="lg"  {...register('category', noEmptyValidator)}>
                                    <option value="">--Selectionnez une catégorie--</option>
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
                                <FormLabel>Contenu</FormLabel>
                                <Textarea
                                    variant='filled'
                                    {...register('content', noEmptyValidator)}
                                    rows={10} placeholder="Partagez votre contenu..." />
                                {errors.content && <FormErrorMessage>{errors.content.message}</FormErrorMessage>}
                            </FormControl>
                            {
                                (isEditMode && data?.images.length) ? <FormControl>
                                    <FormLabel>Images</FormLabel>
                                    <Wrap mb={2}>
                                        {
                                            data.images.map((image: any, index: number) => {
                                                return (
                                                    <FormImage
                                                        key={index}
                                                        imageUrl={BASE_URL + image.filePath}
                                                        onRemove={() => deleteFile(image.id)}
                                                    />
                                                )
                                            })
                                        }
                                    </Wrap>
                                    <Divider />
                                </FormControl> : <></>
                            }

                            {
                                files.length ? <Wrap>
                                    {
                                        files.map((image: any, index: number) => {
                                            return (
                                                <FormImage
                                                    key={index}
                                                    imageUrl={image.url}
                                                    onRemove={() => removeFile(index)}
                                                />
                                            )
                                        })
                                    }
                                </Wrap> : <></>
                            }
                            <FormControl>
                                <Controller
                                    control={control}
                                    name="files"
                                    render={() => (
                                        <UpladButton onChange={(e: any) => addFile(e.target.files)}>
                                            <Button variant="outline" leftIcon={<CAMERA_ICON />}>Ajouter des photos</Button>
                                        </UpladButton>
                                    )}
                                />
                            </FormControl>
                        </Stack>
                    </Stack>
                </ContainerSection>
                <Box py={3} bg="white" position="sticky" bottom={0}>
                    <ContainerSection withPadding={true}>
                        <Flex>
                            <Spacer />
                            <Button isLoading={isSubmitting} type="submit" colorScheme="green">
                                {isEditMode ? "Modifier ce sujet" : " Créer ce sujet"}
                            </Button>
                        </Flex>
                    </ContainerSection>
                </Box>
            </Stack>
        </Box >
    )
}

export default DiscussionForm