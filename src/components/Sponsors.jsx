import SliderLayout from "@layouts/SliderLayout";
import { SwiperSlide } from "swiper/react";

const Sponsors = () => {
    const imagesPath = [
        "sponsors/01.png",
        "sponsors/02.png",
        "sponsors/03.png",
        "sponsors/04.png",
        "sponsors/05.png",
    ];
    const breakpoints = {
        756: {
            slidesPerView: 3,
        },
        1440: {
            slidesPerView: 5,
        },
    }

    return (
        <SliderLayout slidesPerView={2} spaceBetween={0} breakpoints={breakpoints}>
            {imagesPath.map((image, index) => (
                <SwiperSlide key={index} className="bg-secondary py-12">
                    <div className="flex justify-center ">
                        <img src={image} className="w-28 aspect-square" alt="bg-image" />
                    </div>
                </SwiperSlide>
            ))}
        </SliderLayout>
    );
};

export default Sponsors;
