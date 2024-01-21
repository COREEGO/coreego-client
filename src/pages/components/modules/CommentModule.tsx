import CommentCard from "../../../components/card/CommentCard"
import { useMemo } from "react"
import { apiFetch } from "../../../http-common/apiFetch"
import { SubmitHandler, useForm } from "react-hook-form"
import { noEmptyValidator } from "../../../utils/formValidation"
import { Box, FormControl, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField, Typography, InputLabel, FormHelperText } from "@mui/material"
import React from "react"
import LoadingButton from "@mui/lab/LoadingButton"
import { toast } from "react-toastify"


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


    const commentList: Array<any> = useMemo(() => {
        return comments.sort((a: { created_at: Date }, b: { created_at: Date }) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        })
    }, [comments])

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
            const response: any = await apiFetch('/comment/new', 'POST', {
                discussion_id: discussionId,
                place_id: placeId,
                content: data.content
            }, true)

            toast.success(response.message)

            reset()
            mutate()
            setOpen(false)

        } catch (error: any) {
            toast.success(error.message)
        }
    }



    return (
        <Box py={3} boxShadow={"0 -2px 1px lightblue"}>
            <Container maxWidth="lg">
                <Stack spacing={3} >
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography fontWeight="bold">Commentaires</Typography>
                        <Button variant="outlined" size="small" onClick={() => setOpen(true)}>Ajouter</Button>
                    </Stack>
                    {
                        commentList.length ? <Stack spacing={1}>
                            {
                                commentList.map((comment: any) => {
                                    return (
                                        <CommentCard mutate={mutate}
                                            key={comment.id} comment={comment} />
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
                    <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
                        <FormControl variant="standard" fullWidth sx={{ width: 500, maxWidth: '100%' }}>
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
                        <Stack direction="row" sx={{ mt: 3 }}>
                            <LoadingButton loading={isSubmitting} type="submit">Envoyer</LoadingButton>
                            <Button onClick={() => setOpen(false)}>
                                Annuler
                            </Button>
                        </Stack>
                    </Stack>
                </DialogContent>
            </Dialog>
        </Box>
    )

}

export default CommentModule