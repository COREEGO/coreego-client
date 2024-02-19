import {
	Box,
	Grid,
	Stack,
	Typography,
	Button,
	Container
} from '@mui/material'
import PropTypes from 'prop-types'
import { ADD_ICON } from '../../../utils/icon'
import { NavLink } from 'react-router-dom'

const HeroBannerFeed = (props) => {
  return (
    <Box className='hero_banner'>
      <Box my={5}>
        <Container>
          <Grid
            flexDirection={`
				row${props.imageDirection === 'start' && '-reverse'}
			`}
            container
            alignItems='center'>
            <Grid item xs={12} md={6}>
              <Stack
                maxWidth='100%'
                spacing={2}
                alignItems='flex-start'
							>
                <Stack spacing={2}>
                  <Stack
                    direction='row'
                    alignItems={'baseline'}
                    gap={2}
                    flexWrap='wrap'
									>
                    <Typography
                    variant='h3'
                    color='var(--coreego-blue)'
                    fontWeight='bold'
                    component='h1'
										>{props.titleFr}
                  </Typography>
                    <Typography
                    variant='h4'
                    fontWeight='bold'
                    component='span'
                    color='var(--coreego-red)'
										>
                    {props.titleKr}
                  </Typography>
                  </Stack>
                  <Typography color='var(--grey-bold)'>
                    {props.description}
                  </Typography>
                </Stack>
                <NavLink to={props.buttonLink}>
                  <Button
                    color={props.theme == 'red' ? 'error' : 'primary'}
                    variant='contained'
                    startIcon={<ADD_ICON />}
									>
                    {props.buttonLabel}
                  </Button>
                </NavLink>
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              justifyContent={`flex-${props.imageDirection}`}
              sx={{ display: { xs: 'none', md: 'flex' } }}
						>
              <img
                height={350}
                width={350}
                style={{
                  boxShadow: `${
										props.imageDirection == 'start' ? '-15px' : '15px'
									} 15px 4px var(--coreego-${props.theme})`,
                  marginRight: `${
										props.imageDirection == 'end' && '15px'
									}`,
                  marginLeft: `${
										props.imageDirection == 'start' && '15px'
									}`,
                  marginBottom: 20,
                  borderRadius: 5,
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
                src={props.imageLink}
                alt={`coreego ${props.titleFr} `}
							/>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

HeroBannerFeed.propTypes = {
  theme: PropTypes.oneOf(['red', 'blue']).isRequired,
  titleFr: PropTypes.string.isRequired,
  titleKr: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageLink: PropTypes.string.isRequired,
  imageDirection: PropTypes.oneOf(['start', 'end']),
  buttonLabel: PropTypes.string.isRequired,
  buttonLink: PropTypes.string.isRequired
}

HeroBannerFeed.defaultProps = {
  imageDirection: 'end'
}

export default HeroBannerFeed
