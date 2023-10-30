import { Box, Button, Card, Text, CardBody, CardHeader, Flex, FormControl, FormErrorMessage, IconButton, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Stack, Textarea, useDisclosure, useToast } from "@chakra-ui/react"
import UserSniped from "../react-ux/UserSniped"
import { useAuthContext } from "../../contexts/AuthProvider"
import { MdMoreVert, MdBorderColor, MdDelete } from "react-icons/md"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { control } from "leaflet"
import { minLengthValidatior, minNumber, noEmptyValidator } from "../../utils/formValidation"
import StarsButton from "../buttons/StarsButton"
import { apiFetch } from "../../http-common/apiFetch"
import Stars from "./_Stars"


interface ReviewCardInterface {
    review: any,
    mutate: Function
}

type Inputs = {
    content: string,
    stars: number
}

const ReviewCard: React.FC<ReviewCardInterface> = ({ review, mutate }) => {

    const { user }: any = useAuthContext()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { register, control, handleSubmit, reset, formState: { errors, isSubmitting }
    } = useForm<Inputs>({ mode: 'onTouched' })

    const isReviewUser = user.id === review.user.id

    const toast = useToast()


    const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
        try {
            await apiFetch('/reviews/' + review.id, 'PATCH', {
                content: data.content,
                stars: data.stars
            })
            toast({
                description: "Commentaire modifié",
                status: 'success',
            })
            mutate()
            onClose()
        } catch (error: any) {
            toast({
                description: `${JSON.parse(error.message)}`,
                status: 'error',
            })
        }
    }

    const handleDeleteReview = async () => {
        try {
            const result = window.confirm('Supprimer ce commentaire ?')
            if (!result) return

            await apiFetch('/reviews/' + review.id, 'DELETE')
            toast({
                description: "Commentaire supprimé",
                status: 'success',
            })
            mutate()
        } catch (error: any) {
            toast({
                description: `${JSON.parse(error.message)}`,
                status: 'error',
            })
        }
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <Flex alignItems={"flex-start"}>
                        <UserSniped
                            avatar={review.user.avatar}
                            pseudo={review.user.pseudo}
                            publishDate={review.createdAt}
                        />
                        <Spacer />
                        {
                            isReviewUser &&
                            <Menu>
                                <MenuButton>
                                    <MdMoreVert />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={onOpen} icon={<MdBorderColor />}>Modifier</MenuItem>
                                    <MenuItem onClick={handleDeleteReview} icon={<MdDelete />}>Supprimer</MenuItem>
                                </MenuList>
                            </Menu>
                        }
                    </Flex>
                </CardHeader>
                <CardBody pt={0}>
                    <Stack>
                        <Stars star={review.stars} />
                        <Text whiteSpace="pre-line">{review.content}</Text>
                    </Stack>
                </CardBody>
            </Card>
            <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modifier votre commentaire</ModalHeader>
                    <ModalCloseButton />
                    <Stack spacing={0} as="form" onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <Stack>
                                <FormControl isInvalid={errors.stars ? true : false}>
                                    <Controller
                                        control={control}
                                        name="stars"
                                        rules={{...minNumber(1), ...noEmptyValidator}}
                                        render={({ field: { onChange, value = review.stars } }) => (
                                            <StarsButton onChange={onChange} value={value} />
                                        )}
                                    />
                                    {errors.stars && <FormErrorMessage>{errors.stars.message}</FormErrorMessage>}
                                </FormControl>
                                <FormControl isInvalid={errors.content ? true : false}>
                                    <Textarea
                                        defaultValue={review.content}
                                        required
                                        {...register('content', { ...noEmptyValidator })}
                                        placeholder="Ecrivez votre commentaire" rows={10} />
                                    {errors.content && <FormErrorMessage>{errors.content.message}</FormErrorMessage>}
                                </FormControl>
                            </Stack>
                        </ModalBody>
                        <ModalFooter>
                            <Button isLoading={isSubmitting} w="100%" colorScheme='blue' type="submit">
                                Modifier
                            </Button>
                        </ModalFooter>
                    </Stack>
                </ModalContent>
            </Modal>
        </>
    )

}

export default ReviewCard

function toast(arg0: { description: string; status: string }) {
    throw new Error("Function not implemented.")
}
