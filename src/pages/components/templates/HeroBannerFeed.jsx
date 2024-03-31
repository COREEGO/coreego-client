import {
	Box,
	Grid,
	Stack,
	Typography,
	Button} from '@mui/material'
import PropTypes from 'prop-types'
import { ADD_ICON } from '../../../utils/icon'
import { NavLink } from 'react-router-dom'

const HeroBannerFeed = ({
	imageDirection,
	titleFr,
	titleKr,
	description,
	buttonLink = '',
	buttonLabel = '',
	theme,
	imageLink
}) => {
  return (
    <Box my={5}>
      <Grid
        flexDirection={`
				row${imageDirection === 'start' && '-reverse'}
			`}
        container
        alignItems='center'
        spacing={5}
			>
        <Grid item xs={12} md={6}>
          <Stack maxWidth='100%' spacing={2} alignItems='flex-start'>
            <Stack spacing={2}>
              <Stack
                direction='row'
                alignItems={'baseline'}
                gap={2}
                flexWrap='wrap'
							>

                {titleFr && (
                <Typography
                  variant='h3'
                  color='var(--coreego-blue)'
                  fontWeight='bold'
                  component='h1'
									>
                  {titleFr}
                </Typography>
								)}

                {titleKr && (
                <Typography
                  variant='h4'
                  fontWeight='bold'
                  component='span'
                  color='var(--coreego-red)'
									>
                  {titleKr}
                </Typography>
								)}
              </Stack>
              <Typography component='p' fontWeight='normal' variant="h6">
                {description}
              </Typography>
            </Stack>
            {buttonLink && (
            <NavLink to={buttonLink}>
              <Button
                color={theme == 'red' ? 'error' : 'primary'}
                variant='contained'
                startIcon={<ADD_ICON />}
								>
                {buttonLabel}
              </Button>
            </NavLink>
						)}
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          justifyContent={`flex-${imageDirection}`}
          sx={{ display: { xs: 'none', md: 'flex' } }}
				>
          <img
            height={350}
            width="100%"
            style={{
              boxShadow: `${
								imageDirection == 'start' ? '-15px' : '15px'
							} 15px 4px var(--coreego-${theme})`,
              objectFit: 'cover',
              objectPosition: 'center',
              marginBottom: 20,
            }}
            src={imageLink}
            alt={`coreego ${titleFr} `}
					/>
        </Grid>
      </Grid>
    </Box>
  )
}

HeroBannerFeed.propTypes = {
  theme: PropTypes.oneOf(['red', 'blue']).isRequired,
  titleFr: PropTypes.string,
  titleKr: PropTypes.string,
  description: PropTypes.string.isRequired,
  imageLink: PropTypes.string.isRequired,
  imageDirection: PropTypes.oneOf(['start', 'end']),
  buttonLabel: PropTypes.string,
  buttonLink: PropTypes.string
}

HeroBannerFeed.defaultProps = {
  imageDirection: 'end'
}

export default HeroBannerFeed
