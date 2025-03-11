import Title from "@/components/Title";
import SectionLayout from "@/layouts/SectionLayout";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { object, string } from "yup";
import { axiosSendMessage } from "@utils/axios";
import Loader from "@components/Loader";
import Modal from "./Modal";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ContactForm = () => {
    const [name, setName] = useState("");
    const mutationSendMessage = useMutation({
        mutationFn: axiosSendMessage,
        onSuccess: () => {
            changeModalState();
            formik.resetForm();
        },
    });

    const formData = [
        {
            _id: 1,
            inputFieldType: "input",
            type: "text",
            placeholder: "Dit navn",
            name: "name",
        },
        {
            _id: 2,
            inputFieldType: "input",
            placeholder: "Din email",
            type: "text",
            name: "email",
        },
        {
            _id: 3,
            inputFieldType: "textarea",
            placeholder: "Din besked",
            rows: 5,
            name: "description",
        },
    ];

    const initialValues = {
        name: "",
        email: "",
        description: "",
    };

    const onSubmit = (values) => {
        mutationSendMessage.mutate(values);
        setName(values.name);
    };

    const validationSchema = object({
        name: string()
            .min(1, "Navn skal have mindst 1 karakter")
            .required("Påkrævet!"),
        email: string()
            .min(1, "Email skal have mindst 1 karakter")
            .email("Ugyldig e-mail!")
            .required("Påkrævet!"),
        description: string()
            .min(1, "Besked skal have mindst 1 karakter")
            .required("Påkrævet!"),
    });

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });

    const backdropRef = useRef(null);
    const contentModalRef = useRef(null);
    const { contextSafe } = useGSAP({ scope: contentModalRef });

    const [modalState, setModalState] = useState(false);

    const changeModalState = contextSafe(() => {
        setModalState((prev) => !prev);
        const duration = 0.8;

        if (modalState) {
            gsap.to(backdropRef.current, {
                opacity: 0,
                duration,
            });
            gsap.to(contentModalRef.current, {
                opacity: 0,
                duration,
                display: "none",
            });
        } else {
            gsap.to(backdropRef.current, {
                opacity: 1,
                duration,
            });
            gsap.to(contentModalRef.current, {
                opacity: 1,
                duration,
                display: "grid",
            });
        }
    });

    const modalProps = {
        text: ` Tak for din besked , ${name}`,
        title: "Din besked er sendt",
        modalState,
        setModalState: changeModalState,
        backdropRef,
        contentModalRef,
    };

    return (
        <>
            <Modal {...modalProps} />
            <SectionLayout classNameContainer="bg-secondary py-4">
                <form
                    onSubmit={formik.handleSubmit}
                    className="grid gap-2 p-2 max-w-xs m-auto">
                    <Title type="h4" className="text-center">
                        Send en besked til os
                    </Title>
                    {formData.map((item) => (
                        <label key={item._id} className="relative pb-7">
                            <item.inputFieldType
                                id={item._id}
                                type={item.type}
                                placeholder={item.placeholder}
                                rows={item.rows}
                                value={formik.values[item.name]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name={item.name}
                                className="bg-white  py-2 px-5 rounded-xl placeholder:text-xl placeholder:text-black placeholder:font-display w-full"
                            />
                            {formik.touched[item.name] &&
                                formik.errors[item.name] && (
                                    <span className="text-red-600 text-sm absolute bottom-0 left-2 ">
                                        {formik.errors[item.name]}
                                    </span>
                                )}
                        </label>
                    ))}

                    <button
                        disabled={
                            !formik.isValid || mutationSendMessage.isPending
                        }
                        type="submit"
                        className="btn-submit ">
                        Send besked
                        {mutationSendMessage.isPending && <Loader />}
                    </button>
                </form>
            </SectionLayout>
        </>
    );
};

export default ContactForm;
