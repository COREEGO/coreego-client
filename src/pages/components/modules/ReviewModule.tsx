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

interface ReviewModuleInterface {
    placeId: number,
    mutate: Function,
    reviews: Array<any>,
}

type Inputs = {
    content: string,
    stars: number
}

const ReviewModule: React.FC<ReviewModuleInterface> = ({ placeId, mutate, reviews }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
    const { user }: any = useAuthContext();

    const reviewList: Array<any> = useMemo(() => {
        return reviews.sort((a: { created_at: Date }, b: { created_at: Date }) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
    }, [reviews]);

    const currentUserReview = useMemo(() => {
        return reviews.find((review: any) => review?.user?.id === user?.id);
    }, [reviews, isOpenForm, isOpen]);

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        mode: 'onTouched'
    });


    const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
        try {
            const response: any = await apiFetch('/review/new', 'post', {
                place_id: placeId,
                stars: data.stars,
                content: data.content,
            }, true);

            toast.success(response.message);
            setIsOpenForm(false);
            reset();
            mutate();
        } catch (error: any) {
            toast.error(error.message);
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
            <Button variant="outlined" onClick={() => setIsOpen(true)} > <StarsAverageIcon datas={reviews} /> </Button>
            <Drawer
                anchor="left"
                open={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <Box sx={{ width: 500, maxWidth: '100%' }}>
                    <AppBar position="sticky" sx={{ top: 0, backgroundColor: 'white' }}>
                        <Toolbar>
                            <Stack spacing={1} direction="row" sx={{ flexGrow: 1 }}>
                                <Typography color="black" variant="h6" component="div" >Rewiews</Typography>
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
                    <Container maxWidth="lg" sx={{ my: 2 }}>
                        {
                            reviewList.length ? <Stack>
                                {
                                    reviewList.map((review: any) => {
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
                </Box>
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
                                rules={{ ...minNumber(1), ...noEmptyValidator }}
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