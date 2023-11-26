
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Image, Stack } from '@chakra-ui/react';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './swiper.scss'
import { BASE_URL } from '../../utils/variables';

const ThumbSwiper: React.FC<{ images: Array<any> }> = ({ images }) => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <Box width="100%" height="100%">
            <Stack
               height="100%" p={2}>
                <Swiper
                    spaceBetween={0}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="thumb_swiper_top default-swiper"
                >
                    {
                        images.map((image: any) => {
                            return <SwiperSlide key={image.id}>
                                <Image objectFit='contain'
                                    objectPosition="center"
                                    width={"100%"}
                                    h={"100%"}
                                    src={BASE_URL + image.filePath} />
                            </SwiperSlide>
                        })
                    }
                </Swiper>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={5}
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
            </Stack>
        </Box>
    )
}

export default ThumbSwiper