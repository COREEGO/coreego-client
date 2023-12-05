import CommentCard from "../../../components/card/CommentCard"
import { useEffect, useState } from "react"
import { MdClose, MdOutlineAdd } from "react-icons/md"
import { apiFetch } from "../../../http-common/apiFetch"
import { CONTAINER_SIZE, VERTICAL_SPACING } from "../../../utils/variables"
import { useAuthContext } from "../../../contexts/AuthProvider"
import { SubmitHandler, useForm } from "react-hook-form"
import { noEmptyValidator } from "../../../utils/formValidation"
import ContainerSection from "../ContainerSection"
import { Box, FormControl, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField, Typography, InputLabel, FormHelperText } from "@mui/material"
import React from "react"


interface CommentModuleInterface {
    comments: Array<any>,
    discussionId?: any,
    placeId?: any,
    mutate: () => void
}

type Inputs = {
    content: string
}

const CommentModule: React.FC<CommentModuleInterface> = ({ comments, discussionId, placeId, mutate }) => {

    const [open, setOpen] = React.useState(false);


    comments = comments.sort((a: { createdAt: Date }, b: { createdAt: Date }) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        mode: 'onTouched'
    })

    const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
        try {
            await apiFetch('/comments', 'POST', {
                discussion: discussionId && 'api/discussion/' + discussionId,
                place: placeId && 'api/places/' + placeId,
                content: data.content
            })

            reset()
            mutate()

        } catch (error: any) {

        }
    }

    const onDelete = async (commentId: number) => {
        try {
            const result = window.confirm('Supprimer ce commentaire ?')
            if (!result) return

            await apiFetch('/comment/' + commentId, 'DELETE')

            mutate()
        } catch (error: any) {

        }
    }

    return (
        <Box py={3} boxShadow={"0 -2px 1px lightblue"}>
            <Container maxWidth="lg">
                <Stack spacing={VERTICAL_SPACING}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography fontWeight="bold">Commentaires</Typography>
                        <Button variant="outlined" size="small" onClick={() => setOpen(true)}>Ajouter</Button>
                    </Stack>
                    {
                        comments.length ? <Stack>
                            {
                                comments.map((comment: any) => {
                                    return (
                                        <p>{comment.title}</p>
                                        // <CommentCard mutate={mutate} onDelete={(id: number) => onDelete(id)}
                                        //     key={comment.id} comment={comment} />
                                    )
                                })
                            }
                        </Stack> : <></>
                    }
                </Stack>
            </Container>
            <Dialog
                open={open}
                maxWidth="md"
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Ajouter un commentaire</DialogTitle>
                <DialogContent>
                    <FormControl variant="standard" fullWidth sx={{width: 500, maxWidth: '100%'}}>
                        <TextField
                            error={errors.content ? true : false}
                            autoFocus
                            placeholder="Ecrivez votre commentaire..."
                            required
                            multiline
                            rows={10}
                            {...register('content', { ...noEmptyValidator })} />
                        {errors.content && <FormHelperText id="component-error-text">{errors.content.message}</FormHelperText>}
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Envoyer</Button>
                    <Button onClick={() => setOpen(false)}>
                        Annuler
                    </Button>
                </DialogActions>
            </Dialog>
            {/* <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Ajouter un commentaire</ModalHeader>
                    <ModalCloseButton />
                    <Stack spacing={0} as="form" onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <FormControl isInvalid={errors.content ? true : false}>
                                <Textarea
                                    required
                                    {...register('content', { ...noEmptyValidator })}
                                    placeholder="Ecrivez votre commentaire" rows={10} />
                                {errors.content && <FormErrorMessage>{errors.content.message}</FormErrorMessage>}
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button isLoading={isSubmitting} w="100%" colorScheme='blue' type="submit">
                                Ajouter
                            </Button>
                        </ModalFooter>
                    </Stack>
                </ModalContent>
            </Modal> */}
        </Box>
    )

}

export default CommentModule