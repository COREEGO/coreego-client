import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import './swiper.scss'

import { Navigation, Pagination } from 'swiper/modules'
import { IMAGE_PATH } from '../../utils/variables'
import {
	IconButton,
	Dialog,
	AppBar,
	Toolbar,
	DialogContent,
    Typography
} from '@mui/material'
import React from 'react'
import { CLOSE_ICON, ZOOM_ICON } from '../../utils/icon'
import { useTheme } from '@emotion/react'

const SimpleSlider = ({ images, title }) => {
  const [open, setOpen] = React.useState(false)

  const theme = useTheme()

  return (
    <React.Fragment>
      <Swiper
        style={{
          width: '100%',
          height: '100%',
          position: 'relative'
        }}
        navigation
        modules={[Navigation, Pagination]}
        className='simple-swiper'
        slidesPerView={1}
			>
        {images.map((image) => {
          return (
            <SwiperSlide key={image.id}>
              <img
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  height: '100%',
                  width: '100%'
                }}
                src={IMAGE_PATH + image.name}
							/>
            </SwiperSlide>
          )
        })}
        <IconButton
          onClick={() => setOpen(true)}
          size='small'
          sx={{
            border: `1px solid ${theme.palette.primary.main}`, // Bordure avec la couleur principale
            bgcolor: 'white', // Blanc avec opacité pour le survol
            '&:hover': {
              bgcolor: 'white'
            },
            position: 'absolute',
            right: 5,
            bottom: 5,
            zIndex: 10
          }}
				>
          <ZOOM_ICON color='primary' />
        </IconButton>
      </Swiper>
      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
			>
        <AppBar sx={{ position: 'sticky', top: 0 }}>
          <Toolbar>
            <Typography
              sx={{ flex: 1 }}
              noWrap
              variant='h6'
              component='div'
						>
							{title || 'rien'}
						</Typography>
            <IconButton
              edge='start'
              color='inherit'
              onClick={() => setOpen(false)}
              aria-label='close'
						>
              <CLOSE_ICON />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Swiper
            style={{
              width: '100%',
              height: '100%',
              position: 'relative'
            }}
            navigation
            modules={[Navigation, Pagination]}
            className='simple-swiper'
            slidesPerView={1}
					>
            {images.map((image) => {
              return (
                <SwiperSlide key={image.id}>
                  <img
                  style={{
                    objectFit: 'contain',
                    height: '100%',
                    width: '100%'
                  }}
                  src={IMAGE_PATH + image.name}
									/>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

export default SimpleSlider
