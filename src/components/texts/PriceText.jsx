import { Typography } from "@mui/material";

const PriceText = ({ price }) => {

  return (
    <Typography fontWeight={500}>{price} ₩</Typography>
  )
};

export default PriceText;