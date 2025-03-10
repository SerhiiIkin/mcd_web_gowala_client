import Title from "@/components/Title";
import DataHandleLayout from "@/layouts/DataHandleLayout";
import SectionLayout from "@/layouts/SectionLayout";
import { axiosGetProducts, axiosRemoveProduct } from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import ProductForm from "./components/ProductForm";

const DeleteSvg = ({ className }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="20"
        viewBox="0 0 41 40">
        <g clipPath="url(#clip0_109_2047)">
            <path d="M10.4997 31.6667C10.4997 33.5 11.9997 35 13.833 35H27.1663C28.9997 35 30.4997 33.5 30.4997 31.6667V11.6667H10.4997V31.6667ZM32.1663 6.66667H26.333L24.6663 5H16.333L14.6663 6.66667H8.83301V10H32.1663V6.66667Z" />
        </g>
        <defs>
            <clipPath id="clip0_109_2047">
                <rect
                    width="40"
                    height="40"
                    fill="white"
                    transform="translate(0.5)"
                />
            </clipPath>
        </defs>
    </svg>
);
const EditSvg = ({ className }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="27"
        height="20"
        viewBox="0 0 37 30"
        fill="none">
        <path d="M0.5 8H22.3392V12H0.5V8ZM0.5 4H22.3392V0H0.5V4ZM0.5 20H14.3977V16H0.5V20ZM30.3006 13.74L31.7103 12.32C32.4846 11.54 33.7354 11.54 34.5097 12.32L35.9193 13.74C36.6936 14.52 36.6936 15.78 35.9193 16.56L34.5097 17.98L30.3006 13.74ZM28.891 15.16L18.3685 25.76V30H22.5775L33.1 19.4L28.891 15.16Z" />
    </svg>
);

const Products = () => {
    const data = useQuery({
        queryKey: ["products"],
        queryFn: axiosGetProducts,
    });

    return (
        <SectionLayout>
            <Title type="h2" className="text-center">
                Produkter
            </Title>
            <DataHandleLayout
                data={{
                    data: data?.data,
                    isLoading: data.isLoading,
                    error: data.error,
                }}
                SkeletonCount={4}
                containerClassNameSkeleton="py-5"
                emptyText="Ingen produkter fundet"
                className="py-5">
                <div
                    aria-label="products container"
                    className="flex flex-wrap gap-14 md:gap-16 py-10  justify-center 2xl:col-span-2 2xl:py-0">
                    <table className="border">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 px-2 border ">Title</th>
                                <th className="py-2 px-2 border ">Image</th>
                                <th className="py-2 px-2 border ">Price</th>
                                <th className="py-2 px-2 border ">Discount</th>
                                <th className="py-2 px-2 border ">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data &&
                                data?.data.map((product) => (
                                    <Product
                                        key={product._id}
                                        product={product}
                                    />
                                ))}
                        </tbody>
                    </table>
                </div>
            </DataHandleLayout>

            <Title type="h2" className="text-center">
                Add new product
            </Title>
            <ProductForm />
        </SectionLayout>
    );
};

export default Products;

const Product = ({ product }) => {
    const queryClient = useQueryClient();
    const mutationRemoveProduct = useMutation({
        mutationFn: axiosRemoveProduct,
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
        },
    });

    return (
        <tr className="border-b" key={product._id}>
            <td className="px-2 py-2 border-r">{product.title}</td>
            <td className="px-2 py-2 border-r">
                <img
                    className="max-w-7 aspect-square object-cover"
                    src={product.image}
                    alt="product"
                />
            </td>
            <td className="px-2 py-2 border-r">{product.price},-</td>
            <td className="px-2 py-2 border-r">{product.discount} %</td>
            <td className="px-2 py-2 flex justify-center items-center gap-2">
                <Link to={`${product._id}`}>
                    <EditSvg className="fill-blue-500" />
                </Link>
                <button
                    disabled={mutationRemoveProduct.isPending}
                    className="disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => mutationRemoveProduct.mutate(product._id)}>
                    <DeleteSvg className="fill-red-500" />
                </button>
            </td>
        </tr>
    );
};
