import React, { useEffect, useState } from "react"; // Import React from 'react'
import LoadingPage from "../../components/LoadingPage";
import { Box, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom"; // Import from "react-router-dom"
import PlaceCard from "../../components/card/PlaceCard";
import { VERTICAL_SPACING } from "../../utils/variables";
import { apiFetch } from "../../http-common/apiFetch";
import ContainerSection from "../components/ContainerSection";
import TravelLogueModal from "../../components/Modals/TravelLogueModal";

const TraveloguePage = () => {

    const [data, setData] = useState<Array<any>>([])

    const [isBusy, setIsBusy] = useState<boolean>(false)

    useEffect(()=>{
        onLoad()
    },[])

    const onLoad = async () => {
        try {
            setIsBusy(true)
            const response : any= await apiFetch("/saved_places", "get")
            setData(response)
        } catch (error) {
            console.log(error)
        }finally{
            setIsBusy(false)
        }
    }

    const getPlaceByCityid = (cityId: number) => {
        return (
            data.map((savedplace: any) => {
                return (
                    cityId === savedplace.place.city.id &&
                    <GridItem key={savedplace.id}>
                        <NavLink to={`/voyage/place/detail/${savedplace.place.id}`}>
                        <PlaceCard size="sm" place={savedplace.place} />
                        </NavLink>
                    </GridItem>
                )
            })
        );
    }

    useEffect(() => {
        getCities()
    }, [data]);

    const getCities = () => {
        return data.reduce((prev: any[], curr: any) => {
            const cityExists = prev.some((city) => city?.id === curr.place.city.id);
            if (!cityExists) {
                prev.push(curr.place.city);
            }
            return prev;
        }, []);
    }

     const getPlaces = () => {
        return data.reduce((prev: Array<any>, curr: any) => {
            prev.push(curr.place)
            return prev
        }, [])
    }

    return !isBusy ? (
        <Box py={VERTICAL_SPACING}>
            <ContainerSection withPadding={true}>
                <Stack spacing={VERTICAL_SPACING}>
                    {
                        data && data.length ? getCities().map((city: any) => {
                            return (
                                <Stack key={city.id}>
                                    <Text as="b" fontSize="lg"> {city.label} </Text>
                                    <Grid templateColumns={{
                                        base: "repeat(1, 1fr)",
                                        sm: "repeat(2, 1fr)",
                                        md: "repeat(3, 1fr)",
                                    }}
                                        gap={5}>
                                        {getPlaceByCityid(city.id)}
                                    </Grid>
                                </Stack>
                            )
                        }) : <Text> Aucun lieux enregistrés</Text>
                    }
                </Stack>
            </ContainerSection>
            { getPlaces().length ? <TravelLogueModal places={getPlaces()} /> : <></>}
        </Box>

    ) : <LoadingPage type={"page"}  />

}

export default TraveloguePage;
