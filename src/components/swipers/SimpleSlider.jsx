import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './swiper.scss'

import { Navigation, Pagination } from 'swiper/modules';
import { IMAGE_PATH } from '../../utils/variables';

const SimpleSlider = ({ images }) => {

    return (
        <Swiper style={{ width: '100%', height: "100%" }}
            navigation={true}
            modules={[Navigation, Pagination]}
            className="simple-swiper"
            slidesPerView={1}
        >
            {
                images.map((image) => {
                    return <SwiperSlide  key={image.id}>
                        <img
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                                height: '100%',
                                width: '100%'
                            }}
                            src={IMAGE_PATH + image.name} />
                    </SwiperSlide>
                })
            }
        </Swiper>
    )

}

export default SimpleSlider