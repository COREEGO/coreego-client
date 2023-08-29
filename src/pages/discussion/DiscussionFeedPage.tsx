
import { Box, Divider, Grid, GridItem, Stack } from "@chakra-ui/react";

import TitlePageUx from "../../components/react-ux/TitlePageUx";
import useSWR, { mutate } from "swr";
import DiscussionCard from "../../components/card/DiscussionCard";
import { Suspense, useEffect, useState } from "react";
import SelectInput from "../../components/inputs/SelectInput";
import { useLocation } from "react-router";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { filterDateOptions } from "../../utils/variables";

const DiscussionList = () => {

    const location = useLocation();

    const { data: discussions, mutate, } = useSWR(`/discussions${!location.search ? '?order[createdAt]=desc' : ''}` + location.search, {
        suspense: true,
    });

    useEffect(() => {
        console.log(!location.search)
        mutate()
    }, [location])

    return (
        <Grid
            templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
            }}
            gap={6}
        >
            {discussions.map((discussion: any) => {
                return (
                    <GridItem w="100%" key={discussion.id}>
                        <DiscussionCard discussion={discussion} />
                    </GridItem>
                );
            })}
        </Grid>
    );
};


const DiscussionFeed: React.FC<any> = () => {
    const [categorySearch, setCategorySearch] = useState<any>('')
    const [orderDateSearch, setOrderDateSearch] = useState<any>('')

    let [searchParams, setSearchParams] = useSearchParams();

    const updateCategorySearch = (event: any) => {
        setCategorySearch(event)
    }
    const updateOrderDateSearch = (event: any) => {
        setOrderDateSearch(event)
    }

    useEffect(() => {
        const params: any = {};

        if (categorySearch !== '') {
            params.category = categorySearch;
        } else {
            searchParams.delete('category');
        }

        if (orderDateSearch !== '') {
            params['order[createdAt]'] = orderDateSearch;
        } else {
            searchParams.delete('order[createdAt]');
        }
        setSearchParams(params)
    }, [categorySearch, orderDateSearch])

    const app = useSelector((state: any) => state.app)

    return (
        <Box>
            <Stack spacing={5}>
                <Stack spacing={5}>
                    <TitlePageUx title="Espace discussion" />
                    <SelectInput
                        datas={app.discussionCategories}
                        emptyValueLabel="Tous"
                        value={categorySearch}
                        formLabel="Catégorie"
                        setValue={updateCategorySearch}
                    />
                    <SelectInput
                        datas={filterDateOptions}
                        value={orderDateSearch}
                        formLabel="Date"
                        setValue={updateOrderDateSearch}
                    />
                </Stack>
                <Divider borderBottomWidth={2} />
                <Suspense fallback={<p>loading</p>}>
                    <DiscussionList />
                </Suspense>
            </Stack>
        </Box>
    )

}

export default DiscussionFeed