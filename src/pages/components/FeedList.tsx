import { Button, Grid, GridItem } from "@chakra-ui/react";
import LoadingPage from "../../components/LoadingPage";
import { usePagination } from "../../hooks/usePagination";
import DiscussionCard from "../../components/card/DiscussionCard";
import ProductCard from "../../components/card/ProductCard";
import PlaceCard from "../../components/card/PlaceCard";

interface FeedListInterface{
    url: string,
    noLengthLabel: string,
    buttonLabel: string,
    cardName: 'discussion' | 'product' | 'place'
}

const FeedList : React.FC<FeedListInterface> = ({url, noLengthLabel, buttonLabel, cardName}) => {

    const {
        paginationData: datas,
        isReachedEnd,
        loadingMore,
        size,
        setSize,
        error,
        isLoading,
    } = usePagination<any>(url);

    if (error) return <p>Une erreur est survenue</p>;

    if (!datas.length) return <p> {noLengthLabel} </p>;

    if (isLoading) return <LoadingPage type="data" />;

    return (
        <>
            <Grid
                templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                }}
                gap={2}
            >
                {datas?.map((data: any) => (
                    <GridItem w="100%" key={data.id}>
                        {cardName == 'discussion' && <DiscussionCard discussion={data} />}
                        {cardName == 'product' && <ProductCard product={data} />}
                        {cardName == 'place' && <PlaceCard place={data} />}
                    </GridItem>
                ))}
            </Grid>
            {loadingMore && <LoadingPage type="data" />}
            {!isReachedEnd && (
                <Button onClick={() => setSize(size + 1)} colorScheme="blue">
                    {buttonLabel}
                </Button>
            )}
        </>
    )

}

export default FeedList