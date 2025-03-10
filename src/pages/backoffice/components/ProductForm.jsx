import Loader from "@/components/Loader";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { mixed, number, object, string } from "yup";
import {
    axiosAddProduct,
    axiosGetProduct,
    axiosUpdateProduct,
} from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import DataHandleLayout from "@/layouts/DataHandleLayout";
const ProductForm = () => {
    const { id } = useParams();
    const data = useQuery({
        queryKey: ["product", id],
        queryFn: () => axiosGetProduct(id),
        enabled: !!id,
    });
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const mutationAddProduct = useMutation({
        mutationFn: axiosAddProduct,
        onSuccess: () => {
            toast.success("Produkt tilføjet");
            queryClient.invalidateQueries(["products"]);
        },
    });
    const mutationUpdateProduct = useMutation({
        mutationFn: axiosUpdateProduct,
        onSuccess: () => {
            toast.success("Produkt opdateret");
            queryClient.invalidateQueries(["product", id]);
            navigate("/backoffice/products");
        },
    });

    const initialValues = {
        title: data?.data ? data.data?.title : "",
        price: data?.data ? data?.data?.price : 0,
        discount: data?.data ? data?.data?.discount : 0,
        file: null,
    };

    const validationSchema = object({
        title: string().required("Påkrævet!"),
        price: number("Pris")
            .min(1, "Prisen skal være større end 0")
            .required("Påkrævet!"),
        discount: number("Rabat")
            .min(0, "Rabat skal være større end 0")
            .max(100, "Rabat skal være mindre end 100")
            .required("Påkrævet!"),
    });

    const Input = ({ field }) => (
        <label className="p-2 grid gap-2 relative pb-6">
            {field.placeholder}
            <Field
                className="border p-2 rounded-2xl"
                placeholder={field.placeholder}
                label={field.placeholder}
                name={field.name}
                type={field.type}
            />
            <ErrorMessage
                component="div"
                name={field.name}
                className="text-red-500 absolute bottom-0 left-2 text-xs"
            />
        </label>
    );

    const InputFile = ({ field }) => (
        <label className="p-2 grid gap-2 relative pb-6">
            {field.placeholder}
            <Field name="image">
                {({ form }) => (
                    <input
                        name={field.name}
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            form.setFieldValue("file", file);
                        }}
                        className="border p-2 rounded-2xl"
                    />
                )}
            </Field>
            <ErrorMessage
                component="div"
                name={field.name}
                className="text-red-500 absolute bottom-0 left-2 text-xs"
            />
        </label>
    );

    const formData = [
        {
            _id: 1,
            render: (
                <Input
                    field={{
                        placeholder: "Title",
                        type: "text",
                        name: "title",
                    }}
                />
            ),
        },
        {
            _id: 2,
            render: (
                <Input
                    field={{
                        placeholder: "Price",
                        type: "text",
                        name: "price",
                    }}
                />
            ),
        },
        {
            _id: 3,
            render: (
                <Input
                    field={{
                        placeholder: "Discount",
                        type: "text",
                        name: "discount",
                    }}
                />
            ),
        },
        {
            _id: 4,
            render: (
                <InputFile
                    field={{
                        placeholder: "Image",
                        type: "file",
                        name: "image",
                    }}
                />
            ),
        },
    ];

    const onSubmit = (values, { resetForm }) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("price", values.price);
        formData.append("discount", values.discount);
        formData.append("file", values.file);
        id && formData.append("id", id);
        id
            ? mutationUpdateProduct.mutate(formData)
            : mutationAddProduct.mutate(formData);
        !id && resetForm();
    };

    return (
        <DataHandleLayout
            data={{
                data: data?.data,
                isLoading: data.isLoading,
                error: data.error,
            }}
            SkeletonCount={4}
            containerClassNameSkeleton="py-5"
            emptyText="Ingen data"
            className="py-5">
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={onSubmit}>
                {({ isValid }) => (
                    <>
                        <Form className="flex flex-col gap-2">
                            {formData.map((field) => (
                                <div key={field._id}> {field.render} </div>
                            ))}

                            <button
                                aria-label="add product"
                                title="add product"
                                type="submit"
                                disabled={
                                    mutationAddProduct.isPending || !isValid
                                }
                                className="btn-green px-16 py-4 justify-self-center disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2">
                                {id ? "Update product" : "Add product"}
                                {mutationAddProduct.isPending && (
                                    <Loader className="w-4 h-4" />
                                )}
                            </button>
                        </Form>
                    </>
                )}
            </Formik>
        </DataHandleLayout>
    );
};

export default ProductForm;
