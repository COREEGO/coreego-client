import { Box, Button, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightAddon, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Spacer, Stack, Textarea, Wrap, useToast } from "@chakra-ui/react"
import { useNavigate, useParams } from "react-router"
import useFile from "../../hooks/useFile"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import ContainerSection from "../../pages/components/ContainerSection"
import { BASE_URL, VERTICAL_SPACING } from "../../utils/variables"
import TitleText from "../texts/TitleText"
import { noEmptyLocalisationValidator, noEmptyValidator, noEmtyFileValidator } from "../../utils/formValidation"
import CityDistrictSelectInput from "../inputs/CityDistrictSelectInput"
import { useEffect } from "react"
import { CAMERA_ICON } from "../../utils/icon"
import UpladButton from "../buttons/UplaodButton"
import FormImage from "../images/FormImage"
import { apiFetch } from "../../http-common/apiFetch"

interface PropsInterface {
    isEditMode?: boolean
    data?: any,
    mutate?: Function
}

type Inputs = {
    title: string
    description: string
    price: number
    city: number | string
    district: number | string
    files: any[]
}

const ProductForm: React.FC<PropsInterface> = ({ isEditMode = false, data, mutate = null }) => {

    const navigate = useNavigate()
    const toast = useToast()
    const params = useParams()

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
        clearErrors,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        mode: 'onTouched',
        defaultValues: {
            title: data?.title,
            description: data?.description,
            city: data?.city.id || '',
            district: data?.district.id || '',
            price: data?.price || 1000,
            files: []
        }
    })

    const onSubmitForm: SubmitHandler<Inputs> = async (data: any) => {

        try {
            const response: any = await apiFetch(`/product${isEditMode ? `/${params.id}` : ''}`, `${isEditMode ? 'patch' : 'post'}`, {
                title: data.title,
                description: data.description,
                price: parseInt(data.price),
                city: 'api/cities/' + data.city,
                district: 'api/districts/' + data.district
            })
            if (response && data.files && Array.isArray(data.files) && data.files.length) {
                for (const file of data.files) {
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('product', `/api/product/${response.id}`);
                    await apiFetch('/images', 'post', formData);
                }
            }
            toast({
                description: `${isEditMode ? 'Produit modifier' : 'Produit créé'}`,
                status: 'success'
            })
            clearFiles()
            navigate(`/market-place/product/detail/${response.id}`)
        } catch (error: any) {
            console.log(error)
        }
    }

    useEffect(() => {
        setValue('files', files.map((file: any) => {
            return file.file
        }))
        console.log(getValues().files)
    }, [files])

    return (
        <Box py={VERTICAL_SPACING}>
            <Stack spacing={VERTICAL_SPACING} as="form" onSubmit={handleSubmit(onSubmitForm)}>
                <ContainerSection withPadding={true}>
                    <Stack>
                        <TitleText text={isEditMode ? "Modifier ce produit" : "Mettre en vente un produit"} />
                        <Stack>
                            <FormControl isInvalid={errors.title ? true : false}>
                                <FormLabel>Titre du produit</FormLabel>
                                <Input variant='filled' size="lg" {...register('title', noEmptyValidator)} type="text"
                                    placeholder="Donnez un titre à votre produit"
                                />
                                {errors.title && <FormErrorMessage> {errors.title.message} </FormErrorMessage>}
                            </FormControl>
                            <FormControl isInvalid={errors.description ? true : false}>
                                <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Description du produit</FormLabel>
                                <Textarea
                                    variant='filled'
                                    {...register('description', noEmptyValidator)}
                                    size="lg"
                                    rows={10} placeholder="Description de votre produit" />
                                {errors.description && <FormErrorMessage>{errors.description.message}</FormErrorMessage>}
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
                                            withCircle={true}
                                            variant="filled"
                                            showMap={true}
                                            updateCity={(e: any) => setValue('city', e)}
                                            cityValue={getValues().city.toString()}
                                            updateDistrict={(e: any) => setValue('district', e)}
                                            districtValue={getValues().district.toString()}
                                        />
                                    )}
                                />
                                <FormErrorMessage> {errors.district ? errors.district.message : ''} </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.price ? true : false}>
                                <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Prix du produit</FormLabel>
                                <Controller
                                    control={control}
                                    name="price"
                                    rules={noEmptyValidator}
                                    render={({ field: { onChange, value } }) => (
                                        <>
                                            <InputGroup size="lg">
                                                <NumberInput variant='filled' w="100%" min={0} defaultValue={1000} step={1000} value={value}
                                                    onChange={(e: any) => onChange(e < 0 ? 0 : e)}>
                                                    <NumberInputField />
                                                    <NumberInputStepper>
                                                        <NumberIncrementStepper />
                                                        <NumberDecrementStepper />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                                <InputRightAddon bg="white" children='₩' />
                                            </InputGroup>
                                        </>
                                    )}
                                />
                                {errors.price && <FormErrorMessage> {errors.price.message} </FormErrorMessage>}
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
                                {isEditMode ? "Modifier ce sujet" : " Créer ce sujet"}
                            </Button>
                        </Flex>
                    </ContainerSection>
                </Box>
            </Stack>
        </Box>
    )
}

export default ProductForm