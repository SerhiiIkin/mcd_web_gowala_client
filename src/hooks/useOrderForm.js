import { useFormik } from "formik";
import { object, string } from "yup";
import { toast } from "react-toastify";
import { axiosAddOrder  } from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";

const useOrderForm = () => {

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

    return {formik, mutationAddOrder}
};

export default useOrderForm;