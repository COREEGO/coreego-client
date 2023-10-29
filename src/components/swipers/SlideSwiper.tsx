import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Image } from '@chakra-ui/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './swiper.scss'

import { Navigation, Pagination } from 'swiper/modules';

const SlideSwiper: React.FC<{ images: Array<any> }> = ({ images }) => {

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    return (
        <Swiper style={{ width: '100%', height: "100%" }} navigation={true} modules={[Navigation, Pagination]} className="default-swiper"
            spaceBetween={20}
            breakpoints={{
                640: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            }
            }
        >
            {
                images.map((image: any) => {
                    return <SwiperSlide key={image.id}>
                        <Image objectFit="cover"
                            objectPosition="center"
                            pointerEvents="none"
                            borderRadius={"md"}
                            h="100%"
                            w="100%"
                            src={BASE_URL + image.filePath} />
                    </SwiperSlide>
                })
            }
        </Swiper >
    )

}

export default SlideSwiper