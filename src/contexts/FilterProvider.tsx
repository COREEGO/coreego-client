'use client'

import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { apiFetch } from '../http-common/apiFetch';
import { useLocation, useSearchParams } from 'react-router-dom';



const FilterContext = createContext({
    search: '',
    setSearch: (text: string) => { },
    category: '',
    setCategory: (category: any) => { },
    orderBy: '',
    setOrderBy: (order: string) => {},
    city: '',
    setCity: (city: any) => {}
});

interface FilterProviderProp {
    children: ReactNode
}

export const FilterProvider: React.FC<FilterProviderProp> = ({ children }) => {

    const location = useLocation()

    const [search, setSearch] = useState<string>('')
    const [category, setCategory] = useState<any>('')
    const [orderBy, setOrderBy] = useState<string>('')
    const [city, setCity] = useState<string>('')

    const [searchParams, setSearchParams] = useSearchParams();


    useEffect(() => {
        setSearch('')
        setCategory('')
        setOrderBy('')
    }, [location.pathname])

    useEffect(() => {
        const params: any = {}

        if (search) {
            params.q = search;
        } else {
            searchParams.delete("q");
            setSearch('')
        }
        if (category) {
            params.category = category
        } else {
            searchParams.delete("category");
            setCategory('')
        }
        if (orderBy) {
            params.orderby = orderBy;
        } else {
            searchParams.delete("orderby");
            setOrderBy('');
        }
        if(city){
            params.city = city
        }else{
            searchParams.delete("city");
            setCity('');
        }
        setSearchParams(params);
    }, [search, category, orderBy, city])


    return (
        <FilterContext.Provider value={{ search, setSearch, category, setCategory, orderBy, setOrderBy, city, setCity }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContext = () => useContext(FilterContext);
