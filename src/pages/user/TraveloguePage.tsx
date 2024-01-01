import { useEffect, useState } from "react"; // Import React from 'react'
import LoadingPage from "../../components/LoadingPage";
import { NavLink } from "react-router-dom"; // Import from "react-router-dom"
import PlaceCard from "../../components/card/PlaceCard";
import { apiFetch } from "../../http-common/apiFetch";
import TravelLogueModal from "../../components/Modals/TravelLogueModal";
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import TitleText from "../../components/texts/TitleText";
import { LOCALISATION_ICON, MARKER_ICON, MARKET_PLACE_ICON } from "../../utils/icon";

const TraveloguePage = () => {

    const [isBusy, setIsBusy] = useState<boolean>(true)

    const [cities, setCities] = useState<any[]>([]);
    const [places, setPlaces] = useState<any[]>([]);

    const [tabValue, setTabValue] = useState<string>('1');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: any = await apiFetch('/saved-places', 'get', null, true);
                if (response) {
                    setCities(() => {
                        const datas = response.reduce((acc: any[], curr: any) => {
                            const cityExists = acc.some((city) => city?.id === curr.place[0]?.city?.id);
                            if (!cityExists) {
                                acc.push(curr.place[0].city);
                            }
                            return acc;
                        }, []);
                        return datas
                    });
                    setPlaces(() => {
                        return response.reduce((acc: any[], curr: any) => {
                            acc.push(curr.place[0]);
                            return acc;
                        }, []);
                    });
                }
            } catch (error: any) {
                console.error(error.message); // Utilisez console.error pour les erreurs
            } finally {
                setIsBusy(false);
            }
        };
        fetchData();
    }, []);

    const getPlaceByCityid = (cityId: number) => {
        return (
            places.map((place: any) => {
                return (
                    cityId === place.city.id &&
                    <Grid item key={place.id} xs={12} sm={6} md={4} >
                        <NavLink to={`/voyage/place/detail/${place.id}`}>
                            <PlaceCard place={place} />
                        </NavLink>
                    </Grid>
                )
            })
        );
    }

    return isBusy ? <LoadingPage type={"page"} /> :
        <Box my={3}>
            <Container maxWidth="lg">
                <Stack spacing={2}>
                    <TitleText text={"Carnet de voyage"}  />
                    {
                        places.length ? (
                            <Box sx={{ width: '100%', typography: 'body1' }}>
                                <TabContext value={tabValue}>
                                    <Box sx={{ borderBottom: 1, zIndex: 10, backgroundColor: 'white', position: 'sticky', top: 57, borderColor: 'divider' }}>
                                        <TabList
                                        onChange={(_, newValue: string) => setTabValue(newValue)} aria-label="lab API tabs example">
                                            {
                                                cities.map((city: any, index: number) => {
                                                    return <Tab sx={{flexDirection: 'row'}} icon={<MARKER_ICON />} key={city.id} label={city.label} value={(index + 1).toString()} />
                                                })
                                            }
                                        </TabList>
                                    </Box>
                                    {
                                        cities.map((city: any, index:number) => {
                                            return <TabPanel sx={{pl: 0, pr:0}} key={city.id} value={(index + 1).toString()}>
                                                <Grid container gap={5}>
                                                    {getPlaceByCityid(city.id)}
                                                </Grid>
                                            </TabPanel>
                                        })
                                    }
                                </TabContext >
                            </Box>
                        )
                            : <Typography> Aucun lieux enregistrés</Typography>
                    }
                </Stack>
            </Container>
            {places.length ? <TravelLogueModal places={places} /> : <></>}
        </Box>
}


export default TraveloguePage
