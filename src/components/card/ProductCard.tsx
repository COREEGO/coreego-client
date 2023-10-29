import { Card, Stack, Text, Image } from "@chakra-ui/react";
import {getFirstImage } from "../../utils";
import Localisation from "./_Localisation";

interface ProductCardInterface {
    product: any,
    mode?: 'feed' | 'detail',
    children?: React.ReactNode
}

const ProductCard: React.FC<ProductCardInterface> = ({ product, mode = "feed", children }) => {

    return (
        <Card variant="unstyled" bg="transparent">
            <Stack>
                <Image w="100%" h={{
                    base: 200,
                    sm: 200,
                    md: 200,
                    lg: 250
                    }} borderRadius="md" objectFit="cover" src={getFirstImage(product.images)} />
                <Stack spacing={0}>
                    <Text fontWeight={500}>{product.price} ₩</Text>
                    <Text noOfLines={2}> {product.title}</Text>
                    <Localisation city={product.city} district={product.district} />
                </Stack>
            </Stack>
        </Card>
    )

}

export default ProductCard