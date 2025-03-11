import Title from "@components/Title";

const Modal = ({
    email,
    modalState,
    setModalState,
    text,
    title,
    backdropRef,
    contentModalRef,
}) => {
    return (
        <div
            ref={contentModalRef}
            className="fixed inset-0 z-40 place-items-center hidden">
            <div className="grid gap-2 py-8 px-2 text-center bg-secondary min-w-3/4">
                <Title type="h3" className="break-words">
                    {title} <span className="text-primary">{email}</span>
                </Title>
                <p className="text-primary">{text}</p>
            </div>
            <div
                ref={backdropRef}
                title="close modal"
                onClick={() => setModalState(false)}
                className="absolute inset-0 grid -z-10 bg-[url(blob_01.jpg)] bg-cover bg-center cursor-pointer opacity-0"></div>
        </div>
    );
};

export default Modal;
