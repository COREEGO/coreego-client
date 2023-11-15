import {Button, Stack, useDisclosure, useToast, FormControl, FormErrorMessage, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, FocusLock, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger } from "@chakra-ui/react"
import { useAuthContext } from "../../../contexts/AuthProvider"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { minNumber, noEmptyValidator } from "../../../utils/formValidation"
import { apiFetch } from "../../../http-common/apiFetch"
import ReviewCard from "../../../components/card/ReviewCard"
import { findMatchingUser } from "../../../utils"
import StarsAverageIcon from "../../../components/icons/StarsAverageIcon"
import ReviewScoreCheckbox from "../../../components/inputs/ReviewScoreCheckbox"

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

    const { isOpen: isOpenNew, onOpen: onOpenNew, onClose: onCloseNew } = useDisclosure()

    const { user } : any = useAuthContext()

    reviews = reviews.sort((a: { createdAt: Date }, b: { createdAt: Date }) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const currentValue = findMatchingUser(reviews, user)

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        mode: 'onTouched',
        defaultValues: {
            stars: currentValue ? currentValue.stars : 0,
            content: currentValue ? currentValue.content : ''
        }
    })


    const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
        try {
            if (!currentValue) {
                await apiFetch('/reviews', 'post', {
                    place: '/api/places/' + placeId,
                    stars: data.stars,
                    content: data.content
                })
                toast({
                    description: "Avis ajouté",
                    status: 'success',
                })
            } else {
                await apiFetch('/reviews/' + currentValue.id, 'PATCH', {
                    content: data.content,
                    stars: data.stars
                })
                toast({
                    description: "Commentaire modifié",
                    status: 'success',
                })
            }


            reset()
            mutate()
            onCloseNew()

        } catch (error: any) {
            toast({
                description: JSON.parse(error.message),
                status: 'error',
            })
        }
    }

    const handleClose = () => {
        reset()
        onClose()
    }

    const handleCloseNew = () => {
        onCloseNew()
        if (!currentValue) reset()
    }

    const onDelete = async (id: number) => {
        try {
            const result = window.confirm('Supprimer ce commentaire ?')
            if (!result) return

            await apiFetch('/reviews/' + id, 'DELETE')
            toast({
                description: "Commentaire supprimé",
                status: 'success',
            })
            mutate()
            reset()
        } catch (error: any) {
            toast({
                description: error.message,
                status: 'error',
            })
        }
    }


    return (
        <>
            <Button variant="outline" onClick={onOpen}> <StarsAverageIcon datas={reviews} /> </Button>
            <Modal isOpen={isOpen} onClose={handleClose} size="full" scrollBehavior={"inside"}>
                <ModalContent>
                    <ModalHeader>Avis</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {
                            reviews.length ? <Stack>
                                {
                                    reviews.map((review: any) => {
                                        return (
                                            <ReviewCard
                                                onDelete={(id:number) => onDelete(id)}
                                                key={review.id} review={review}
                                            />)
                                    })
                                }
                            </Stack> : 'Aucun avis'
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Popover
                            isOpen={isOpenNew}
                            onOpen={onOpenNew}
                            onClose={handleCloseNew}
                            placement='top'
                            closeOnBlur={false}
                        >
                            <PopoverTrigger>
                                <Button colorScheme="blue" w="100%">{currentValue ? 'Modifier mon avis' : 'Ajouter un avis'}</Button>
                            </PopoverTrigger>
                            <PopoverContent p={5}>
                                <FocusLock persistentFocus={false}>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
                                        <FormControl isInvalid={errors.stars ? true : false}>
                                            <Controller
                                                control={control}
                                                name="stars"
                                                rules={{ ...minNumber(1), ...noEmptyValidator }}
                                                render={({ field: { onChange, value } }) => (
                                                    <ReviewScoreCheckbox onChange={onChange} value={value} />
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
                                        <Button isLoading={isSubmitting} type="submit" colorScheme={"blue"}>{currentValue ? 'Modifier' : 'Ajouter'}</Button>
                                    </Stack>
                                </FocusLock>
                            </PopoverContent>
                        </Popover>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )

}

export default ReviewModule