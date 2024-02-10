import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import TitleText from "../texts/TitleText"
import { IMAGE_PATH } from "../../utils/variables"
import { noEmptyValidator, notEmptyQuillEditor } from "../../utils/formValidation"
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
import useMalware from "../../hooks/useMalware"
import ReactQuillInput from "../inputs/ReactQuillInput"

interface PropsInterface {
    isEditMode?: boolean
    data?: any,
    mutate?: Function
}

type Inputs = {
    title: string
    content: string
    category: number | string,
    files: any
}

const DiscussionForm: React.FC<PropsInterface> = ({ isEditMode = false, data, mutate = null }) => {

    const navigate = useNavigate()
    const params = useParams()
    const { user }: any = useAuthContext()
    const { owner }: any = useMalware()

    useEffect(() => {
        if (isEditMode) owner(data.user.id)
    }, [])

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
        trigger,
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
            const url = isEditMode ? `/discussion/edit/${params.id}` : '/discussions';
            const method = isEditMode ? 'patch' : 'post';

            const response: any = await apiFetch(url, method, {
                title: data.title,
                category_id: data.category,
                content: data.content,
            }, true)

            if ('data' in response && response.data && files && Array.isArray(files) && files.length) {
                for (const file of data.files) {
                    const formData = new FormData();
                    formData.append('name', file);
                    formData.append('discussion_id', response.data.id);
                    await apiFetch('/image/new', 'post', formData, true);
                }
            }
            toast.success(response.message);
            clearFiles()
            navigate(`/forum/discussion/detail/${response.data.slug}`)
        } catch (error: any) {
            toast.error(error.message.message);
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
                            {errors.title && <FormHelperText>{errors.title.message}</FormHelperText>}
                        </FormControl>

                        <FormControl required fullWidth error={errors.category ? true : false}>
                            <InputLabel id="demo-simple-select-label">Catégorie</InputLabel>
                            <Select
                                {...register('category', noEmptyValidator)}
                                defaultValue={data?.category.id || ''}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Catégorie"
                            >
                                <MenuItem value="">-------</MenuItem>
                                {discussionCategories.map((category: any) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.category && <FormHelperText id="component-error-text">{errors.category.message}</FormHelperText>}
                        </FormControl>

                        <FormControl>
                            <Controller
                                control={control}
                                name="content"
                                rules={{
                                    validate: () => notEmptyQuillEditor(getValues('content'))
                                 }}
                                render={({ field: { value, onChange } }) => (
                                    <ReactQuillInput
                                        value={value} onChange={onChange}
                                    />
                                )}
                            />
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
                                                        imageUrl={IMAGE_PATH + image.name}
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
                        <Box>
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
    )
}

export default DiscussionForm