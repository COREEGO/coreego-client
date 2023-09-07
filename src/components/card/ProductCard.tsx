import { Card, CardBody, Stack, Text, Image } from "@chakra-ui/react";
import UserInfo from "./_UserInfo";
import City from "./_City";
import Price from "./_Price";


interface ProductCardInterface {
    product: any
}

const ProductCard: React.FC<ProductCardInterface> = ({ product }) => {

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const imageUrl = BASE_URL + product.images[0].filePath

    return (
        <Card>
            <CardBody>
                <Stack spacing={3}>
                    <Image
                        sx={{ height: { base: 200, sm: 300, md: 200 } }}
                        objectFit="cover"
                        objectPosition="center"
                        src={imageUrl}
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                    />
                    <UserInfo user={product.user} date={product.createdAt} />
                    <Text as="b" color="var(--coreego-blue)">{product.title} </Text>
                    <Text noOfLines={2}>{product.description} </Text>
                    <Stack direction="row">
                        {/* <NoOfComments nb={product.comments.length} />
                        <NoOfLikes nb={product.likes.length} /> */}
                    </Stack>
                    <Price price={product.price} />
                    <City city={product.city} />
                </Stack>
            </CardBody>
        </Card>
    )

}

export default ProductCard