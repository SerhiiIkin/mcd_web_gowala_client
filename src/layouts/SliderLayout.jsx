import { Swiper } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import Arrow from "@/components/Arrow";

const SliderLayout = ({
    children,
    slidesPerView = 1,
    spaceBetween = 50,
    breakpoints,
}) => {
    return (
        <section className="relative">
            <button className="custom-prev absolute left-4 z-10 top-1/2 -translate-y-1/2">
                <Arrow className="rotate-180" />
            </button>
            <button className="custom-next absolute right-4 z-10 top-1/2 -translate-y-1/2">
                <Arrow />
            </button>
            <Swiper
                breakpoints={breakpoints}
                spaceBetween={spaceBetween}
                navigation={{
                    nextEl: ".custom-next",
                    prevEl: ".custom-prev",
                }}
                loop
                slidesPerView={slidesPerView}
                modules={[Navigation, A11y]}>
                {children}
            </Swiper>
        </section>
    );
};

export default SliderLayout;
