import { Card, CardBody, Stack, Text, Image, CardHeader, CardFooter, Heading, Box, Badge } from "@chakra-ui/react";
import UserInfo from "./_UserInfo";
import City from "./_City";
import Price from "./_Price";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { dateParse, getFirstImage, wonToEuro } from "../../utils";
import PublishDateBadge from "../badges/PublishDateBadge";
import PublishDateText from "../texts/PublichDateText";
import ThumbSwiper from "../swipers/ThumbSwiper";
import Content from "./_Content";
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
                    sm: 180,
                    md: 200,
                    lg: 200
                    }} objectFit="cover" src={getFirstImage(product.images)} />
                <Stack spacing={0}>
                    <Text fontWeight={500}> {product.price} ₩</Text>
                    <Text noOfLines={2}> {product.title}</Text>
                    <Localisation city={product.city} district={product.district} />
                </Stack>
            </Stack>
        </Card>
    )

}

export default ProductCard