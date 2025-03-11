import OrderForm from "@components/OrderForm";
import Order from "@components/Order";
import DataHandleLayout from "@layouts/DataHandleLayout";
import useOrderContent from "@hooks/useOrderContent";

const OrderContent = () => {
    const { currentItems, total, data } = useOrderContent();

    return (
        <article className="bg-secondary pt-14 pb-9 px-4">
            <div className="grid gap-4 justify-items-center mb-6 max-w-3xl mx-auto">
                <DataHandleLayout
                    data={{
                        data: currentItems,
                        isLoading: data?.isLoading,
                        error: data?.error,
                    }}
                    SkeletonCount={4}
                    containerClassNameSkeleton="py-5"
                    emptyText="Ingen produkter fundet"
                    className="py-5">
                    {currentItems.map((item) => (
                        <Order key={item.title} item={item} />
                    ))}
                    <div className="flex gap-2 items-center mb-6 justify-end min-w-64 w-full bg-white p-1">
                        <p className="text-primary">I alt:</p>
                        <span className="font-semibold">{total} ,-</span>
                    </div>
                </DataHandleLayout>
            </div>

            {currentItems.length > 0 && <OrderForm />}
        </article>
    );
};

export default OrderContent;
