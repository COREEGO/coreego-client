import { Container, Box, Text, Grid, GridItem, Stack, NumberInput, FormControl, FormErrorMessage, FormLabel, Input, Select, NumberDecrementStepper, NumberIncrementStepper, NumberInputStepper, NumberInputField, InputRightAddon, InputGroup, Button, useToast, Textarea, FormHelperText, CardHeader, Card, CardBody, InputLeftAddon } from "@chakra-ui/react"
import Title from "../../components/texts/Title"
import { CONTAINER_SIZE, VERTICAL_SPACING } from "../../utils/variables"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import UploadImageModule from "../components/modules/UploadImageModule"
import { apiFetch } from "../../http-common/apiFetch"
import { useNavigate } from "react-router"
import { wonToEuro } from "../../utils"
import { noEmptyValidator, noEmtyFileValidator } from "../../utils/formValidation"
import ContainerSection from "../components/ContainerSection"

type Inputs = {
    title: string
    city: number,
    description: string,
    price: number,
    files: Array<any>
}

const ProductCreatePage = () => {
    const navigate = useNavigate()
    const toast = useToast()

    const {
        control,
        register,
        handleSubmit,
        setError,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        mode: 'onTouched'
    })

    const { cities } = useSelector((state: any) => state.app);

    const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
        try {
            const response: any = await apiFetch('/products', 'post', {
                title: data.title,
                description: data.description,
                price: parseInt(data.price),
                city: 'api/cities/' + data.city
            })

            if (response && data.files && Array.isArray(data.files) && data.files.length) {
                for (const file of data.files) {
                    const formData = new FormData();
                    formData.append('file', file.file);
                    formData.append('product', response.id);
                    await apiFetch('/images', 'post', formData);
                }
            }

            toast({
                description: "Produit mis en vente",
                status: 'success',
            })

            navigate('/market-place/product/detail/' + response.id)

        } catch (error: any) {
            if ('violations' in JSON.parse(error.message)) {
                for (const violation of JSON.parse(error.message).violations) {
                    setError(violation.propertyPath, {
                        type: 'manual',
                        message: violation.message
                    })
                }
            }
        }
    }


    return (
        <Stack my={VERTICAL_SPACING}>
            <ContainerSection>
                <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader><Title text="Ajouter un produit" /></CardHeader>
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
                                    <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Nom du produit</FormLabel>
                                    <Input
                                        {...register('title', noEmptyValidator)}
                                        type="text" size="lg" placeholder="Nom du produit"
                                    />
                                    {errors.title && <FormErrorMessage> {errors.title.message} </FormErrorMessage>}
                                </FormControl>

                                <FormControl isInvalid={errors.city ? true : false}>
                                    <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Lieu de vente</FormLabel>
                                    <Select size="lg" {...register('city', noEmptyValidator)}>
                                        <option value="">--selectionner une ville</option>
                                        {cities.map((category: any) => {
                                            return (
                                                <option key={category.id} value={category.id}>{category.label}</option>
                                            )
                                        })
                                        }
                                    </Select>
                                    {errors.city && <FormErrorMessage> {errors.city.message} </FormErrorMessage>}
                                </FormControl>

                                <FormControl isInvalid={errors.price ? true : false}>
                                    <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Définir un prix</FormLabel>
                                    <Controller
                                        control={control}
                                        name="price"
                                        rules={noEmptyValidator}
                                        render={({ field: { onChange, value } }) => (
                                            <>
                                                <InputGroup size="lg">
                                                    <NumberInput w={200} maxW="100%" min={0} step={1000} defaultValue={0} value={value}
                                                        onChange={(e: any) => onChange(e < 0 ? 0 : e)}>
                                                        <NumberInputField />
                                                        <NumberInputStepper>
                                                            <NumberIncrementStepper />
                                                            <NumberDecrementStepper />
                                                        </NumberInputStepper>
                                                    </NumberInput>
                                                    <InputRightAddon bg="var(--coreego-blue)" color="white" children='₩' />
                                                </InputGroup>
                                                {value > 0 && <FormHelperText>~ {wonToEuro(value)} € </FormHelperText>}
                                            </>
                                        )}
                                    />
                                    {errors.price && <FormErrorMessage> {errors.price.message} </FormErrorMessage>}
                                </FormControl>

                                <FormControl isInvalid={errors.description ? true : false}>
                                    <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Description du produit</FormLabel>
                                    <Textarea
                                        {...register('description', {
                                            required: 'Cette valeur ne doit pas être vide',
                                            pattern: {
                                                value: /\S/,
                                                message: 'Cette valeur ne doit pas être vide'
                                            }
                                        })}
                                        size="lg"
                                        rows={10} placeholder="Description de votre produit" />
                                    {errors.description && <FormErrorMessage>{errors.description.message}</FormErrorMessage>}
                                </FormControl>
                                <Button isLoading={isSubmitting} w="fit-content" type="submit" className="btn_blue">Mettre en vente</Button>
                            </Stack>
                        </CardBody>
                    </Card>
                </Stack>
            </ContainerSection>
        </Stack>
    )
}

export default ProductCreatePage