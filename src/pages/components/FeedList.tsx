import React from "react";
import { Button, Grid, GridItem, Stack } from "@chakra-ui/react";
import LoadingPage from "../../components/LoadingPage";
import { usePagination } from "../../hooks/usePagination";
import DiscussionCard from "../../components/card/DiscussionCard";
import ProductCard from "../../components/card/ProductCard";
import PlaceCard from "../../components/card/PlaceCard";
import { Suspense } from "react";
import { NavLink } from "react-router-dom";

interface FeedListInterface {
    url: string;
    noLengthLabel: string;
    buttonLabel: string;
    cardName: "discussion" | "product" | "place";
}

const FeedListGrid: React.FC<FeedListInterface> = ({
    url,
    noLengthLabel,
    buttonLabel,
    cardName,
}) => {
    const {
        paginationData,
        isReachedEnd,
        loadingMore,
        size,
        setSize,
        error,
        isLoading,
    } = usePagination<any>(url);

    if (error) return <p>Une erreur est survenue</p>;

    if (!paginationData.length) return <p>{noLengthLabel}</p>;

    const datas = paginationData.sort((a: { createdAt: Date }, b: { createdAt: Date }) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    if (isLoading) return <LoadingPage type="data" />;

    return (
        <Stack>
            <Grid
                templateColumns={{
                    base: "repeat(1, 1fr)",
                    sm: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                }}
                gap={4}
            >
                {datas?.map((data: any) => (
                    <GridItem w="100%" key={data.id}>
                        {cardName === "discussion" &&
                            <NavLink to={'/discussions/detail/' + data.id}>
                                <DiscussionCard discussion={data} mode="feed" />
                            </NavLink>
                        }
                        {cardName === "product" &&
                            <NavLink to={'/market-place/product/detail/' + data.id}>
                                <ProductCard mode="feed" product={data} />
                            </NavLink>
                        }
                        {cardName === "place" &&
                            <NavLink to={'/voyage/place/detail/' + data.id}>
                                <PlaceCard mode="feed" place={data} />
                            </NavLink>
                        }
                    </GridItem>
                ))}
            </Grid>
            {loadingMore && <LoadingPage type="data" />}
            {!isReachedEnd && (
                <Button onClick={() => setSize(size + 1)} className="btn_blue">
                    {buttonLabel}
                </Button>
            )}
        </Stack>
    );
};

const FeedList: React.FC<FeedListInterface> = ({
    url,
    noLengthLabel,
    buttonLabel,
    cardName,
}) => {
    return (
        <Suspense fallback={<LoadingPage type="page" />}>
            <FeedListGrid
                url={url}
                noLengthLabel={noLengthLabel}
                buttonLabel={buttonLabel}
                cardName={cardName}
            />
        </Suspense>
    );
};

export default FeedList;
