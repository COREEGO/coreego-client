import { Stack, Text } from "@chakra-ui/react";

interface PriceInterface {
    price : number,
    size?: any
}

const Price: React.FC<PriceInterface> = ({ price, size }) => {

  return (
    <Stack fontSize={size} direction="row" alignItems="center" fontWeight="bold">
      <Text>₩</Text>
      <Text>{price}</Text>
    </Stack>
  );
};

export default Price;