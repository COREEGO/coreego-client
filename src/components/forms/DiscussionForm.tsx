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

    const { files: images,
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

    const onSubmitForm: SubmitHandler<Inputs> = (data: any) => {
        try {

        } catch (error) {
            console.log(error)
        }
    }

    const onChangeFiles = (e: any) => {

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
                                images.length ? <Wrap>
                                    {
                                        images.map((image: any, index: number) => {
                                            return (
                                                <FormImage
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
                            <Button colorScheme="green">Créer ce sujet</Button>
                        </Flex>
                    </ContainerSection>
                </Box>
            </Stack>
        </Box >
    )
}

export default DiscussionForm