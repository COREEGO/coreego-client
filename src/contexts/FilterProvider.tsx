'use client'

import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { apiFetch } from '../http-common/apiFetch';
import { useSearchParams } from 'react-router-dom';



const FilterContext = createContext({
    search: '',
    setSearch: (text: string) => { },
    category: '',
    setCategory: (category: any) => { },
    orderBy: '',
    setOrderBy: (order: string) => {}
});

interface FilterProviderProp {
    children: ReactNode
}

export const FilterProvider: React.FC<FilterProviderProp> = ({ children }) => {

    const [search, setSearch] = useState<string>('')
    const [category, setCategory] = useState<any>('')
    const [orderBy, setOrderBy] = useState<string>('')

    const [searchParams, setSearchParams] = useSearchParams();



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
            params.orderBy = orderBy;
        } else {
            searchParams.delete("orderby");
            setOrderBy('');
        }
        setSearchParams(params);
    }, [search, category])


    return (
        <FilterContext.Provider value={{ search, setSearch, category, setCategory, orderBy, setOrderBy }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContext = () => useContext(FilterContext);
