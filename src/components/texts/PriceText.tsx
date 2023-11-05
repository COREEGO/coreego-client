import { Text } from "@chakra-ui/react";

interface PriceInterface {
  price: number
}

const PriceText: React.FC<PriceInterface> = ({ price }) => {

  return (
    <Text fontWeight={500}>{price} €</Text>
  )
};

export default PriceText;