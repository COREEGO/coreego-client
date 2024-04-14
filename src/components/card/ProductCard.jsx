import {
	Card,
	CardContent,
	Stack,
	CardMedia,
	Typography,
	Avatar,
	CardActionArea,
	CardHeader
} from '@mui/material'
import { getFirstImage } from '../../utils'
import LocalisationText from '../texts/LocalisationText'
import PriceText from '../texts/PriceText'
import {
	LOCALISATION_ICON,
	MARKER_ICON,
	PRICE_ICON
} from '../../utils/icon'
import { AVATAR_PATH, IMAGE_PATH, UNKNOWN_USER } from '../../utils/variables'
import moment from 'moment'

const ProductCard = ({ product }) => {
  return product && (
    <Card elevation={3} raised>
      <CardActionArea component='div'>
        <CardMedia
          alt={product.title}
          component='img'
          sx={{
            height: { xs: 200, md: 250 }
          }}
          width='100%'
          image={
            product?.thumbnail?.name
            ? IMAGE_PATH + product?.thumbnail?.name :
            'https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png'
          }
        />
        <CardHeader
          avatar={<Avatar alt={product?.user?.pseudo} src={AVATAR_PATH + product?.user?.avatar} />}
          title={
            <Typography component='div' fontWeight='bold'>
              {product?.user?.pseudo || UNKNOWN_USER}
            </Typography>
					}
          subheader={moment(product.created_at).format('D MMMM YYYY')}
          sx={{pb: 0}}
				/>
        <CardContent>
          <Typography
            color='var(--coreego-blue)'
            component="div"
            variant="h6"
            fontWeight="inherit"
            noWrap
            gutterBottom
					>
            {product.title}
          </Typography>
          <Typography fontWeight='bold' component="div" noWrap gutterBottom>
						₩ {product.price}
          </Typography>
          <Stack direction='row'>
            <MARKER_ICON />
            <Typography noWrap component='div'>
              {product.city.label},{product.district.label}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ProductCard
