import SectionLayout from "@layouts/SectionLayout";
import Title from "@components/Title";

import DataHandleLayout from "@layouts/DataHandleLayout";

import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper/modules";
import { classes } from "@/utils/classes";
import Product from "@components/Product";
import Select from "@components/Select";
import useProducts from "@/hooks/useProducts";

const options = [
    { value: "name-a-z", label: "Navn A-Z" },
    { value: "name-z-a", label: "Navn Z-A" },
    { value: "price", label: "Price" },
];

const Products = ({ favorites }) => {
    const { onChange, products, data } = useProducts(favorites);

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
            {!favorites && <Select options={options} onChange={onChange} />}
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
                                    {data.data &&
                                        data?.data.map((product) => (
                                            <SwiperSlide key={product._id}>
                                                <Product
                                                    product={product}
                                                    slider
                                                />
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
