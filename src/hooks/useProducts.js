import { useQuery } from "@tanstack/react-query";
import { axiosGetProducts } from "@utils/axios";
import { useState, useEffect } from "react";

const useProducts = (favorites) => {
    const [products, setProducts] = useState([]);

    const data = useQuery({
        queryKey: ["products"],
        queryFn: axiosGetProducts,
    });

    const onChange = (value) => {
        if (value === "name-a-z") {
            setProducts(
                [...products].sort((a, b) => a.title.localeCompare(b.title))
            );
        } else if (value === "name-z-a") {
            setProducts(
                [...products].sort((a, b) => b.title.localeCompare(a.title))
            );
        } else if (value === "price") {
            setProducts([...products].sort((a, b) => a.price - b.price));
        }
    };

    useEffect(() => {
        if (!data?.data) return;
        if (!favorites)
            setProducts(
                data?.data.sort((a, b) => a.title.localeCompare(b.title))
            );
        else
            setProducts(
                data?.data
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 4)
                    .sort((a, b) => a.title.localeCompare(b.title))
            );
    }, [data?.data]);

    return {
        onChange,
        products,
        data,
    };
};

export default useProducts;
