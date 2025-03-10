import SectionLayout from "@layouts/SectionLayout";
import Title from "@components/Title";
import { useQuery } from "@tanstack/react-query";
import { axiosGetProducts } from "@utils/axios";
import DataHandleLayout from "@layouts/DataHandleLayout";
import BasketIco from "@components/BasketIco";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { useLocalStorage } from "@uidotdev/usehooks";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper/modules";
import { classes } from "@/utils/classes";

const options = [
    { value: "name-a-z", label: "Navn A-Z" },
    { value: "name-z-a", label: "Navn Z-A" },
    { value: "price", label: "Price" },
];

const Select = ({ onChange }) => {
    const [selected, setSelected] = useState(options[0]);
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const selectRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setHighlightedIndex(0);
        }
    }, [isOpen]);

    const handleKeyDown = (event) => {
        if (!isOpen) {
            if (event.key === "Enter" || event.key === "ArrowDown") {
                event.preventDefault();
                setIsOpen(true);
            }
            return;
        }

        switch (event.key) {
            case "ArrowDown":
                event.preventDefault();
                setHighlightedIndex((prev) => (prev + 1) % options.length);
                break;
            case "ArrowUp":
                event.preventDefault();
                setHighlightedIndex((prev) =>
                    prev === 0 ? options.length - 1 : prev - 1
                );
                break;
            case "Enter":
                event.preventDefault();
                const selectedOption = options[highlightedIndex];
                setSelected(selectedOption);
                onChange(selectedOption.value); // Викликаємо onChange з value
                setIsOpen(false);
                break;
            case "Escape":
                setIsOpen(false);
                break;
        }
    };

    return (
        <div
            className="relative w-full"
            ref={selectRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onBlur={() => setIsOpen(false)}>
            <div
                className="w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer bg-white"
                onClick={() => setIsOpen(!isOpen)}>
                {selected.label}
            </div>

            {isOpen && (
                <div className="absolute mt-1 w-full bg-white shadow-md rounded-md z-30">
                    {options.map((option, index) => (
                        <div
                            key={option.value}
                            onClick={() => {
                                setSelected(option);
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                            className={`px-3 py-2 cursor-pointer ${
                                highlightedIndex === index
                                    ? "bg-indigo-100"
                                    : ""
                            }`}>
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const Product = ({ product, slider }) => {
    const [items, saveItems] = useLocalStorage("items", []);

    const addToBasket = () => {
        const productExists = items.find((p) => p.product === product._id);
        if (productExists) {
            toast.info("Produktet findes allerede", `${product.title}`);
            return;
        }

        toast.success(`Produkt tilføjet til kurv: ${product.title}`);
        saveItems([...items, { product: product._id, quantity: 1 }]);
    };

    return (
        <article aria-label="Produkt" className="shadow-md py-2  grid gap-10">
            <div
                aria-label="product container"
                className="bg-secondary pt-11 px-18 pb-4 grid gap-5 justify-items-center relative">
                {product.discount > 0 && (
                    <div className="absolute top-2 right-2 btn-green px-3">
                        {product.discount}%
                    </div>
                )}
                <img src={product.image} alt="product img" />
                <Title type="h4" className="font-semibold">
                    {product.title}
                </Title>
                <Title type="h3" className="font-semibold text-primary">
                    {product.price},-
                </Title>
                {!slider && (
                    <button
                        onClick={addToBasket}
                        className="btn-green py-4 px-9 flex gap-2 items-center min-w-max">
                        <BasketIco className="fill-white" />
                        Tilføj til kurv
                    </button>
                )}
            </div>
        </article>
    );
};

const Products = ({ favorites }) => {
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

    return (
        <SectionLayout classNameContainer="text-center 2xl:max-w-full">
            <Title type="h2">
                {favorites ? "Vores produkter" : "Alle vores produkter"}
            </Title>
            <Title type="h3">
                {favorites
                    ? "Vi har udvalgt de bedste produkterr"
                    : "Alt på ét sted"}
            </Title>
            <p className="pb-10">
                {favorites
                    ? "Her finder du et udvalg af friske mejeriprodukter og kvalitetskød fra Gowala Farms – direkte fra pågærd til dit bord."
                    : "Her på siden finder du alle vores friske mejeriprodukter og kvalitetskød fra Gowala Farms – direkte fra pågærd til dit bord."}
            </p>
            {!favorites && <Select onChange={onChange} />}
            <DataHandleLayout
                data={{
                    data: products,
                    isLoading: data.isLoading,
                    error: data.error,
                }}
                SkeletonCount={4}
                containerClassNameSkeleton="py-5"
                emptyText="Ingen produkter fundet"
                className="py-5">
                <div
                    className={classes([
                        favorites && "2xl:grid 2xl:grid-cols-3",
                    ])}>
                    <div
                        aria-label="products container"
                        className="flex flex-wrap gap-14 md:gap-16 py-10  justify-center 2xl:col-span-2 2xl:py-0">
                        {products.map((product) => (
                            <Product key={product._id} product={product} />
                        ))}
                    </div>
                    {favorites && (
                        <div className="hidden 2xl:block">
                            <Swiper
                                loop
                                spaceBetween={50}
                                pagination={{
                                    clickable: true,
                                    bulletActiveClass:
                                        "pagination-bullet-activ",
                                }}
                                slidesPerView={1}
                                modules={[Pagination, A11y]}>
                                <div>
                                    {products.map((product) => (
                                        <SwiperSlide key={product._id}>
                                            <Product product={product} slider />
                                        </SwiperSlide>
                                    ))}
                                </div>
                            </Swiper>
                        </div>
                    )}
                </div>
            </DataHandleLayout>
            {favorites && (
                <Link
                    to="/shop"
                    className="btn-green py-4 px-9  flex gap-2 items-center justify-self-center mt-6">
                    Se alle produkter
                </Link>
            )}
        </SectionLayout>
    );
};

export default Products;
