import Products from "@components/Products";
import Cards from "@components/Cards";
import Employees from "@components/Employees";
import Newsletter from "@components/Newsletter";
import Sponsors from "@components/Sponsors";
import CarouselWelcome from "@components/CarouselWelcome";

const Home = () => {
    return (
        <>
            <CarouselWelcome />
            <Cards />
            <Products favorites />
            <Employees />
            <Newsletter />
            <Sponsors />
        </>
    );
};

export default Home;
