import { Card, CardBody, Stack, Text, Image, CardHeader, CardFooter } from "@chakra-ui/react";
import UserInfo from "./_UserInfo";
import City from "./_City";
import Price from "./_Price";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";


interface ProductCardInterface {
    product: any
}

const ProductCard: React.FC<ProductCardInterface> = ({ product }) => {

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const imageUrl = BASE_URL + product.images[0].filePath


    return (
        <NavLink to={'/shopping/product/detail/' + product.id}>
            <Card borderRadius={0} className="feed__card" >
                <CardBody>
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
                </CardBody>
            </Card>
        </NavLink>
    )

}

export default ProductCard