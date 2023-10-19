import { Stack, Text } from "@chakra-ui/react";
import { wonToEuro } from "../../utils";

interface PriceInterface {
    price : number,
    size?: any
}

const Price: React.FC<PriceInterface> = ({ price, size }) => {

  return (
    <Stack direction="row" alignItems="center" fontWeight="bold">
      <Text fontSize={size}> ₩ {price}</Text>
      <Text fontSize="sm" color="gray"> ~ {wonToEuro(price)} € </Text>
    </Stack>
  );
};

export default Price;