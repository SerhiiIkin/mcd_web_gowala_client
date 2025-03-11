import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { axiosSubscribe } from "@utils/axios";
import { object, string } from "yup";
import Loader from "@components/Loader";
import ModalLayout from "@layouts/ModalLayout";
import Title from "@components/Title";
import useModal from "@hooks/useModal";
import { useState } from "react";

const NewsletterForm = () => {
    const [email, setEmail] = useState("");
    const modalProps = useModal();
    const mutationSubscribe = useMutation({
        mutationFn: axiosSubscribe,
        onSuccess: (data) => {
            if (!data.data.email) return;
            setEmail(data.data.email);
            modalProps.changeModalState();
            formik.resetForm();
        },
    });

    const initialValues = {
        email: "",
    };

    const onSubmit = (values) => {
        mutationSubscribe.mutate(values.email);
    };

    const validationSchema = object({
        email: string().email("Ugyldig e-mail!").required("Påkrævet!"),
    });

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });

    return (
        <>
            <ModalLayout {...modalProps}>
                <div className="grid gap-2 py-8 px-2 text-center bg-secondary min-w-3/4">
                    <Title type="h3" className="break-words">
                        Du har nu tilmeldt dit nyhedsbrev til email : <span className="text-primary">{email}</span>
                    </Title>
                </div>
            </ModalLayout>
            <form onSubmit={formik.handleSubmit} className="grid gap-2">
                <label className="relative pb-6 grid">
                    <input
                        type="text"
                        placeholder="Din email"
                        className="bg-white  py-4 px-3"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="absolute bottom-0 left-0 text-red-600">
                            {formik.errors.email}
                        </div>
                    )}
                </label>
                <button
                    type="submit"
                    disabled={!formik.isValid || mutationSubscribe.isPending}
                    className="btn-submit">
                    Tilmeld
                    {mutationSubscribe.isPending && <Loader />}
                </button>
            </form>
        </>
    );
};

export default NewsletterForm;
