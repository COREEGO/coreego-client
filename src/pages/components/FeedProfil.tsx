import { Grid, GridItem, Text } from "@chakra-ui/react"
import SmallDiscussionCard from "../../components/card/SmallDiscusionCard";
import { NavLink } from "react-router-dom";
import SmallProductCard from "../../components/card/SmallProductCard";
import SmallPlaceCard from "../../components/card/SmallPlaceCard";


interface PropsInterface {
    datas: any,
    noLengthLabel: string;
    cardName: "discussion" | "product" | "place";
}

const FeedProfil: React.FC<PropsInterface> = ({ noLengthLabel, cardName, datas }) => {

    return (
        <Grid gap={5} templateColumns={
            {
                base: "repeat(1, 1fr)",
                md: "repeat(3, 1fr)"
            }
        }>
            {
               datas?.length ? datas.map((data: any) => {
                    return <GridItem key={data.id}>
                        {cardName === "discussion" && <SmallDiscussionCard discussion={data} />}
                        {cardName === "product" && <SmallProductCard product={data} />}
                        {cardName === "place" && <SmallPlaceCard place={data} />}
                    </GridItem>
                }) : <Text> {noLengthLabel} </Text>
            }
        </Grid>
    )

}

export default FeedProfil