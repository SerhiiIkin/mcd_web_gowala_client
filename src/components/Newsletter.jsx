import SectionLayout from "@layouts/SectionLayout";
import Title from "@components/Title";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { axiosSubscribe } from "@utils/axios";
import { object, string } from "yup";
import Loader from "@components/Loader";
import { useState } from "react";
import Modal from "@components/Modal";

const Form = () => {
    const [email, setEmail] = useState("");
    const [modalState, setModalState] = useState(false);

    const mutationSubscribe = useMutation({
        mutationFn: axiosSubscribe,
        onSuccess: (data) => {
            if (!data.data.email) return;
            setModalState(true);
            setEmail(data.data.email);
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
            <Modal
                email={email}
                modalState={modalState}
                setModalState={setModalState}
            />
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

const Newsletter = () => {
    return (
        <SectionLayout>
            <div className="bg-[url(blob_01.jpg)] bg-cover bg-center p-6 ">
                <div
                    aria-label="content"
                    className="bg-secondary pt-14 pb-8 px-9 text-center mb-4">
                    <Title type="h3" className="font-bold ">
                        Nyhedsbrev
                    </Title>
                    <Title type="h3" className="text-primary pb-12">
                        Få nyhederne fra gården på din mail.
                    </Title>
                    <p>
                        Tilmeld dig vores nyhedsbrev - så kan du altid følge med
                        i, hvad der sker på farmen.
                    </p>
                </div>
                <Form />
            </div>
        </SectionLayout>
    );
};

export default Newsletter;
