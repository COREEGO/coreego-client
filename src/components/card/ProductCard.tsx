import { Card, CardContent, Stack, CardMedia, Typography } from "@mui/material";
import { getFirstImage } from "../../utils";
import LocalisationText from "../texts/LocalisationText";
import PriceText from "../texts/PriceText";

interface ProductCardInterface {
    product: any
    size: 'xl' | 'sm'
}

const ProductCard: React.FC<ProductCardInterface> = ({ product, size }) => {

    const XlCard = () => {
        return (
            <Card>
                <CardMedia
                    component="img"
                    height="194"
                    image={getFirstImage(product.images) || "https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png"}
                    alt="Paella dish"
                />
                <CardContent>
                    <Stack spacing={1}>
                        <PriceText price={product.price} />
                        <Stack spacing={0}>
                            <Typography fontWeight={"bold"} noWrap={true}>{product.title}</Typography>
                            <Typography noWrap={true}> {product.description}</Typography>
                        </Stack>
                        <LocalisationText city={product.city} district={product.district} />
                    </Stack>
                </CardContent>
            </Card>
        )
    }

    const SmCard = () => {
        return (
            <></>
            // <Card direction={"row"}>
            //     <Image
            //         w={120}
            //         borderRadius="md" objectFit="cover" src={getFirstImage(product.images)} />
            //     <CardBody>
            //         <VStack alignItems={"flex-start"} spacing={0}>
            //             <Text as="b"> {product.price} ₩</Text>
            //             <Text noOfLines={1}> {product.title} </Text>
            //             <Text noOfLines={1} fontSize="sm"> {product.description} </Text>
            //         </VStack>
            //     </CardBody>
            // </Card>
        )
    }

    return size == 'xl' ? <XlCard /> : <SmCard />

}

export default ProductCard