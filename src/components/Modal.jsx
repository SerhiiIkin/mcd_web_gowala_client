import Title from "@components/Title";

const Modal = ({ email, modalState, setModalState }) => {
    return (
        <>
            {modalState && (
                <div className="fixed inset-0 z-40 grid place-items-center">
                    <div className="grid gap-2 py-8 px-2 text-center bg-secondary min-w-3/4">
                        <Title type="h3" className="break-words">
                            Tak <span className="text-primary">{email}</span>
                        </Title>
                        <p className="text-primary">
                            Du har nu tilmeldt dit nyhedsbrev.
                        </p>
                    </div>
                    <form
                        onClick={() => setModalState(false)}
                        className="absolute inset-0 grid -z-10 bg-[url(blob_01.jpg)] bg-cover bg-center cursor-pointer"></form>
                </div>
            )}
        </>
    );
};

export default Modal;
