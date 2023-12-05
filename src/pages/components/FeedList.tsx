import React, { useEffect, useRef } from "react";
import LoadingPage from "../../components/LoadingPage";
import { usePagination } from "../../hooks/usePagination";
import DiscussionCard from "../../components/card/DiscussionCard";
import ProductCard from "../../components/card/ProductCard";
import PlaceCard from "../../components/card/PlaceCard";
import { Suspense } from "react";
import { NavLink } from "react-router-dom";
import { Grid, Skeleton, Stack } from "@mui/material";

interface FeedListInterface {
    url: string;
    noLengthLabel: string;
    buttonLabel: string;
    fetchData?: any,
    cardName: "discussion" | "product" | "place";
    breackpoints?: any,
    isLoading: boolean
}


const FeedList: React.FC<FeedListInterface> = ({
    url,
    noLengthLabel,
    buttonLabel,
    cardName,
    fetchData,
    isLoading,
    breackpoints = {}
}) => {

    return (
        <Stack mt={5}>
            {
                !isLoading ? <Grid
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
            </Grid> : <LoadingPage type="data" />
            }
        </Stack >
    );
};

export default FeedList;
