import Title from "@/components/Title";
import SectionLayout from "@/layouts/SectionLayout";

import Loader from "@components/Loader";
import Modal from "@components/Modal";

import useModal from "@hooks/useModal";
import useContactForm from "@hooks/useContactForm";

const ContactForm = () => {
    const { changeModalState, backdropRef, contentModalRef } = useModal();
    const { name, formData, formik, mutationSendMessage } = useContactForm();

    const modalProps = {
        text: ` Tak for din besked , ${name}`,
        title: "Din besked er sendt",
        changeModalState,
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
