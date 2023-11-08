import { Card, Stack, Text, Image, CardBody, VStack } from "@chakra-ui/react";
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
            <Card id={product.id}>
                <Image w="100%" h={{
                    base: 200,
                    sm: 200,
                    md: 200,
                    lg: 250
                }} borderRadius="md" objectFit="cover" src={getFirstImage(product.images)} />
                <CardBody>
                    <PriceText price={product.price} />
                    <Text noOfLines={1} as="b"> {product.title}</Text>
                    <Text noOfLines={2}> {product.description}</Text>
                    <LocalisationText city={product.city} district={product.district} />
                </CardBody>
            </Card>
        )
    }

    const SmCard = () => {
        return (
            <Card direction={"row"}>
                <Image
                    w={120}
                    borderRadius="md" objectFit="cover" src={getFirstImage(product.images)} />
                <CardBody>
                    <VStack alignItems={"flex-start"} spacing={0}>
                        <Text as="b"> {product.price} ₩</Text>
                        <Text noOfLines={1}> {product.title} </Text>
                        <Text noOfLines={1} fontSize="sm"> {product.description} </Text>
                    </VStack>
                </CardBody>
            </Card>
        )
    }

    return size == 'xl' ? <XlCard /> : <SmCard />

}

export default ProductCard