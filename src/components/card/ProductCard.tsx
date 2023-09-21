import { Card, CardBody, Stack, Text, Image, CardHeader, CardFooter } from "@chakra-ui/react";
import UserInfo from "./_UserInfo";
import City from "./_City";
import Price from "./_Price";
import { useEffect } from "react";


interface ProductCardInterface {
    product: any
}

const ProductCard: React.FC<ProductCardInterface> = ({ product }) => {

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const imageUrl = BASE_URL + product.images[0].filePath


    return (
        <Card>
            <CardHeader>
                <UserInfo user={product.user} date={product.createdAt} />
            </CardHeader>
            <Image
                sx={{ height: { base: 200, sm: 300, md: 200 } }}
                objectFit='cover'
                objectPosition="center"
                src={imageUrl}
                alt='Green double couch with wooden legs'
            />
            <CardBody>
                <Stack>
                    <Text as="b" color="var(--coreego-blue)">{product.title} </Text>
                    <Text noOfLines={2}>{product.description} </Text>
                </Stack>
            </CardBody>
            <CardFooter>
                <Stack>
                    <Price price={product.price} />
                    <City city={product.city} />
                </Stack>
            </CardFooter>
        </Card>
    )

}

export default ProductCard