import { Box, Button, Container, Stack, useDisclosure, useToast, Text, FormControl, FormErrorMessage, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from "@chakra-ui/react"
import { useAuthContext } from "../../../contexts/AuthProvider"
import { Controller, ControllerFieldState, ControllerRenderProps, FieldValues, SubmitHandler, UseFormStateReturn, useForm } from "react-hook-form"
import { CONTAINER_SIZE, VERTICAL_SPACING } from "../../../utils/variables"
import { minLengthValidatior, minNumber, noEmptyValidator } from "../../../utils/formValidation"
import { apiFetch } from "../../../http-common/apiFetch"
import StarsButton from "../../../components/buttons/StarsButton"
import { ReactElement, JSXElementConstructor } from "react"
import ReviewCard from "../../../components/card/ReviewCard"
import ContainerSection from "../ContainerSection"

interface ReviewModuleInterface {
    placeId: number,
    mutate: Function,
    reviews: Array<any>
}

type Inputs = {
    content: string,
    stars: number
}

const ReviewModule: React.FC<ReviewModuleInterface> = ({ placeId, mutate, reviews }) => {

    const toast = useToast()

    const { isOpen, onOpen, onClose } = useDisclosure()


    reviews = reviews.sort((a: { createdAt: Date }, b: { createdAt: Date }) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        mode: 'onTouched'
    })

    const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
        try {
            await apiFetch('/reviews', 'post', {
                place: '/api/places/' + placeId,
                stars: data.stars,
                content: data.content
            })

            toast({
                description: "Avis ajouté",
                status: 'success',
            })

            reset()
            mutate()
            onClose()

        } catch (error: any) {
            toast({
                description: JSON.parse(error.message),
                status: 'error',
            })
        }
    }

    return (
        <Box py={VERTICAL_SPACING} boxShadow={"0 -2px 1px lightblue"}>
            <ContainerSection withPadding={true}>
                <Stack spacing={VERTICAL_SPACING}>
                    <Stack direction="row" alignItems="center">
                        <Text as="b">Avis</Text>
                        <Button size="sm" colorScheme="twitter" onClick={onOpen}>Ajouter</Button>
                    </Stack>
                    {
                        reviews.length && <Stack>
                            {
                                reviews.map((review: any) => {
                                    return (
                                        <ReviewCard key={review.id} review={review} mutate={() => mutate()} />)
                                })
                            }
                        </Stack>
                    }
                </Stack>
            </ContainerSection>
            <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Votre avis sur ce lieu</ModalHeader>
                    <ModalCloseButton />
                    <Stack spacing={0} as="form" onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <Stack>
                                <FormControl isInvalid={errors.stars ? true : false}>
                                    <Controller
                                        control={control}
                                        name="stars"
                                        rules={{ ...minNumber(1), ...noEmptyValidator }}
                                        render={({ field: { onChange, value } }) => (
                                            <StarsButton onChange={onChange} value={value} />
                                        )}
                                    />
                                    {errors.stars && <FormErrorMessage>{errors.stars.message}</FormErrorMessage>}
                                </FormControl>
                                <FormControl isInvalid={errors.content ? true : false}>
                                    <Textarea
                                        required
                                        {...register('content', { ...noEmptyValidator })}
                                        placeholder="Ecrivez votre commentaire" rows={10} />
                                    {errors.content && <FormErrorMessage>{errors.content.message}</FormErrorMessage>}
                                </FormControl>
                            </Stack>
                        </ModalBody>
                        <ModalFooter>
                            <Button isLoading={isSubmitting} w="100%" colorScheme='blue' type="submit">
                                Ajouter
                            </Button>
                        </ModalFooter>
                    </Stack>
                </ModalContent>
            </Modal>
        </Box>
    )

}

export default ReviewModule