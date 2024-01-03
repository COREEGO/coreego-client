import { useNavigate, useParams } from "react-router"
import useFile from "../../hooks/useFile"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import TitleText from "../texts/TitleText"
import { noEmptyLocalisationValidator, noEmptyValidator, noEmtyFileValidator } from "../../utils/formValidation"
import CityDistrictSelectInput from "../inputs/CityDistrictSelectInput"
import { useEffect, useMemo, useState } from "react"
import { apiFetch } from "../../http-common/apiFetch"
import { useAuthContext } from "../../contexts/AuthProvider"
import { Box, Button, Container, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import UpladButton from "../buttons/UplaodButton"
import FormImage from "../images/FormImage"
import { BASE_URL } from "../../utils/variables"
import { CAMERA_ICON } from "../../utils/icon"
import LoadingButton from "@mui/lab/LoadingButton"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import useMalware from "../../hooks/useMalware"

interface PropsInterface {
    isEditMode?: boolean
    data?: any,
    mutate?: Function
}

type Inputs = {
    title: string
    description: string
    price: number
    city: string | number
    district: string | number
    files: any[]
}

const ProductForm: React.FC<PropsInterface> = ({ isEditMode = false, data, mutate = null }) => {

    const navigate = useNavigate()
    const params = useParams()

    const { cities } = useSelector((state: any) => state.app);

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

    const {
        control,
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        mode: 'onTouched',
        defaultValues: {
            title: data?.title,
            description: data?.description,
            city: data?.city.id,
            district: data?.district.id,
            price: data?.price || 1000,
            files: []
        }
    })


    const onSubmitForm: SubmitHandler<Inputs> = async (data: any) => {
        const url = isEditMode ? `/product/edit/${params.id}` : '/product/new';
        const method = isEditMode ? 'patch' : 'post';
        try {
            const response: any = await apiFetch(url, method, {
                title: data.title,
                description: data.description,
                price: parseInt(data.price),
                city_id: data.city,
                district_id: data.district,
                user_id: user.id
            }, true)

            if ('data' in response && response.data && files && Array.isArray(files) && files.length) {
                for (const file of data.files) {
                    const formData = new FormData();
                    formData.append('path', file);
                    formData.append('product_id', response.data.id);
                    formData.append('user_id', user.id)
                    await apiFetch('/image/new', 'post', formData, true);
                }
            }
            toast.success(response.message);
            clearFiles()
            navigate(`/market-place/product/detail/${response.data.id}`)
        } catch (error: any) {
            toast.error(JSON.parse(error.message))
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
                <Stack component="form" spacing={3} onSubmit={handleSubmit(onSubmitForm)}>
                    <TitleText text={isEditMode ? "Modifier ce produit" : "Mettre en vente un produit"} />
                    <FormControl fullWidth>
                        <TextField
                            required
                            error={errors.title ? true : false}
                            {...register('title', noEmptyValidator)} fullWidth placeholder="titre" label="Donnez un titre à votre produit ?" id="title" />
                        {errors.title && <FormHelperText id="component-error-text">{errors.title.message}</FormHelperText>}
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            label="Decrivez le produit"
                            placeholder="Description"
                            error={errors.description ? true : false}
                            autoFocus
                            required
                            multiline
                            rows={10}
                            {...register('description', { ...noEmptyValidator })} />
                        {errors.description && <FormHelperText id="component-error-text">{errors.description.message}</FormHelperText>}
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            type="number"
                            required
                            min={1}
                            onInput={(event: any) => {
                                const value = event.target.value
                                if (value < 0) setValue('price', 0)
                            }
                            }
                            error={errors.price ? true : false}
                            {...register('price', noEmptyValidator)} fullWidth placeholder="Prix" label="Quelle est son prix ?" id="price" />
                        {errors.price && <FormHelperText id="component-error-text">{errors.price.message}</FormHelperText>}
                    </FormControl>
                    <Controller
                            control={control}
                            name="district"
                            rules={{
                                validate: () => noEmptyLocalisationValidator(getValues().city, getValues().district)
                            }}
                            render={() => (
                                <CityDistrictSelectInput
                                    cityValue={data?.city.id || ''}
                                    districtValue={data?.district.id || ''}
                                    updateCity={(e:any) => setValue('city', e) }
                                    updateDistrict={(e:any) => setValue('district', e) }
                                    showMap={true}
                                />
                            )}
                        />
                        {errors.district ? <FormHelperText> {errors.district.message} </FormHelperText> : <></>}
                    {
                        (isEditMode && data?.images.length) ? <FormControl>
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
                        </FormControl> : <></>
                    }

                    {
                        files.length ? <Stack direction="row" flexWrap={"wrap"} mb={2}>
                            {
                                files.map((image: any, index: number) => {
                                    return (
                                        <Box key={index} mr={1} mb={1}>
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
                    <FormControl error={errors.files ? true : false}>
                        <Controller
                            control={control}
                            name="files"
                            rules={{
                                validate: () => noEmtyFileValidator(files.concat(data?.images || []))
                            }}
                            render={() => (
                                <UpladButton onChange={(e: any) => addFile(e.target.files)}>
                                    <Button variant="outlined" startIcon={<CAMERA_ICON />}>Ajouter des photos</Button>
                                </UpladButton>
                            )}
                        />
                        {errors.files ? <FormHelperText> {errors.files.message} </FormHelperText> : <></>}
                    </FormControl>
                    <Box sx={{ zIndex: 10, py: 2, position: 'sticky', bottom: 0, bgcolor: 'white' }}>
                        <LoadingButton
                            type="submit"
                            loading={isSubmitting}
                            variant="contained"
                        >
                            {isEditMode ? "Modifier le produit" : " Créer le produit"}
                        </LoadingButton>
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}

export default ProductForm