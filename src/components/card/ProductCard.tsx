import { Card, CardBody, Stack, Text, Image, CardHeader, CardFooter, Heading, Box, Badge } from "@chakra-ui/react";
import UserInfo from "./_UserInfo";
import City from "./_City";
import Price from "./_Price";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { dateParse, getFirstImage } from "../../utils";
import DateBadge from "../badges/DateBadge";


interface ProductCardInterface {
    product: any
}

const ProductCard: React.FC<ProductCardInterface> = ({ product }) => {



    return (
        <NavLink to={'/shopping/product/detail/' + product.id}>
            <Card>
                <CardBody>
                    <Stack>
                        <Box position="relative" h={250}
                            w="100%">
                            <Image
                                borderRadius={3}
                                h="100%"
                                w="100%"
                                objectFit='cover'
                                objectPosition="center"
                                src={getFirstImage(product.images)}
                                alt='Green double couch with wooden legs'
                            />
                        </Box>
                        <Stack>
                            <UserInfo size="xs" user={product.user} />
                            <Heading size="sm" noOfLines={1} as="b" color="var(--coreego-blue)">The perfect latte</Heading>
                            <Text noOfLines={2}>{product.description} </Text>
                            <Price price={product.price} />
                            <City city={product.city} />
                            <Box alignSelf="end">
                                <DateBadge date={product.createdAt} />
                            </Box>
                        </Stack>
                    </Stack>
                </CardBody>


                {/* <CardBody>
                    <Stack>
                        <UserInfo user={product.user} date={product.createdAt} />
                        <Image
                            sx={{ height: { base: 150, sm: 200, md: 250 } }}
                            objectFit='cover'
                            objectPosition="center"
                            src={imageUrl}
                            alt='Green double couch with wooden legs'
                        />
                        <Text noOfLines={1} as="b" color="var(--coreego-blue)">{product.title} </Text>
                        <Text noOfLines={2}>{product.description} </Text>
                        <Price price={product.price} />
                        <City city={product.city} />
                    </Stack>
                </CardBody> */}
            </Card>
        </NavLink>
    )

}

export default ProductCard