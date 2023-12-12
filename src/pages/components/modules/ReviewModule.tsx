import { useAuthContext } from "../../../contexts/AuthProvider"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { minNumber, noEmptyValidator } from "../../../utils/formValidation"
import { apiFetch } from "../../../http-common/apiFetch"
import ReviewCard from "../../../components/card/ReviewCard"
import { findMatchingUser } from "../../../utils"
import StarsAverageIcon from "../../../components/icons/StarsAverageIcon"
import ReviewScoreCheckbox from "../../../components/inputs/ReviewScoreCheckbox"
import { useEffect } from "react"
import { Button } from "@mui/material"

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

            } else {
                await apiFetch('/reviews/' + currentValue.id, 'PATCH', {
                    content: data.content,
                    stars: data.stars
                })

            }


            reset()
            mutate()

        } catch (error: any) {

        }
    }

    const handleClose = () => {
        reset()

    }

    const handleCloseNew = () => {
          if (!currentValue) reset()
    }

    const onDelete = async (id: number) => {
        try {
            const result = window.confirm('Supprimer ce commentaire ?')
            if (!result) return

            await apiFetch('/reviews/' + id, 'DELETE')

            mutate()
            reset()
        } catch (error: any) {

        }
    }


    return (
        <>
            <Button variant="outlined" > <StarsAverageIcon datas={reviews} /> </Button>
            {/* <Modal isOpen={isOpen} onClose={handleClose} size="full" scrollBehavior={"inside"}>
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
                                                defaultValue={currentValue?.content}
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
            </Modal> */}
        </>
    )

}

export default ReviewModule