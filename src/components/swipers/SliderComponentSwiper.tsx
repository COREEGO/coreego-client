
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './swiper.scss'

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import PlaceCard from '../card/PlaceCard';
import ProductCard from '../card/ProductCard';
import DiscussionCard from '../card/DiscussionCard';

const SliderComponentSwiper: React.FC<{
    name: 'place' | 'product' | 'discussion',
    datas: any  }> = ({ name, datas }) => {

    return (
        <Swiper
            style={{ width: '100%', height: "100%" }}
            navigation={true}
            modules={[Navigation, Pagination]}
            className="default-swiper"
            spaceBetween={20}
            breakpoints={{
                640: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 2,
                }
            }
            }
        >
            {
                datas.map((data:any) => {
                    return <SwiperSlide key={data.id}>
                            {name === 'place' && <PlaceCard size="sm" place={data} /> }
                            {name === 'product' && <ProductCard size="sm" product={data} /> }
                            {name === 'discussion' && <DiscussionCard size="sm" discussion={data} /> }
                    </SwiperSlide>
                })
            }
        </Swiper>
    )

}

export default SliderComponentSwiper