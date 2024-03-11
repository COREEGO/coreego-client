import UserSniped from "../react-ux/UserSniped"
import { useAuthContext } from "../../contexts/AuthProvider"
import { Button, Card, CardContent, Dialog, DialogContent, FormControl, FormHelperText, IconButton, Menu, MenuItem, Rating, Stack, TextField, Typography } from "@mui/material"
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state"
import React, { useState } from "react"
import { MORE_OPTIONS_ICON} from "../../utils/icon"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { minNumber, noEmptyValidator } from "../../utils/formValidation"
import LoadingButton from "@mui/lab/LoadingButton"
import { apiFetch } from "../../http-common/apiFetch"
import { toast } from "react-toastify"
import { useConfirm } from "material-ui-confirm"


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

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const isReviewUser = user.id === review.user.id

    const confirm = useConfirm();

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        mode: 'onTouched',
        defaultValues: {
            content: review?.content,
            stars: review?.stars
        }
    });

    const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
        try {
            const response: any = await apiFetch(`/review/edit/${review.id}`, 'put' , {
                stars: data.stars,
                content: data.content,
            }, true);

            toast.success(response.message);
            setIsOpen(false);
            reset();
            mutate()
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const onDelete = async (id: number) => {
        try {
            await confirm({
                description: "Supprimer la review ?",
            });

            const response: any = await apiFetch(`/review/delete/${id}`, 'delete', null, true);

            if (response) {
                toast.success(response.message);
            }

            mutate();
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Card id={'review-'+ review.id}>
                <CardContent>
                    <Stack spacing={2}>
                        <Stack alignItems={"flex-start"} direction="row" justifyContent="space-between">
                            <UserSniped
                                avatar={review.user.avatarPath}
                                pseudo={review.user.pseudo}
                                publishDate={review.created_at}
                            />
                            <PopupState variant="popover" popupId="demo-popup-menu">
                                {(popupState) => (
                                    <>
                                        <IconButton
                                            {...bindTrigger(popupState)}
                                            size="small"
                                            aria-label="account of current user"
                                            aria-controls="menu-options"
                                            aria-haspopup="true"
                                            color="inherit"
                                        >
                                            <MORE_OPTIONS_ICON/>
                                        </IconButton>
                                        <Menu {...bindMenu(popupState)}>
                                            {isReviewUser
                                                ? [
                                                    <MenuItem key="modifier" onClick={() => setIsOpen(true)}>
                                                        Modifier
                                                    </MenuItem>,
                                                    <MenuItem key="supprimer" onClick={() => onDelete(review.id)}>
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
                                    </>
                                )}
                            </PopupState>
                        </Stack>
                        <Rating value={review.stars} readOnly />
                        <Typography sx={{ whiteSpace: 'pre-line' }}> {review.content} </Typography>
                    </Stack>
                </CardContent>
            </Card>
            <Dialog
                open={isOpen}
            >
                <DialogContent>
                    <Stack sx={{ width: 500, maxWidth: '100%' }} component="form" onSubmit={handleSubmit(onSubmit)}>
                        <FormControl sx={{ mb: 1 }}>
                            <Controller
                                control={control}
                                name="stars"
                                // rules={{ minNumber(1), ...noEmptyValidator }}
                                render={({ field: { onChange, value } }) => (
                                    <Rating onChange={onChange} value={Number(value)} sx={{ width: 'fit-content' }} name="size-large" size="large" />
                                )}
                            />
                            {errors.stars && <FormHelperText>{errors.stars.message}</FormHelperText>}
                        </FormControl>
                        <FormControl fullWidth variant="standard">
                            <TextField
                                {...register('content', { ...noEmptyValidator })}
                                error={errors.content ? true : false}
                                autoFocus
                                placeholder="Ecrivez votre commentaire..."
                                required
                                multiline
                                rows={10}
                            />
                            {errors.content && <FormHelperText id="component-error-text">{errors.content.message}</FormHelperText>}
                        </FormControl>
                        <Stack direction="row" sx={{ mt: 3 }}>
                            <LoadingButton loading={isSubmitting} type="submit">Envoyer</LoadingButton>
                            <Button onClick={() => setIsOpen(false)}>
                                Annuler
                            </Button>
                        </Stack>
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ReviewCard