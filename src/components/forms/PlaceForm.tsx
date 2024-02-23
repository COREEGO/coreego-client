import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import TitleText from "../texts/TitleText"
import { BASE_URL, IMAGE_PATH } from "../../utils/variables"
import { noEmptyLocalisationValidator, noEmptyValidator, noEmtyFileValidator } from "../../utils/formValidation"
import UpladButton from "../buttons/UplaodButton"
import useFile from "../../hooks/useFile"
import { CAMERA_ICON, TRASH_ICON } from "../../utils/icon"
import FormImage from "../images/FormImage"
import { apiFetch } from "../../http-common/apiFetch"
import { useEffect, useState } from "react"
import CityDistrictSelectInput from "../inputs/CityDistrictSelectInput"
import LoadingPage from "../LoadingPage"
import axios from "axios"
import MapSimpleMarker from "../maps/MapSimpleMarker"
import { Box, Button, Container, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import { useAuthContext } from "../../contexts/AuthProvider"
import { toast } from "react-toastify"
import useMalware from "../../hooks/useMalware"

interface PropsInterface {
    isEditMode?: boolean
    data?: any,
    mutate?: Function
}

type Inputs = {
    title: string,
    city: number | string,
    district: number | string,
    category: number,
    description: string,
    longitude: string,
    latitude: string,
    address: string,
    files: Array<any>
}

const PlaceForm: React.FC<PropsInterface> = ({ isEditMode = false, data, mutate = null }) => {

    const navigate = useNavigate()
    const params = useParams()

    const { user }: any = useAuthContext()
    const { owner }: any = useMalware()

    useEffect(() => {
        if (isEditMode) owner(data.user.id)
    }, [])

    const [isLocalisationBusy, setIsLocalisationBusy] = useState<boolean>(false)
    const [addressData, setAddressData] = useState<any>(null)

    const { files,
        addFile,
        removeFile,
        deleteFile,
        clearFiles
    } = useFile()

    const { placeCategories } = useSelector((state: any) => state.app);

    const {
        control,
        register,
        getValues,
        setValue,
        handleSubmit,
        clearErrors,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        mode: 'onTouched',
        defaultValues: {
            title: data?.title,
            city: data?.city.id,
            district: data?.district.id,
            category: data?.category.id,
            description: data?.description,
            longitude: data?.longitude,
            latitude: data?.latitude,
            address: data?.address,
            files: []
        }
    })

    const onSubmitForm: SubmitHandler<Inputs> = async (data: any) => {
        const url = isEditMode ? `/place/edit/${params.id}` : '/place/new';
        const method = isEditMode ? 'patch' : 'post';

        try {
            const response: any = await apiFetch(url, method, {
                title: data.title,
                category_id: data.category,
                description: data.description,
                longitude: addressData?.lon || data.longitude,
                latitude: addressData?.lat || data.latitude,
                address: addressData?.display_name || data.address,
                city_id: data.city,
                district_id: data.district,
            }, true)

            if (response && files && Array.isArray(files) && files.length) {
                for (const file of data.files) {
                    const formData = new FormData();
                    formData.append('name', file);
                    formData.append('place_id', response.data.id);
                    formData.append('user_id', user.id);
                    await apiFetch('/image/new', 'post', formData, true)
                }
            }

            toast.success(response.message);

            clearFiles()
            navigate(`/voyage/place/detail/${response.data.id}`)
        } catch (error: any) {
            toast.error(error.message)
            console.error(error)
        }
    }


    const handleSearchLocalisation = async () => {

        const address = getValues().address
        clearErrors('address')
        if (address && address.trim().length) {
            try {
                setIsLocalisationBusy(true)
                const response: any = await axios.get(`https://nominatim.openstreetmap.org/search?q=${address}&format=json&limit=1`)
                if ((response && 'data' in response && response.data.length) &&
                    response.data[0].display_name.includes('South Korea')) {
                    setAddressData(response.data[0])
                    console.log(addressData)
                } else {
                    setError('address', {
                        type: 'manual',
                        message: "Aucun lieu trouvé"
                    })
                    setAddressData(null)
                }
            } catch (error: any) {
                console.error(error)
            } finally {
                setIsLocalisationBusy(false)
            }
        } else {
            setAddressData(null)
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
                    <TitleText text={isEditMode ? "Modifier ce lieu" : "Nouveau lieu"} />
                    <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmitForm)}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                error={errors.title ? true : false}
                                {...register('title', noEmptyValidator)} fullWidth placeholder="titre" label="Donnez un titre à votre lieu ?" id="title" />
                            {errors.title && <FormHelperText id="component-error-text">{errors.title.message}</FormHelperText>}
                        </FormControl>
                        <FormControl required fullWidth error={errors.category ? true : false}>
                            <InputLabel>Catégorie</InputLabel>
                            <Select
                                {...register('category', noEmptyValidator)}
                                defaultValue={data?.category.id || ''}
                                id="demo-simple-select"
                                label="Catégorie"
                            >
                                <MenuItem value="">-------</MenuItem>
                                {placeCategories.map((category: any) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.category && <FormHelperText id="component-error-text">{errors.category.message}</FormHelperText>}
                        </FormControl>
                        <FormControl required fullWidth error={errors.district ? true : false}>
                            <Typography sx={{ mb: 1 }}>Localisation *</Typography>
                            <Controller
                                control={control}
                                name="district"
                                rules={{
                                    validate: () => noEmptyLocalisationValidator(getValues().city.toString(), getValues().district.toString())
                                }}
                                render={() => (
                                    <CityDistrictSelectInput
                                        cityValue={data?.city.id || ''}
                                        districtValue={data?.district.id || ''}
                                        updateCity={(e: any) => setValue('city', e)}
                                        updateDistrict={(e: any) => setValue('district', e)}
                                    />
                                )}
                            />
                            {errors.district && <FormHelperText> {errors.district.message} </FormHelperText>}
                        </FormControl>
                        <FormControl fullWidth error={errors.address ? true : false}>
                            <Stack>
                                <>
                                    <TextField
                                        required
                                        {...register('address', {...noEmptyValidator})}
                                        type="text"
                                        onBlur={handleSearchLocalisation}
                                        label="Addresse du lieu"
                                    />
                                    {addressData || data?.latitude ?
                                        <Box sx={{ mt: 2, height: { xs: 300, md: 400, position: 'relative', width: '100%' } }}>
                                            <MapSimpleMarker
                                                updateMarker={(event: { lat: number, lng: number }) => (
                                                    setValue('address', `${event.lat},${event.lng}`),
                                                    handleSearchLocalisation()
                                                )}
                                                displayMapMode={true}
                                                displayMapType={true}
                                                lat={addressData?.lat || data?.latitude} lng={addressData?.lon || data?.longitude} />
                                        </Box>
                                        : <></>}
                                </>
                            </Stack>
                            {errors.address && <FormHelperText> {errors.address.message} </FormHelperText>}
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                label="Décrivez le lieu"
                                placeholder="En quoi ce lieu est intéressant a visité ?"
                                error={errors.description ? true : false}
                                autoFocus
                                required
                                multiline
                                rows={10}
                                {...register('description', { ...noEmptyValidator })} />
                            {errors.description && <FormHelperText id="component-error-text">{errors.description.message}</FormHelperText>}
                        </FormControl>
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
                                                        imageUrl={IMAGE_PATH + image.name}
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
                        <Box sx={{ zIndex: 100, py: 2, position: 'sticky', bottom: 0, bgcolor: 'white' }}>
                            <LoadingButton
                                type="submit"
                                loading={isSubmitting}
                                variant="contained"
                            >
                                {isEditMode ? "Modifier le lieu" : " Partager ce lieu"}
                            </LoadingButton>
                        </Box>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    )
}

export default PlaceForm
