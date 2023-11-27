import { Box, Button, Divider, Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Image, Input, Select, Spacer, Stack, Textarea, Wrap, useToast } from "@chakra-ui/react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import ContainerSection from "../../pages/components/ContainerSection"
import TitleText from "../texts/TitleText"
import { BASE_URL, VERTICAL_SPACING } from "../../utils/variables"
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
    const toast = useToast()
    const params = useParams()

    const [isLocalisationBusy, setIsLocalisationBusy] = useState<boolean>(false)
    const [addressData, setAddressData] = useState<any>(null)

    const { files,
        addFile,
        removeFile,
        deleteFile,
        clearFiles
    } = useFile(mutate)

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
            city: data?.city.id || '',
            district: data?.district.id || '',
            category: data?.category.id,
            description: data?.description,
            longitude: data?.longitude,
            latitude: data?.latitude,
            address: data?.address || '',
            files: []
        }
    })

    const onSubmitForm: SubmitHandler<Inputs> = async (data: any) => {
        try {
            console.log({
                title: data.title,
                category: `/api/place_categories/${data.category}`,
                description: data.description,
                longitude: addressData?.lon|| data.longitude,
                latitude: addressData?.lat || data.latitude,
                address: addressData?.display_name || data.address,
                city: '/api/city/' + data.city,
                district: '/api/district/' + data.district
            })

            const response: any = await apiFetch(`/place${isEditMode ? `/${params.id}` : ''}`, `${isEditMode ? 'patch' : 'post'}`, {
                title: data.title,
                category: `/api/place_categories/${data.category}`,
                description: data.description,
                longitude: addressData?.lon|| data.longitude,
                latitude: addressData?.lat || data.latitude,
                address: addressData?.display_name || data.address,
                city: '/api/city/' + data.city,
                district: '/api/district/' + data.district
            })
            if (response && files && Array.isArray(files) && files.length) {
                for (const file of data.files) {
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('place', `/api/place/${response.id}`);
                    await apiFetch('/images', 'post', formData);
                }
            }
            toast({
                description: `${isEditMode ? 'Lieu modifier' : 'Lieu créé'}`,
                status: 'success'
            })
            clearFiles()
            navigate(`/voyage/place/detail/${response.id}`)
        } catch (error: any) {
            toast({
                description: JSON.parse(error.message),
                status: 'error'
            })
        }
    }


    const handleSearchLocalisation = async () => {

        const address = getValues().address
        clearErrors('address')
        if (address.trim().length) {
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
        <Box py={VERTICAL_SPACING}>
            <Stack spacing={VERTICAL_SPACING} as="form" onSubmit={handleSubmit(onSubmitForm)}>
                <ContainerSection withPadding={true}>
                    <Stack>
                        <TitleText text={isEditMode ? "Modifier ce lieu" : "Nouveau lieu"} />
                        <Stack>
                            <FormControl isInvalid={errors.title ? true : false}>
                                <FormLabel>Titre</FormLabel>
                                <Input variant='filled' size="lg" {...register('title', noEmptyValidator)} type="text"
                                    placeholder="Donnez un titre à votre lieu ?"
                                />
                                {errors.title && <FormErrorMessage> {errors.title.message} </FormErrorMessage>}
                            </FormControl>
                            <FormControl isInvalid={errors.category ? true : false}>
                                <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Catégorie</FormLabel>
                                <Select variant={"filled"} size="lg" {...register('category', noEmptyValidator)}>
                                    <option value="">--selectionner une catégorie</option>
                                    {placeCategories.map((category: any) => {
                                        return (
                                            <option key={category.id} value={category.id}>{category.label}</option>
                                        )
                                    })
                                    }
                                </Select>
                                {errors.category && <FormErrorMessage> {errors.category.message} </FormErrorMessage>}
                            </FormControl>
                            <FormControl isInvalid={errors.address ? true : false}>
                                <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Adresse du lieu</FormLabel>
                                <Stack>
                                    <Controller
                                        control={control}
                                        name="address"
                                        rules={noEmptyValidator}
                                        render={({ field: { onChange, value } }) => (
                                            <>
                                                <Input
                                                    value={value}
                                                    onChange={onChange}
                                                    type="text"
                                                    onBlur={handleSearchLocalisation}
                                                    variant={"filled"} size="lg"
                                                    placeholder="Veuillez insérer une adresse"
                                                />
                                                {addressData || getValues()?.latitude ?
                                                    <Box h={{ base: 300, lg: 400 }} w="100%" position="relative">
                                                        <MapSimpleMarker
                                                            updateMarker={(event: { lat: number, lng: number }) => (
                                                                setValue('address', `${event.lat},${event.lng}`),
                                                                handleSearchLocalisation()
                                                            )}
                                                            displayMapMode={true}
                                                            displayMapType={true}
                                                            lat={addressData?.lat || getValues()?.latitude} lng={addressData?.lon || getValues()?.longitude} />
                                                    </Box>
                                                    : <></>}
                                            </>
                                        )}
                                    />
                                </Stack>
                                {errors.address && <FormErrorMessage> {errors.address.message} </FormErrorMessage>}
                            </FormControl>
                            <FormControl variant='filled' isInvalid={errors.district ? true : false}>
                                <FormLabel>Localisation</FormLabel>
                                <Controller
                                    control={control}
                                    name="district"
                                    rules={{
                                        validate: () => noEmptyLocalisationValidator(getValues().city.toString(), getValues().district.toString())
                                    }}
                                    render={({ field: { onChange } }) => (
                                        <CityDistrictSelectInput
                                            variant="filled"
                                            updateCity={(e: any) => setValue('city', e)}
                                            cityValue={getValues().city.toString()}
                                            updateDistrict={(e: any) => setValue('district', e)}
                                            districtValue={getValues().district.toString()}
                                        />
                                    )}
                                />
                                <FormErrorMessage> {errors.district ? errors.district.message : ''} </FormErrorMessage>
                                <FormControl isInvalid={errors.description ? true : false}>
                                    <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Description du lieu</FormLabel>
                                    <Textarea
                                        variant='filled'
                                        {...register('description', noEmptyValidator)}
                                        size="lg"
                                        rows={10} placeholder="Description de votre produit" />
                                    {errors.description && <FormErrorMessage>{errors.description.message}</FormErrorMessage>}
                                </FormControl>
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
                            <FormControl isInvalid={errors.files ? true : false}>
                                <Controller
                                    control={control}
                                    name="files"
                                    rules={{
                                        validate: () => noEmtyFileValidator(files.concat(data?.images || []))
                                    }}
                                    render={() => (
                                        <UpladButton onChange={(e: any) => addFile(e.target.files)}>
                                            <Button variant="outline" leftIcon={<CAMERA_ICON />}>Ajouter des photos</Button>
                                        </UpladButton>
                                    )}
                                />
                                {errors.files ? <FormErrorMessage> {errors.files.message} </FormErrorMessage> : <></>}
                            </FormControl>
                        </Stack>
                    </Stack>
                </ContainerSection>
                <Box py={3} bg="white" zIndex={10} position="sticky" bottom={0}>
                    <ContainerSection withPadding={true}>
                        <Flex>
                            <Spacer />
                            <Button isLoading={isSubmitting} type="submit" colorScheme="green">
                                {isEditMode ? "Modifier ce lieu" : " Créer ce lieu"}
                            </Button>
                        </Flex>
                    </ContainerSection>
                </Box>
            </Stack>
        </Box>
        // <Box py={VERTICAL_SPACING}>
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
        //                             {discussionCategories.map((category: any) => {
        //                                 return (
        //                                     <option key={category.id} value={category.id}>{category.label}</option>
        //                                 )
        //                             })
        //                             }
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
        //                     {
        //                         (isEditMode && data?.images.length) ? <FormControl>
        //                             <FormLabel>Images</FormLabel>
        //                             <Wrap mb={2}>
        //                                 {
        //                                     data.images.map((image: any, index: number) => {
        //                                         return (
        //                                             <FormImage
        //                                                 key={index}
        //                                                 imageUrl={BASE_URL + image.filePath}
        //                                                 onRemove={() => deleteFile(image.id)}
        //                                             />
        //                                         )
        //                                     })
        //                                 }
        //                             </Wrap>
        //                             <Divider />
        //                         </FormControl> : <></>
        //                     }

        //                     {
        //                         files.length ? <Wrap>
        //                             {
        //                                 files.map((image: any, index: number) => {
        //                                     return (
        //                                         <FormImage
        //                                             key={index}
        //                                             imageUrl={image.url}
        //                                             onRemove={() => removeFile(index)}
        //                                         />
        //                                     )
        //                                 })
        //                             }
        //                         </Wrap> : <></>
        //                     }
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
        // </Box>
    )
}

export default PlaceForm
