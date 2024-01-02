import React, { useEffect, useRef } from "react";
import LoadingPage from "../../components/LoadingPage";
import { usePagination } from "../../hooks/usePagination";
import DiscussionCard from "../../components/card/DiscussionCard";
import ProductCard from "../../components/card/ProductCard";
import PlaceCard from "../../components/card/PlaceCard";
import { Suspense } from "react";
import { NavLink } from "react-router-dom";
import { Grid, Skeleton, Stack } from "@mui/material";
import PlaceMapCard from "../../components/card/PlaceMapCard";

interface FeedListInterface {
    noLengthLabel: string;
    fetchData?: any,
    cardName: "discussion" | "product" | "place" | "saved-places";
    breackpoints?: any,
}


const FeedList: React.FC<FeedListInterface> = ({
    noLengthLabel,
    cardName,
    fetchData,
    breackpoints = {}
}) => {

    if (!fetchData?.data.length) return <p> {noLengthLabel} </p>

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
                            {cardName === "saved-places" &&
                                    <PlaceMapCard place={data} />
                            }
                        </Grid>
                    )
                }
                )}
            </Grid>
        </Stack >
    );
};

export default FeedList;
