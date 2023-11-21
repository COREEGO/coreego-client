import { Box, Button, Flex, FormControl, FormErrorMessage, IconButton, Image, Input, Select, Spacer, Stack, Textarea, Wrap, useToast } from "@chakra-ui/react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import ContainerSection from "../../pages/components/ContainerSection"
import TitleText from "../texts/TitleText"
import { VERTICAL_SPACING } from "../../utils/variables"
import { noEmptyValidator } from "../../utils/formValidation"
import UpladButton from "../buttons/UplaodButton"
import useFile from "../../hooks/useFile"
import { CAMERA_ICON, TRASH_ICON } from "../../utils/icon"
import FormImage from "../images/FormImage"
import { apiFetch } from "../../http-common/apiFetch"

interface PropsInterface {
    isEditMode?: boolean
    data?: any
}

type Inputs = {
    title: string
    content: string
    category: number,
    files: any
}

const DiscussionForm: React.FC<PropsInterface> = ({ isEditMode = false, data }) => {

    const navigate = useNavigate()
    const toast = useToast()

    const { files,
        addFile,
        removeFile,
        clearFiles
    } = useFile()

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

    const onSubmitForm: SubmitHandler<Inputs> = async (data: any) => {
        try {
            const response: any = await apiFetch('/discussion', 'post', {
                title: data.title,
                category: `/api/discussion_categories/${data.category}`,
                content: data.content
            })
            if (response && files && Array.isArray(files) && files.length) {
                for (const file of files) {
                    const formData = new FormData();
                    formData.append('file', file.file);
                    formData.append('discussion', `/api/discussions/${response.id}`);
                    await apiFetch('/images', 'post', formData);
                }
            }
            toast({
                description: 'Sujet créé',
                status: 'success'
            })
            clearFiles()
            navigate(`/forum/discussion/detail/${response.id}`)
        } catch (error:any) {
            toast({
                description: JSON.parse(error.message),
                status: 'error'
            })
        }
    }



    return (
        <Box py={VERTICAL_SPACING}>
            <Stack spacing={VERTICAL_SPACING} as="form" onSubmit={handleSubmit(onSubmitForm)}>
                <ContainerSection withPadding={true}>
                    <Stack>
                        <TitleText text={"Nouveau sujet"} />
                        <Stack>

                            <FormControl isInvalid={errors.title ? true : false}>
                                <Input variant='filled' size="lg" {...register('title', noEmptyValidator)} type="text"
                                    placeholder="Donnez un titre à votre sujet ?"
                                />
                                {errors.title && <FormErrorMessage> {errors.title.message} </FormErrorMessage>}
                            </FormControl>

                            <FormControl isInvalid={errors.category ? true : false}>
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
                                <Textarea
                                    variant='filled'
                                    {...register('content', noEmptyValidator)}
                                    rows={10} placeholder="Partagez votre contenu..." />
                                {errors.content && <FormErrorMessage>{errors.content.message}</FormErrorMessage>}
                            </FormControl>

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
                <Box py={3} bg="white"  position="sticky" bottom={0}>
                    <ContainerSection withPadding={true}>
                        <Flex>
                            <Spacer />
                            <Button isLoading={isSubmitting} type="submit" colorScheme="green">Créer ce sujet</Button>
                        </Flex>
                    </ContainerSection>
                </Box>
            </Stack>
        </Box >
    )
}

export default DiscussionForm