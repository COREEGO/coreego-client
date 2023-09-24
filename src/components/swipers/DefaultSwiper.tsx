import { Swiper, SwiperSlide } from 'swiper/react';
import {Image} from '@chakra-ui/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './Swiper.css'

import { Navigation, Pagination } from 'swiper/modules';

const DefaultSwiper: React.FC<{images: Array<any>}> = ({images}) => {

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    return (
        <Swiper navigation={true} modules={[Navigation, Pagination]}  className="mySwiper"
        spaceBetween={30}
        slidesPerView={3}
        >
            {
                images.map((image:any) => {
                    return <SwiperSlide>
                        <Image src={BASE_URL + image.filePath} />
                    </SwiperSlide>
                })
            }

        </Swiper>
    )

}

export default DefaultSwiper