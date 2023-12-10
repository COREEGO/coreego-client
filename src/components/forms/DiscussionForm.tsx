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
import LoadingButton from '@mui/lab/LoadingButton';
import { toast } from 'react-toastify';

import { Box, Button, Container, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import { useAuthContext } from "../../contexts/AuthProvider"

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
    const params = useParams()
    const { user }: any = useAuthContext()

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

    useEffect(()=>{
        console.log(data.category.id)
    }, [data])

    const onSubmitForm: SubmitHandler<Inputs> = async (data: any) => {
        try {
            const url = isEditMode ? `/discussion/edit/${params.id}` : '/discussion/new';
            const method = isEditMode ? 'patch' : 'post';

            const response: any = await apiFetch(url, method, {
                title: data.title,
                category_id: data.category,
                content: data.content,
                user_id: user.id
            })

            if ('data' in response && response.data && files && Array.isArray(files) && files.length) {
                for (const file of data.files) {
                    const formData = new FormData();
                    formData.append('path', file);
                    formData.append('discussion_id', response.data.id);
                    formData.append('user_id', user.id)
                    await apiFetch('/image/new', 'post', formData);
                }
            }
            toast.success(isEditMode ? "Discussion modifié" : "Disccussion créé");
            clearFiles()
            navigate(`/forum/discussion/detail/${response.data.id}`)
        } catch (error: any) {
            toast.error(JSON.parse(error.message), { autoClose: false });
        }
    }

    useEffect(() => {
        setValue('files', files.map((file: any) => {
            return file.file
        }))
    }, [files])


    return (
        <Box my={3}>
            <Container maxWidth="lg">
                <Stack spacing={3}>
                    <TitleText text={isEditMode ? "Modifier ce sujet" : "Nouveau sujet"} />
                    <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmitForm)}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                error={errors.title ? true : false}
                                {...register('title', noEmptyValidator)} fullWidth placeholder="titre" label="De quoi parlera votre discussion ?" id="title" />
                            {errors.title && <FormHelperText id="component-error-text">{errors.title.message}</FormHelperText>}
                        </FormControl>

                        <FormControl required fullWidth error={errors.category ? true : false}>
                            <InputLabel id="demo-simple-select-label">Catégorie</InputLabel>
                            <Select
                                {...register('category', noEmptyValidator)}
                                defaultValue={getValues().category || ''}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Catégorie"
                            >
                                <MenuItem value="">-------</MenuItem>
                                {discussionCategories.map((category: any) => {
                                    return (
                                        <MenuItem key={category.id} value={category.id}>{category.label}</MenuItem>
                                    )
                                })
                                }
                            </Select>
                            {errors.category && <FormHelperText id="component-error-text">{errors.category.message}</FormHelperText>}
                        </FormControl>

                        <FormControl fullWidth>
                            <TextField
                                label="Contenu"
                                error={errors.content ? true : false}
                                autoFocus
                                required
                                multiline
                                rows={10}
                                {...register('content', { ...noEmptyValidator })} />
                            {errors.content && <FormHelperText id="component-error-text">{errors.content.message}</FormHelperText>}
                        </FormControl>

                        {
                            (isEditMode && data?.images.length) ? <Box>
                                <Typography fontWeight={"bold"}>Images</Typography>
                                <Stack direction="row" flexWrap={"wrap"} mt={2}>
                                    {
                                        data.images.map((image: any, index: number) => {
                                            return (
                                                <Box key={index} mr={1} mb={1}>
                                                    <FormImage
                                                        key={index}
                                                        imageUrl={BASE_URL + '/storage/images/' + image.path}
                                                        onRemove={() => deleteFile(image.id)}
                                                    />
                                                </Box>
                                            )
                                        })
                                    }
                                </Stack>
                                <Divider />
                            </Box> : <></>
                        }

                        {
                            files.length ? <Stack direction="row" flexWrap={"wrap"} mb={2}>
                                {
                                    files.map((image: any, index: number) => {
                                        return (
                                            <Box mr={1} mb={1} key={index}>
                                                <FormImage
                                                    key={index}
                                                    imageUrl={image.url}
                                                    onRemove={() => removeFile(index)}
                                                />
                                            </Box>
                                        )
                                    })
                                }
                            </Stack> : <></>
                        }
                        <FormControl>
                            <Controller
                                control={control}
                                name="files"
                                render={() => (
                                    <UpladButton onChange={(e: any) => addFile(e.target.files)}>
                                        <Button variant="outlined" startIcon={<CAMERA_ICON />}>Ajouter des photos</Button>
                                    </UpladButton>
                                )}
                            />
                        </FormControl>
                        <Box sx={{ py: 2, position: 'sticky', bottom: 0, bgcolor: 'white' }}>
                            <LoadingButton
                                type="submit"
                                loading={isSubmitting}
                                variant="contained"
                            >
                                {isEditMode ? "Modifier ce sujet" : " Créer ce sujet"}
                            </LoadingButton>
                        </Box>
                    </Stack>
                </Stack>
            </Container>
        </Box>
        // <Box my={VERTICAL_SPACING}>
        //     <Stack spacing={VERTICAL_SPACING} as="form" onSubmit={handleSubmit(onSubmitForm)}>
        //         <ContainerSection withPadding={true}>
        //             <Stack>
        //                 <TitleText text={isEditMode ? "Modifier ce sujet" : "Nouveau sujet"} />
        //                 <Stack>
        //                     <FormControl isInvalid={errors.title ? true : false}>
        //                         <FormLabel>Titre</FormLabel>
        //                         <Input variant='filled' size="lg" {...register('title', noEmptyValidator)} type="text"
        //                             placeholder="Donnez un titre à votre sujet ?"
        //                         />
        //                         {errors.title && <FormErrorMessage> {errors.title.message} </FormErrorMessage>}
        //                     </FormControl>

        //                     <FormControl isInvalid={errors.category ? true : false}>
        //                         <FormLabel>Catégorie</FormLabel>
        //                         <Select variant='filled' size="lg"  {...register('category', noEmptyValidator)}>
        //                             <option value="">--Selectionnez une catégorie--</option>

        //                         </Select>
        //                         {errors.category && <FormErrorMessage>{errors.category.message}</FormErrorMessage>}
        //                     </FormControl>

        //                     <FormControl isInvalid={errors.content ? true : false}>
        //                         <FormLabel>Contenu</FormLabel>
        //                         <Textarea
        //                             variant='filled'
        //                             {...register('content', noEmptyValidator)}
        //                             rows={10} placeholder="Partagez votre contenu..." />
        //                         {errors.content && <FormErrorMessage>{errors.content.message}</FormErrorMessage>}
        //                     </FormControl>

        //                     <FormControl>
        //                         <Controller
        //                             control={control}
        //                             name="files"
        //                             render={() => (
        //                                 <UpladButton onChange={(e: any) => addFile(e.target.files)}>
        //                                     <Button variant="outline" leftIcon={<CAMERA_ICON />}>Ajouter des photos</Button>
        //                                 </UpladButton>
        //                             )}
        //                         />
        //                     </FormControl>
        //                 </Stack>
        //             </Stack>
        //         </ContainerSection>
        //         <Box py={3} bg="white" position="sticky" bottom={0}>
        //             <ContainerSection withPadding={true}>
        //                 <Flex>
        //                     <Spacer />
        //                     <Button isLoading={isSubmitting} type="submit" colorScheme="green">
        //                         {isEditMode ? "Modifier ce sujet" : " Créer ce sujet"}
        //                     </Button>
        //                 </Flex>
        //             </ContainerSection>
        //         </Box>
        //     </Stack>
        // </Box >
    )
}

export default DiscussionForm