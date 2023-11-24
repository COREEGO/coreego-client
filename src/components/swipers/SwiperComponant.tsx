import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiper.scss'

import { Navigation, Pagination } from 'swiper/modules';

interface PropsInterface {
    datas: any[],
    options: any,
    renderChildren: (data: any) => {},
    breakpoints?: any
}

const SwiperComponant: React.FC<PropsInterface | any> = (props, {
    datas,
    renderChildren,
    breakpoints = { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
}) => {

    return (
        <Swiper style={{ width: '100%', height: "100%" }}
            navigation={true}
            modules={[Navigation, Pagination]}
            className={props?.className}
            spaceBetween={20}
            breakpoints={breakpoints}
        >
            {
                datas.map((data: any) => {
                    return <SwiperSlide key={data.id}>
                        {renderChildren(data)}
                    </SwiperSlide>
                })
            }
        </Swiper>
    )

}

export default SwiperComponant