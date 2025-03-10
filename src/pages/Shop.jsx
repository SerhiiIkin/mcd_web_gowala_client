import Welcome from "@components/Welcome";
import Products from "@components/Products";

const Shop = () => {
    const welcomeData = {
        title: "Gowala Shopping",
        subtitle:"Vi er taknemmelige for dit bidrag"
    }
    return (
        <>
            <Welcome {...welcomeData} />
            <Products favorites={false} />
        </>
    );
};

export default Shop;
