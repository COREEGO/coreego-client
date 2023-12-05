import React, { useEffect, useRef } from "react";
import LoadingPage from "../../components/LoadingPage";
import { usePagination } from "../../hooks/usePagination";
import DiscussionCard from "../../components/card/DiscussionCard";
import ProductCard from "../../components/card/ProductCard";
import PlaceCard from "../../components/card/PlaceCard";
import { Suspense } from "react";
import { NavLink } from "react-router-dom";
import { Grid, Stack } from "@mui/material";

interface FeedListInterface {
    url: string;
    noLengthLabel: string;
    buttonLabel: string;
    fetchData?: any,
    cardName: "discussion" | "product" | "place";
    breackpoints?: any
}

const FeedListGrid: React.FC<FeedListInterface> = ({
    url,
    noLengthLabel,
    buttonLabel,
    cardName,
    fetchData,
    breackpoints
}) => {

    // const {
    //     paginationData: datas,
    //     isReachedEnd,
    //     loadingMore,
    //     size,
    //     setSize,
    //     error,
    //     isLoading,
    // } = usePagination<any>(url);

    // if (error) return <p>Une erreur est survenue</p>;

    // if (!datas?.data?.length) return <p>{noLengthLabel}</p>;

    // if (isLoading) return <LoadingPage type="data" />;

    useEffect(()=>{
        console.log(fetchData)
    }, [fetchData])

    return (
        <Stack mt={5}>
            <Grid
                container
                spacing={3}
            >
                {fetchData?.data.map((data: any) => {
                    return (
                        <Grid item {...breackpoints} key={data.id}>
                            {cardName === "discussion" &&
                                <NavLink to={'/forum/discussion/detail/' + data.id}>
                                    <DiscussionCard size="xl" discussion={data} />
                                </NavLink>
                            }
                            {cardName === "product" &&
                                <NavLink to={'/market-place/product/detail/' + data.id}>
                                    <ProductCard size="xl" product={data} />
                                </NavLink>
                            }
                            {cardName === "place" &&
                                <NavLink to={'/voyage/place/detail/' + data.id}>
                                    <PlaceCard size="xl" place={data} />
                                </NavLink>
                            }
                        </Grid>
                    )
                }
                )}
            </Grid>
        </Stack >
    );
};

const FeedList: React.FC<FeedListInterface> = ({
    url,
    noLengthLabel,
    buttonLabel,
    cardName,
    fetchData,
    breackpoints = {}
}) => {
    return (
        <Suspense fallback={<LoadingPage type="data" />}>
            <FeedListGrid
                url={url}
                fetchData={fetchData}
                noLengthLabel={noLengthLabel}
                buttonLabel={buttonLabel}
                cardName={cardName}
                breackpoints={breackpoints}
            />
        </Suspense>
    );
};

export default FeedList;
