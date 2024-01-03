import { VERTICAL_SPACING } from "../../utils/variables"
import { useParams } from "react-router"
import useSWR from "swr"
import { Suspense, useEffect } from "react"
import LoadingPage from "../../components/LoadingPage"
import { BsMessenger, BsXLg } from "react-icons/bs";
import ThumbSwiper from "../../components/swipers/ThumbSwiper"
import { NavLink } from "react-router-dom"
import TitleText from "../../components/texts/TitleText"
import KakaoMap from "../../components/maps/KakaoMap"
import UserSniped from "../../components/react-ux/UserSniped"
import LocalisationText from "../../components/texts/LocalisationText"
import PriceText from "../../components/texts/PriceText"
import ContainerSection from "../components/ContainerSection"
import SlideSwiper from "../../components/swipers/SlideSwiper"
import { belongsToAuth } from "../../utils"
import { EDIT_ICON } from "../../utils/icon"
import { useAuthContext } from "../../contexts/AuthProvider"
import { Box, Button, Container, Divider, Grid, Stack, Typography } from "@mui/material"

const Detail = () => {

    const params = useParams()
    const { user }: any = useAuthContext()
    const { data, error, mutate } = useSWR('/product/' + params.id, { suspense: true })

    useEffect(() => {
        if (data) mutate()
    }, [])

    if (error) console.error(error)

    return (
        <Box my={VERTICAL_SPACING}>
            <Container maxWidth="lg">
                <Box sx={{ width: { sm: 500, lg: '100%' }, m: 'auto', maxWidth: '100%' }}>
                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid sx={{width: '100%'}} item sm={12} lg={7}>
                            <Box sx={{ height: { xs: 300, lg: 500 } }}>
                                <ThumbSwiper images={data.images} />
                            </Box>
                        </Grid>
                        <Grid sx={{width: '100%'}} item sm={12} lg={5}>
                            <Stack spacing={3}>
                                {
                                    belongsToAuth(data.user.id, user?.id) ?
                                        <NavLink to={`/market-place/product/edit/${params.id}`}>
                                            <Button variant="outlined" startIcon={<EDIT_ICON />}>Modifier</Button>
                                        </NavLink>
                                        :
                                        <></>
                                }
                                <TitleText text={data.title} />
                                    <Typography sx={{whiteSpace: 'pre-line'}}> {data.description}</Typography>
                                <Divider />
                                <PriceText price={data.price} />
                                <Stack spacing={2}>
                                    <Divider />
                                    <UserSniped
                                        avatar={data.user.avatarPath}
                                        pseudo={data.user.pseudo}
                                        publishDate={data.created_at}
                                    />
                                    <Divider />
                                </Stack>
                                <Stack spacing={2}>
                                    <Typography component="span" variant="h6" sx={{fontWeight: 'bold'}}>Localisation :</Typography>
                                    <LocalisationText city={data.city} district={data.district} />
                                    <Box sx={{height: 200, width: '100%', maxWidth: '100%'}}>
                                        <KakaoMap
                                            lat={data.district.latitude}
                                            lng={data.district.longitude}
                                            withCircle={true}
                                        />
                                    </Box>
                                </Stack>
                                {
                                    !belongsToAuth(data.user.id, user?.id) ?
                                    <Box sx={{ zIndex: 10, py:2, position: 'sticky', bottom: 0, bgcolor: 'white'}} >
                                        <Button fullWidth variant="contained" startIcon={<BsMessenger />}>Contacter le vendeur</Button>
                                    </Box> : <></>
                                }
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    )
}

const ProductDetail = () => {

    return (
        <Suspense fallback={<LoadingPage type="page" />}>
            <Detail />
        </Suspense>
    )
}

export default ProductDetail