
import { Box, Button, Divider, Grid, GridItem, Portal, Stack } from "@chakra-ui/react";

import TitlePageUx from "../../components/react-ux/TitlePageUx";
import DiscussionCard from "../../components/card/DiscussionCard";
import { Suspense, useEffect, useRef, useState } from "react";
import SelectInput from "../../components/inputs/SelectInput";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { filterDateOptions } from "../../utils/variables";
import LoadingPage from "../../components/LoadingPage";
import { usePagination } from "../../hooks/usePagination";
import SearchInput from "../../components/inputs/SearchInput";
import FilterDialog from "../../components/dialogs/FilterDialog";

const DiscussionList = () => {

    const { paginationData: discusisons,
        isReachedEnd,
        loadingMore,
        size,
        setSize,
        error,
        isLoading
    } = usePagination<any>('/discussions')


    if (error) return <p>Une erreur est survenue</p>

    if(!discusisons.length) return <p>Aucune discussion trouvé</p>

    if(isLoading) return <LoadingPage type="data" />

    const handleChangePage = () => {
        setSize(size + 1)
    }

    return (
        <>
            <Grid
                templateColumns={{
                    base: 'repeat(1, 1fr)',
                    md: 'repeat(2, 1fr)',
                    lg: 'repeat(3, 1fr)',
                }}
                gap={6}
            >
                {discusisons?.map((discussion: any) => (
                    <GridItem w="100%" key={discussion.id}>
                        <DiscussionCard discussion={discussion} />
                    </GridItem>
                ))}
            </Grid>
            {loadingMore && <LoadingPage type="data" />}
            {!isReachedEnd && (
                <Button onClick={handleChangePage} colorScheme="blue" >Plus de discussions</Button>
            )}
        </>
    );
};


const DiscussionFeed: React.FC<any> = () => {
    const [categorySearch, setCategorySearch] = useState<any>('')
    const [orderby, setOrderby] = useState<any>('')
    const [searchQuery, setSearchQuery] = useState<string>('')

    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const params: any = {};

        if (searchQuery) {
            params.q = searchQuery
        } else {
            searchParams.delete('q')
        }

        if (categorySearch) {
            params.category = categorySearch;
        } else {
            searchParams.delete('category');
            console.log('pas de car')
            setCategorySearch('')
        }

        if (orderby) {
            params.orderby = orderby;
        } else {
            searchParams.delete('orderby');
            setOrderby('')
        }

        setSearchParams(params)
    }, [categorySearch, orderby, searchQuery])


    const app = useSelector((state: any) => state.app)

    const handleFormElements : any = (elements: any) => {
        const cateogry = elements.category.value
        const orderByDate = elements.orderby.value
        setCategorySearch(cateogry)
        setOrderby(orderByDate)
    }

    const handleFormSearchElements : any = (elements: any) => {
        const search = elements.search?.value
        setSearchQuery(search)
    }


    return (
        <Box width="100%">
            <Stack spacing={5}>
                <Stack spacing={5}>
                    <TitlePageUx title="Espace discussion" />
                    <Stack direction="row" alignItems="center">
                        <Box flexGrow={1}>
                            <SearchInput value={searchQuery} handleFormElements={handleFormSearchElements} />
                        </Box>
                        <FilterDialog handleFormElements={handleFormElements}>
                            <SelectInput
                                datas={app.discussionCategories}
                                name="category"
                                emptyValueLabel="Tous"
                                value={categorySearch}
                                formLabel="Catégorie"
                            />
                            <SelectInput
                                name="orderby"
                                datas={filterDateOptions}
                                value={orderby}
                                formLabel="Date"
                            />
                        </FilterDialog>
                    </Stack>
                </Stack>
                <Divider borderBottomWidth={1.5} borderColor="var(--coreego-blue)" />
                <Suspense fallback={<LoadingPage type="data" />}>
                    <DiscussionList />
                </Suspense>
            </Stack>
        </Box>
    )

}

export default DiscussionFeed
