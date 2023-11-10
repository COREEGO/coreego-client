import React, { Suspense, useEffect, useState } from "react"; // Import React from 'react'
import LoadingPage from "../../components/LoadingPage";
import { Box, Grid, GridItem, Menu, MenuButton, MenuItem, MenuList, Stack, Text, useToast } from "@chakra-ui/react";
import { TravelLogueProvider, useTravelLogueContext } from "../../contexts/TravelLogueProvider";
import { useAuthContext } from "../../contexts/AuthProvider";
import useSWR from "swr";
import { useParams } from "react-router-dom"; // Import from "react-router-dom"
import LocalisationText from "../../components/texts/LocalisationText";
import PlaceCard from "../../components/card/PlaceCard";
import { VERTICAL_SPACING } from "../../utils/variables";
import { MdMoreVert, MdRemoveRedEye, MdBorderColor, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom"; // Use Link instead of NavLink
import { apiFetch } from "../../http-common/apiFetch";
import ContainerSection from "../components/ContainerSection";
import TravelLogueModal from "../../components/Modals/TravelLogueModal";

const DetailMap = () => {
    return (
        <Box>
            <p>MAP OPEN</p>
        </Box>
    )
}

const Detail = () => {
    const { user } = useAuthContext();
    const { savedplaces, cities, places, mutate } = useTravelLogueContext();

    const toast = useToast();

    const onRemoveThis = async (savedplaceId: any) => {
        try {
            await apiFetch(`/saved_places/${savedplaceId}`, 'DELETE');
            toast({
                description: 'Lieu plus enregistré',
                status: 'success'
            });
            mutate()
        } catch (error) {
            toast({
                description: 'Une erreur est survenue',
                status: 'error'
            });
        }
    }

    const getPlaceByCityid = (cityId: number) => {
        return (
            savedplaces.map((savedplace: any) => {
                return (
                    cityId === savedplace.place.city.id &&
                    <GridItem key={savedplace.id}>
                        <PlaceCard size="sm" place={savedplace.place} />
                    </GridItem>
                )
            })
        );
    }

    return (
        <Box py={VERTICAL_SPACING}>
            <ContainerSection withPadding={true}>
                <Stack spacing={VERTICAL_SPACING}>
                    {
                        savedplaces && savedplaces.length ? cities.map((city: any) => {
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
            { places.length ? <TravelLogueModal places={places} /> : <></>}

        </Box>

    );
}

const TraveloguePage = () => {
    return (
        <Suspense fallback={<LoadingPage type="page" />}>
            <TravelLogueProvider>
                <Detail />
            </TravelLogueProvider>
        </Suspense>
    )
}

export default TraveloguePage;
