import { axiosGetProducts } from "@utils/axios";

import { useMemo } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useQuery } from "@tanstack/react-query";
const useOrderContent = () => {
    const data = useQuery({
        queryKey: ["products"],
        queryFn: axiosGetProducts,
    });
    const [items] = useLocalStorage("items", []);

    const currentItems = useMemo(() => {
        if (!data?.data) {
            return [];
        } else {
            return items.map((item) => {
                const product = data?.data.find((p) => p._id === item.product);
                return {
                    ...item,
                    title: product?.title || "Product not founded",
                    price: product?.price || 0,
                    image: product?.image || "",
                };
            });
        }
    }, [items, data?.data]);

    const total = useMemo(() => {
        return currentItems?.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
    }, [currentItems]);

    return { currentItems, total, data };
};

export default useOrderContent;
