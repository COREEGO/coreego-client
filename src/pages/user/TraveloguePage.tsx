import { useEffect, useState } from "react"; // Import React from 'react'
import LoadingPage from "../../components/LoadingPage";
import { useLocation } from "react-router-dom"; // Import from "react-router-dom"
import TravelLogueModal from "../../components/Modals/TravelLogueModal";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import HEADER_IMG from '../../images/headers/espace-discussion.jpg'
import PlaceMapCard from "../../components/card/PlaceMapCard";
import { useFilterContext } from "../../contexts/FilterProvider";
import { apiFetch } from "../../http-common/apiFetch";

const TraveloguePage = () => {

    const [isBusy, setIsBusy] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [cities, setCities] = useState<any[]>([]);
    const [places, setPlaces] = useState<any[]>([]);

    const { updateFilter, searchParams } = useFilterContext();
    const location = useLocation();

    async function reloadData() {
        try {
            setIsLoading(true)
            const response: any = await apiFetch(`/saved-places${location.search}`, 'get', null, true);
            if (response) {
                setPlaces(() => {
                    const datas = response.map((place: any) => {
                        return { ...place.place }
                    });
                    return datas
                })
            }
        } catch (error: any) {
            console.error(error.message.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        reloadData()
    }, [location.search])

    useEffect(() => {
        async function load() {
            try {
                const response: any = await apiFetch('/saved-places', 'get', null, true);
                if (response) {
                    setPlaces(() => {
                        const datas = response.map((place: any) => {
                            return { ...place.place }
                        });
                        console.log(datas)
                        return datas
                    })
                    setCities(() => {
                        const datas = response.reduce((acc: any[], curr: any) => {
                            const cityExists = acc.some((city) => city?.id === curr.place?.city?.id);
                            if (!cityExists) {
                                acc.push(curr.place.city);
                            }
                            return acc;
                        }, []);
                        return datas
                    });
                }
            } catch (error: any) {
                console.error(error.message)
            } finally {
                setIsBusy(false)
            }
        }
        load()
    }, [])


    return isBusy ? <LoadingPage type={"page"} /> : <>
        <Box
            sx={{
                backgroundImage: `url(${HEADER_IMG})`,
                height: { xs: 150, md: 300 }, backgroundPosition: 'bottom', position: 'relative', backgroundSize: 'cover'
            }}>
        </Box>

        <Stack my={5}>

            <Container maxWidth="lg">
                <>
                {
                    !places.length && <Typography>Aucun lieu</Typography>
                }
                {
                    !isLoading ? <Grid container spacing={3}>
                        {
                            places.map((place: any) => {
                                return <Grid key={place.id} item xs={12} sm={6} md={4}>
                                    <PlaceMapCard place={place} />
                                </Grid>
                            })
                        }

                    </Grid> : <Box my={5}><LoadingPage type="data" /></Box>
                }
                </>
            </Container>
        </Stack>
        {places.length ? <TravelLogueModal places={places} /> : <></>}
    </>

}


export default TraveloguePage
