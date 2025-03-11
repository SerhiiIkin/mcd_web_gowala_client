import SectionLayout from "@layouts/SectionLayout";
import Title from "@components/Title";
import OrderContent from "@components/OrderContent";

const Orders = () => {
    return (
        <SectionLayout classNameContainer="text-center">
            <Title type="h2">Bestil</Title>
            <Title type="h3" className="pb-23">
                Udfyld venligst formularen herunder
            </Title>
            <OrderContent />
        </SectionLayout>
    );
};

export default Orders;
