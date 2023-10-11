import { Stack, Text } from "@chakra-ui/react";

interface PriceInterface {
    price : number,
    fontSize?: any
}

const Price: React.FC<PriceInterface> = ({ price, fontSize = "md" }) => {
  // Utilisez les props comme vous le souhaitez ici

  return (
    <Stack fontSize={fontSize} direction="row" alignItems="center" fontWeight="bold">
      <Text>₩</Text>
      <Text>{price}</Text>
    </Stack>
  );
};

export default Price;