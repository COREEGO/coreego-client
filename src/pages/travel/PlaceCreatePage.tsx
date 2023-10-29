import { Card, CardBody, CardHeader, FormControl, FormLabel, Text, Stack, useToast, FormErrorMessage, Input, Select, Box, CardFooter, Button, Textarea } from "@chakra-ui/react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import Title from "../../components/texts/Title"
import { VERTICAL_SPACING } from "../../utils/variables"
import ContainerSection from "../components/ContainerSection"
import { noEmptyValidator, noEmtyFileValidator } from "../../utils/formValidation"
import UploadImageModule from "../components/modules/UploadImageModule"
import { useState } from "react"
import MapMarker from "../../components/maps/MapSimpleMarker"
import { apiFetch } from "../../http-common/apiFetch"
import axios from "axios"
import LoadingPage from "../../components/LoadingPage"

type Inputs = {
    title: string
    city: number,
    category: number,
    description: string,
    x: string,
    y: string,
    address: string,
    files: Array<any>
}

const PlaceCreatePage = () => {

    const navigate = useNavigate()
    const toast = useToast()

    const [localisation, setLocalisation] = useState<any>(null)
    const [isLocalisationBusy, setIsLocalisationBusy] = useState<boolean>(false)

    const {
        control,
        register,
        handleSubmit,
        setError,
        clearErrors,
        getValues,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        mode: 'onTouched'
    })

    const { cities, placeCategories } = useSelector((state: any) => state.app);

    const handleSearchLocalisation = async (address: any) => {
        const currentAddress = getValues().address

        setValue('address', address)

        if (currentAddress !== address) {
            if (address) {
                try {
                    setIsLocalisationBusy(true)
                    const response: any = await axios.get(`https://nominatim.openstreetmap.org/search?q=${address}&format=json&limit=1`)
                    if (response && 'data' in response && response.data.length) {
                        console.log(response)
                        if (response.data[0].display_name.includes('South Korea')) {
                            setLocalisation(response.data[0])
                            clearErrors("address")
                        } else {
                            setError('address', {
                                type: 'manual',
                                message: "L'adresse doit être en Corée Du Sud"
                            })
                            setLocalisation(null)
                        }
                    } else {
                        setError('address', {
                            type: 'manual',
                            message: "Aucun lieu trouvé"
                        })
                        setLocalisation(null)
                    }
                } catch (error: any) {
                    console.error(error)
                } finally {
                    setIsLocalisationBusy(false)
                }
            } else {
                setLocalisation(null)
            }
        }
    }

    const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
        try {
            const response: any = await apiFetch('/places', 'post', {
                category: 'api/place_categories/' + data.category,
                city: 'api/cities/' + data.city,
                title: data.title,
                x: localisation.lat,
                y: localisation.lon,
                address: localisation.display_name,
                description: data.description,
            })
            if (response && data.files && Array.isArray(data.files) && data.files.length) {
                for (const file of data.files) {
                    const formData = new FormData();
                    formData.append('file', file.file);
                    formData.append('place', response.id);
                    await apiFetch('/images', 'post', formData);
                }
            }
            toast({
                description: "Discussion crée",
                status: 'success',
            })
            navigate('/voyage/place/detail/' + response.id)
        } catch (error: any) {
            toast({
                description: error.message,
                status: 'error',
            })
        }
    }

    return (
        <Stack my={VERTICAL_SPACING}>
            <ContainerSection>
                <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader><Title text="Ajouter un lieu" /></CardHeader>
                        <CardBody>
                            <Stack>
                                <FormControl>
                                    <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Ajouter des photos</FormLabel>
                                    <Controller
                                        control={control}
                                        name="files"
                                        rules={{
                                            validate: () => noEmtyFileValidator(getValues().files)
                                        }}
                                        render={({ field: { onChange } }) => (
                                            <UploadImageModule onChange={(files: Array<any>) => onChange(files)} />
                                        )}
                                    />
                                    {errors.files && <Text fontSize="sm" color="red" mt={2}> {errors.files.message} </Text>}
                                </FormControl>

                                <FormControl isInvalid={errors.title ? true : false}>
                                    <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Nom du lieu</FormLabel>
                                    <Input
                                        {...register('title', noEmptyValidator)}
                                        type="text" size="lg" placeholder="Nom du lieu"
                                    />
                                    {errors.title && <FormErrorMessage> {errors.title.message} </FormErrorMessage>}
                                </FormControl>

                                <Stack direction={{ base: 'column', sm: 'row' }}>
                                    <FormControl isInvalid={errors.city ? true : false}>
                                        <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Ville</FormLabel>
                                        <Select size="lg" {...register('city', noEmptyValidator)}>
                                            <option value="">--selectionner une ville--</option>
                                            {cities.map((category: any) => {
                                                return (
                                                    <option key={category.id} value={category.id}>{category.label}</option>
                                                )
                                            })
                                            }
                                        </Select>
                                        {errors.city && <FormErrorMessage> {errors.city.message} </FormErrorMessage>}
                                    </FormControl>
                                    <FormControl isInvalid={errors.city ? true : false}>
                                        <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Type de lieu</FormLabel>
                                        <Select size="lg" {...register('category', noEmptyValidator)}>
                                            <option value="">--selectionner une catégorie</option>
                                            {placeCategories.map((category: any) => {
                                                return (
                                                    <option key={category.id} value={category.id}>{category.label}</option>
                                                )
                                            })
                                            }
                                        </Select>
                                        {errors.city && <FormErrorMessage> {errors.city.message} </FormErrorMessage>}
                                    </FormControl>
                                </Stack>
                                <FormControl isInvalid={errors.address ? true : false}>
                                    <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Adresse du lieu</FormLabel>
                                    <Stack>
                                        <Controller
                                            control={control}
                                            name="address"
                                            rules={noEmptyValidator}
                                            render={({ field: { onChange } }) => (
                                                <Input
                                                    type="text" onBlur={(e: any) => handleSearchLocalisation(e.target.value.trim())} size="lg" placeholder="Veuillez insérer une adresse"
                                                />
                                            )}
                                        />
                                        {/* {isLocalisationBusy ? (<LoadingPage type="data" />) :
                                            (localisation && (<MapMarker data={localisation} />))} */}
                                    </Stack>
                                    {errors.address && <FormErrorMessage> {errors.address.message} </FormErrorMessage>}
                                </FormControl>
                                <FormControl isInvalid={errors.description ? true : false}>
                                    <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Description du lieu</FormLabel>
                                    <Textarea
                                        {...register('description', noEmptyValidator)}
                                        size="lg"
                                        rows={10}  placeholder="Description du lieu" />
                                    {errors.description && <FormErrorMessage>{errors.description.message}</FormErrorMessage>}
                                </FormControl>
                            </Stack>
                        </CardBody>
                        <CardFooter>
                            <Button w="fit-content" isLoading={isSubmitting} type="submit" colorScheme="blue">Ajouter ce lieu</Button>
                        </CardFooter>
                    </Card>
                </Stack>
            </ContainerSection >
        </Stack >
    )
}

export default PlaceCreatePage