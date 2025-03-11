import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { object, string } from "yup";
import { axiosSendMessage } from "@utils/axios";
import { useState } from "react";
const useContactForm = () => {
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

    return { formik, formData, mutationSendMessage, name };
};

export default useContactForm;
