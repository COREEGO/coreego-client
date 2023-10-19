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
import Content from "./_Content";


interface ProductCardInterface {
    product: any,
    mode: 'feed' | 'detail',
    children?: React.ReactNode
}

const ProductCard: React.FC<ProductCardInterface> = ({ product, mode, children }) => {

    return (
        <Card borderRadius={0}>
            {
              mode === 'feed' && <Image
                    h={{ base: 200, md: 250 }}
                    w="100%"
                    objectFit='cover'
                    objectPosition="center"
                    src={getFirstImage(product.images)}
                    alt='Green double couch with wooden legs'
                />
            }
            <CardBody>
                <Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <UserInfo user={product.user} size="sm" />
                        <PublishDateText size="xs" date={product.createdAt} />
                    </Stack>
                    <Content text={product.title} type="title" mode={mode}  />
                    <Content text={product.description} type="content" mode={mode}  />
                    <City size="md" city={product.city} />
                    <Price size="lg" price={product.price} />
                    {mode === 'detail' && <>{children}</>}
                </Stack>
            </CardBody>
        </Card>

    )

}

export default ProductCard