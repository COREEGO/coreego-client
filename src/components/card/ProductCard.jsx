import {
	Card,
	CardContent,
	Stack,
	CardMedia,
	Typography,
	Avatar,
	CardActionArea
} from '@mui/material'
import { getFirstImage } from '../../utils'
import LocalisationText from '../texts/LocalisationText'
import PriceText from '../texts/PriceText'
import {
	LOCALISATION_ICON,
	MARKER_ICON,
	PRICE_ICON
} from '../../utils/icon'
import { AVATAR_PATH } from '../../utils/variables'

const ProductCard = ({ product }) => {
  return (
    <Card elevation={3} raised>
      <CardActionArea component='div'>
        <CardMedia
          component='img'
          sx={{
            height: { xs: 200, md: 150 }
          }}
          width='100%'
          image={
						getFirstImage(product.images) ||
						'https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png'
					}
          alt={product.title}
				/>
        <CardContent>
          <Stack gap={1}>
            <Stack direction='row' spacing={1} alignItems='center'>
              <Avatar
                src={AVATAR_PATH + product.user.avatar}
                sx={{ width: 30, height: 30 }}
							/>
              <Typography variant='body2' fontWeight='bold'>
                {product.user.pseudo}
              </Typography>
            </Stack>
            <Typography
              color='var(--coreego-blue)'
              component='div'
              variant='h6'
              noWrap
						>
              {product.title}
            </Typography>
            <Typography fontWeight='bold' noWrap>
							₩ {product.price}
            </Typography>
            <Stack direction="row">
              <MARKER_ICON />
              <Typography noWrap component='div'>{product.city.label},{product.district.label}</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ProductCard
