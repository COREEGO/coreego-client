import { useAuthContext } from "../../contexts/AuthProvider"
import { MdBorderColor, MdDelete, MdMoreVert } from "react-icons/md"
import { apiFetch } from "../../http-common/apiFetch"
import { SubmitHandler, useForm } from "react-hook-form"
import { noEmptyValidator } from "../../utils/formValidation"
import UserSniped from "../react-ux/UserSniped"
import { Card, CardContent, Menu, Stack, Box, IconButton, MenuList, MenuItem, Popover, Typography, DialogTitle, DialogContent, FormControl, TextField, FormHelperText, Button, Dialog } from "@mui/material"
import { MORE_OPTIONS } from "../../utils/icon"
import React, { useMemo, useState } from "react"
import PopupState, { bindTrigger, bindMenu, bindPopover } from 'material-ui-popup-state';
import { useConfirm } from "material-ui-confirm";
import { toast } from "react-toastify"
import LoadingButton from "@mui/lab/LoadingButton"
import { dateParse } from "../../utils"


interface CommentCardInterface {
    comment: any,
    mutate: Function
}

type Inputs = {
    content: string
}

const CommentCard: React.FC<CommentCardInterface> = ({ comment, mutate }) => {

    const confirm = useConfirm()

    const [open, setOpen] = useState<boolean>(false);

    const { register, handleSubmit, reset, formState: { errors, isSubmitting }
    } = useForm<Inputs>({
        mode: 'onTouched',
        defaultValues: {
            content: comment?.content
        }
    })

    const { user }: any = useAuthContext()

    const isCommentUser = useMemo(() => {
        return comment.user.id === user.id
    }, [comment])


    const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
        try {
            await apiFetch('/comment/edit/' + comment.id, 'put', {
                content: data.content
            }, true)
            toast.success("Commentaire modifié")
            setOpen(false)
            mutate()
        } catch (error: any) {
            toast.error(JSON.parse(error.message))
        }
    }

    const onDelete = async () => {
        confirm({
            description: "Supprimer le commentaire ?"
        }).then(async () => {
            await apiFetch('/comment/delete/' + comment.id, 'delete', null, true)
            toast.success("Commentaire supprimé")
            mutate()
        }).catch((error: any) => {
            toast.error(JSON.parse(error.message))
        })
    }

    return (
        <>
            <Card sx={{ width: '100%' }}>
                <CardContent>
                    <Stack spacing={1}>
                        <Stack alignItems={"flex-start"} direction="row" justifyContent="space-between">
                            <UserSniped
                                avatarSize={30}
                                avatar={comment.user.avatarPath}
                                pseudo={comment.user.pseudo}
                            />

                                <PopupState variant="popover" popupId="demo-popup-menu">
                                    {(popupState) => (
                                        <React.Fragment>
                                            <IconButton
                                                {...bindTrigger(popupState)}
                                                size="small"
                                                aria-label="account of current user"
                                                aria-controls="menu-options"
                                                aria-haspopup="true"
                                                color="inherit"
                                            >
                                                <MORE_OPTIONS />
                                            </IconButton>
                                            <Menu {...bindMenu(popupState)}>
                                                {isCommentUser
                                                    ? [
                                                        <MenuItem key="modifier" onClick={() => setOpen(true)}>
                                                            Modifier
                                                        </MenuItem>,
                                                        <MenuItem key="supprimer" onClick={onDelete}>
                                                            Supprimer
                                                        </MenuItem>
                                                    ]
                                                    : [
                                                        <MenuItem key="signaler" onClick={popupState.close}>
                                                            Signaler
                                                        </MenuItem>
                                                    ]
                                                }
                                            </Menu>
                                        </React.Fragment>
                                    )}
                                </PopupState>
                            </Stack>
                        <Typography sx={{ whiteSpace: 'pre-line' }} color="var(--grey-bold)"> {comment.content} </Typography>
                        <Typography variant="body2" textAlign="right"> {dateParse(comment.created_at)} </Typography>
                    </Stack>
                </CardContent>
            </Card>
            {
                isCommentUser && <Dialog
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
                                <LoadingButton loading={isSubmitting} type="submit">Modifier</LoadingButton>
                                <Button onClick={() => setOpen(false)}>
                                    Annuler
                                </Button>
                            </Stack>
                        </Stack>
                    </DialogContent>
                </Dialog>
            }

        </>
    )
}

export default CommentCard