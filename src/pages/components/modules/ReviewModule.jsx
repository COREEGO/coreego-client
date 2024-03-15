import { useAuthContext } from "../../../contexts/AuthProvider"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { minNumber, noEmptyValidator } from "../../../utils/formValidation"
import { apiFetch } from "../../../http-common/apiFetch"
import ReviewCard from "../../../components/card/ReviewCard"
import { findMatchingUser } from "../../../utils"
import StarsAverageIcon from "../../../components/icons/StarsAverageIcon"
import ReviewScoreCheckbox from "../../../components/inputs/ReviewScoreCheckbox"
import { useEffect, useMemo, useState } from "react"
import { AppBar, Box, Button, Container, Dialog, DialogContent, Drawer, FormControl, FormHelperText, IconButton, Rating, Stack, TextField, Toolbar, Typography } from "@mui/material"
import { CLOSE_ICON } from "../../../utils/icon"
import LoadingButton from "@mui/lab/LoadingButton"
import { toast } from "react-toastify"
import { useConfirm } from "material-ui-confirm";
import axios from "axios"
import { BEARER_HEADERS } from "../../../utils/variables"



const ReviewModule = ({ placeId, mutate, reviews }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenForm, setIsOpenForm] = useState(false);
    const { user } = useAuthContext();

    const reviewList= useMemo(() => {
        return reviews.sort((a, b) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
    }, [reviews]);

    const currentUserReview = useMemo(() => {
        return reviews.find((review) => review?.user?.id === user?.id);
    }, [reviews]);

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: 'onTouched'
    });


    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/reviews', {
                place_id: placeId,
                stars: data.stars,
                content: data.content,
            }, BEARER_HEADERS)

            toast.success(response.data.message);
            setIsOpenForm(false);
            reset();
            mutate();
        } catch (error) {
            toast.error(error?.data?.message);
        }
    };

    const handleScrollToReview = () => {
        const reviewElement = document.getElementById(`review-${currentUserReview.id}`);
        if (reviewElement) {
            reviewElement.scrollIntoView({ behavior: 'auto' });
        }
    }

    return (
        <>
            <Button sx={{width: 'fit-content'}} variant="outlined" onClick={() => setIsOpen(true)} > <StarsAverageIcon datas={reviews} /> </Button>
            <Drawer
                sx={{
                    '.MuiDrawer-paper':{
                        width: 500,
                        maxWidth: '100%'
                    }
                }}
                anchor="left"
                open={isOpen}
                onClose={() => setIsOpen(false)}
            >
                    <AppBar position="sticky" sx={{ top: 0, backgroundColor: 'white' }}>
                        <Toolbar>
                            <Stack spacing={1} direction="row" sx={{ flexGrow: 1 }}>
                                <Typography color="black" variant="h6" component="div" >Reviews</Typography>
                                {
                                    !currentUserReview ? <Button variant="contained" size="small" onClick={() => setIsOpenForm(true)}>Ajouter</Button> :
                                        <Button component="a" onClick={handleScrollToReview} variant="contained" size="small">Ma review</Button>
                                }

                            </Stack>
                            <IconButton
                                edge="end"
                                onClick={() => setIsOpen(false)}
                                aria-label="close"
                            >
                                <CLOSE_ICON />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Container sx={{ my: 2 }}>
                        {
                            reviewList.length ? <Stack>
                                {
                                    reviewList.map((review) => {
                                        return (
                                            <ReviewCard
                                                mutate={mutate}
                                                key={review.id} review={review}
                                            />
                                        )
                                    })
                                }
                            </Stack> : 'Aucun avis'
                        }
                    </Container>

            </Drawer>
            <Dialog
                open={isOpenForm}
            >
                <DialogContent>
                    <Stack sx={{ width: 500, maxWidth: '100%' }} component="form" onSubmit={handleSubmit(onSubmit)}>
                        <FormControl sx={{ mb: 1 }}>
                            <Controller
                                control={control}
                                name="stars"
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
                            <Button onClick={() => setIsOpenForm(false)}>
                                Annuler
                            </Button>
                        </Stack>
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    )

}

export default ReviewModule