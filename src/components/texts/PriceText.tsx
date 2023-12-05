import { Text } from "@chakra-ui/react";
import { Typography } from "@mui/material";

interface PriceInterface {
  price: number
}

const PriceText: React.FC<PriceInterface> = ({ price }) => {

  return (
    <Typography fontWeight={500}>{price} ₩</Typography>
  )
};

export default PriceText;