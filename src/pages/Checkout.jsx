import Order from "@/components/Order";
import Welcome from "@/components/Welcome";

const Checkout = () => {

    const welcomeData = {
        title: "Gowala shopping",
        subtitle: "Færdiggør din bestilling",
    };

    return (
        <>
            <Welcome {...welcomeData} />
            <Order/>
        </>
    );
};

export default Checkout;