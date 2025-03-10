import SectionLayout from "@/layouts/SectionLayout";
import { axiosAddOrder, axiosGetProducts } from "@/utils/axios";
import Title from "@components/Title";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useFormik } from "formik";
import { useMemo } from "react";
import { object, string } from "yup";
import Loader from "@components/Loader";
import { toast } from "react-toastify";

const Order = () => {
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

export default Order;

const OrderContent = () => {
    const data = useQuery({
        queryKey: ["products"],
        queryFn: axiosGetProducts,
    });
    const [items, saveItems] = useLocalStorage("items", []);

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

    const CloseSvg = () => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none">
                <g clipPath="url(#clip0_108_1018)">
                    <path
                        d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM17 15.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59Z"
                        fill="#5E9A13"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_108_1018">
                        <rect width="24" height="24" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        );
    };

    const changeQuantity = (event, item) => {
        const buttonContent = event.target.textContent;
        if (item.quantity === 1 && buttonContent === "-") {
            saveItems(items.filter((i) => i.product !== item.product));
            return;
        }

        saveItems(
            items.map((i) =>
                i.product === item.product
                    ? {
                          ...i,
                          quantity:
                              buttonContent === "+"
                                  ? i.quantity + 1
                                  : i.quantity - 1,
                      }
                    : i
            )
        );
    };

    return (
        <article className="bg-secondary pt-14 pb-9 px-4">
            <div className="grid gap-4 justify-items-center mb-6 max-w-3xl mx-auto">
                {currentItems.map((item) => (
                    <div
                        key={item.title}
                        className="grid bg-white p-2 gap-2  min-w-64 w-full">
                        {item.image && (
                            <img
                                src={item.image}
                                alt="product img"
                                className="max-w-14 lg:max-w-28 aspect-square object-cover row-span-3 w-full"
                            />
                        )}
                        <div className="font-medium col-start-2 text-left">
                            {item.title}
                            <p className="text-primary">{item.price},-</p>
                        </div>

                        <button
                            className="col-start-3 justify-self-end  self-start"
                            onClick={() =>
                                saveItems(
                                    items.filter(
                                        (i) => i.product !== item.product
                                    )
                                )
                            }>
                            <CloseSvg />
                        </button>
                        <div className="flex gap-2 items-center p-1 ">
                            <button
                                onClick={() => changeQuantity(event, item)}
                                className="bg-primary text-white w-6 aspect-square rounded-full">
                                -
                            </button>
                            <p>{item.quantity}</p>
                            <button
                                onClick={() => changeQuantity(event, item)}
                                className="bg-primary text-white w-6 aspect-square rounded-full">
                                +
                            </button>
                        </div>
                        <div className="row-start-3 col-start-3 justify-self-end flex gap-2 ">
                            <span className="text-primary">Total </span>
                            {item.price * item.quantity} ,-
                        </div>
                    </div>
                ))}
                <div className="flex gap-2 items-center mb-6 justify-end min-w-64 w-full bg-white p-1">
                    <p className="text-primary">I alt:</p>
                    <span className="font-semibold">{total} ,-</span>
                </div>
            </div>

            <OrderForm />
        </article>
    );
};

const OrderForm = () => {
    const [items] = useLocalStorage("items", []);

    const mutationAddOrder = useMutation({
        mutationFn: axiosAddOrder,
        onSuccess: () => {
            toast.success("Tak fordi du handler hos Gowala shop!");
            formik.resetForm();
        },
    });

    const initialValues = {
        email: "",
    };

    const onSubmit = (values) => {
        const order = {
            email: values.email,
            items,
        };
        mutationAddOrder.mutate(order);
    };

    const validationSchema = object({
        email: string()
            .min(1, "Email skal have mindst 1 karakter")
            .email("Ugyldig e-mail!")
            .required("Påkrævet!"),
    });

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="grid gap-2 p-2 bg-secondary">
            <label className="relative pb-7">
                <input
                    type="text"
                    placeholder="Din email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="email"
                    className="bg-white  py-2 px-5 border placeholder:text-xl placeholder:text-black placeholder:font-display w-full"
                />
                {formik.touched.email && formik.errors.email && (
                    <span className="text-red-600 text-sm absolute bottom-0 left-2 ">
                        {formik.errors.email}
                    </span>
                )}
            </label>

            <button
                disabled={!formik.isValid}
                type="submit"
                className="btn-submit ">
                Afgiv ordre
                {mutationAddOrder.isPending && <Loader />}
            </button>
        </form>
    );
};
