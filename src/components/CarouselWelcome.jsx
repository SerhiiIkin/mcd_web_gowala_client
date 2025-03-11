import { SwiperSlide } from "swiper/react";
import { Link } from "react-router";
import Title from "@components/Title";
import SliderLayout from "@layouts/SliderLayout";
const CarouselWelcome = () => {
    const imagesPath = [
        "headerslider/01.jpg",
        "headerslider/02.jpg",
        "headerslider/03.jpg",
        "headerslider/04.jpg",
    ];

    return (
        <SliderLayout>
            {imagesPath.map((image, index) => (
                <SwiperSlide key={index}>
                    <div className="relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-max grid gap-2 text-center">
                            <Title className="text-primary">Gowala Farms</Title>
                            <Title type="h4" className="text-primary">
                                The Complete Milk
                            </Title>
                            <Link
                                to="/about"
                                className="btn-green px-16 py-4 justify-self-center">
                                Read More
                            </Link>
                        </div>
                        <img src={image} alt="bg-image" />
                    </div>
                </SwiperSlide>
            ))}
        </SliderLayout>
    );
};

export default CarouselWelcome;