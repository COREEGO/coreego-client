import { Card, CardBody, Stack, Text, Image, CardHeader, CardFooter, Heading, Box, Badge } from "@chakra-ui/react";
import UserInfo from "./_UserInfo";
import City from "./_City";
import Price from "./_Price";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { dateParse, getFirstImage } from "../../utils";
import PublishDateBadge from "../badges/PublishDateBadge";
import PublishDateText from "../texts/PublichDateText";
import ThumbSwiper from "../swipers/ThumbSwiper";


interface ProductCardInterface {
    product: any
}

const ProductCard: React.FC<ProductCardInterface> = ({ product }) => {

    return (
        <Card borderRadius={0}>
            <Image
                h={{ base: 200, md: 250 }}
                w="100%"
                objectFit='cover'
                objectPosition="center"
                src={getFirstImage(product.images)}
                alt='Green double couch with wooden legs'
            />
            <CardBody>
                <Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <UserInfo user={product.user} size="xs" />
                        <PublishDateText size="xs" date={product.createdAt} />
                    </Stack>
                    <Text noOfLines={1} as="b">{product.title} </Text>
                    <Text noOfLines={2}>{product.description} </Text>
                    <City size="md" city={product.city} />
                    <Price size="lg" price={product.price} />
                </Stack>
            </CardBody>
        </Card>

    )

}

export default ProductCard