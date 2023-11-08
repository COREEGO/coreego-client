import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr'; // Import KeyedMutator
import { apiFetch } from '../http-common/apiFetch';
import { useToast } from '@chakra-ui/react';


interface PropsInterface {
    children: ReactNode;
}

interface TravelLogueContextType { // Define the correct context type
    savedplaces: any[];
    cities: any[];
    places: any[];
    mutate: Function;
    handleRemove: Function
}

const TravelLogueContext = createContext<TravelLogueContextType>({ // Provide the context type as a generic parameter
    savedplaces: [],
    cities: [],
    places: [],
    mutate: () => { },
    handleRemove: (savedplaceId: number) => {}
});

export const TravelLogueProvider: React.FC<PropsInterface> = ({ children }) => {
    const toast = useToast()

    const { data, error, mutate } = useSWR("/saved_places", { suspense: true });

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

    const handleRemove = async (savedplaceId: number) => {
        try {
            await apiFetch(`/saved_places/${savedplaceId}`, 'DELETE');
            toast({
                description: 'Lieu plus enregistré',
                status: 'success'
            });
            mutate()
        } catch (error:any) {
            toast({
                description: error.message,
                status: 'error'
            });
        }
    }

    return (
        <TravelLogueContext.Provider
            value={{
                savedplaces: data,
                places: getPlaces(),
                cities: getCities(),
                mutate,
                handleRemove
            }}
        >
            {children}
        </TravelLogueContext.Provider>
    );
};

export const useTravelLogueContext = () => useContext(TravelLogueContext);
