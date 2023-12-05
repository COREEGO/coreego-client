import { useLocation } from "react-router";
import useSWRInfinite from "swr/infinite";
import {useEffect, useState} from 'react'
import { useSearchParams } from "react-router-dom";
import { useFilterContext } from "../contexts/FilterProvider";



export const usePagination = <T>(url: string) => {

    const location = useLocation();

    const getKey = (pageIndex: number, previousPageData: T[]) => {
        pageIndex = pageIndex + 1
        let searchParams = location.search;

        if(previousPageData && !previousPageData.length) return null
        return `${url}${searchParams}${(searchParams ? '&' : '?' ) + 'page='+pageIndex }`;
    }

    const { data, size, setSize, mutate, isLoading, error } = useSWRInfinite(getKey, { suspense: true });

    const paginationData: any = data?.flat();

    const loadingMore = data && typeof data[size - 1] === 'undefined';

    const isReachedEnd = data && data[data.length - 1]?.length < 20;


    return {
        paginationData,
        isReachedEnd,
        loadingMore,
        size,
        setSize,
        mutate,
        isLoading,
        error
    }

}