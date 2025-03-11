import Orders from "@components/Orders";
import Welcome from "@components/Welcome";

const Checkout = () => {

    const welcomeData = {
        title: "Gowala shopping",
        subtitle: "Færdiggør din bestilling",
    };

    return (
        <>
            <Welcome {...welcomeData} />
            <Orders/>
        </>
    );
};

export default Checkout;