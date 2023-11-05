import { Card, Stack, Text, Image } from "@chakra-ui/react";
import {getFirstImage } from "../../utils";
import LocalisationText from "../texts/LocalisationText";
import PriceText from "../texts/PriceText";

interface ProductCardInterface {
    product: any
}

const ProductCard: React.FC<ProductCardInterface> = ({ product }) => {

    return (
        <Card variant="unstyled" bg="transparent" id={product.id}>
            <Stack>
                <Image w="100%" h={{
                    base: 200,
                    sm: 200,
                    md: 200,
                    lg: 250
                    }} borderRadius="md" objectFit="cover" src={getFirstImage(product.images)} />
                <Stack spacing={0}>
                    <PriceText price={product.price} />
                    <Text noOfLines={2}> {product.title}</Text>
                    <LocalisationText city={product.city} district={product.district} />
                </Stack>
            </Stack>
        </Card>
    )

}

export default ProductCard