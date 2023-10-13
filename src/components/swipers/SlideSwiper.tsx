import { Swiper, SwiperSlide } from 'swiper/react';
import { Image } from '@chakra-ui/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './swiper.scss'

import { Navigation, Pagination } from 'swiper/modules';

const SlideSwiper: React.FC<{ images: Array<any> }> = ({ images }) => {

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    return (
        <Swiper navigation={true} modules={[Navigation, Pagination]} className="default-swiper"
            slidesPerView={1}
            spaceBetween={10}
        >
            {
                images.map((image: any) => {
                    return <SwiperSlide key={image.id}>
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
    )

}

export default SlideSwiper