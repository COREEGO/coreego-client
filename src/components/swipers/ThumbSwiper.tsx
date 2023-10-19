
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Image, Stack } from '@chakra-ui/react';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './swiper.scss'

const ThumbSwiper: React.FC<{ images: Array<any> }> = ({ images }) => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    return (
        <Box h={{ base: 300, sm: 400, md: 500 }}>
            <Swiper
                spaceBetween={0}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="thumb_swiper_top"
            >
                {
                    images.map((image: any) => {
                        return <SwiperSlide key={image.id}>
                            <Image objectFit='contain'
                                objectPosition="center"
                                pointerEvents="none"
                                h="100%"
                                w="100%"
                                src={BASE_URL + image.filePath} />
                        </SwiperSlide>
                    })
                }
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={5}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="thumb_swiper_footer"
            >
                {
                    images.map((image: any) => {
                        return <SwiperSlide key={'thumb-' + image.id}>
                            <Image objectFit='cover'
                                objectPosition="center"
                                pointerEvents="none"
                                h="100%"
                                w="100%"
                                src={BASE_URL + image.filePath} />
                        </SwiperSlide>
                    })
                }
            </Swiper>
        </Box>
    )


}

export default ThumbSwiper