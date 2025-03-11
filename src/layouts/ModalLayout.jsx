const ModalLayout = ({
    changeModalState,
    children,
    backdropRef,
    contentModalRef,
}) => {
    return (
        <div
            ref={contentModalRef}
            className="fixed inset-0 z-40 place-items-center hidden">
            {children}
            <div
                ref={backdropRef}
                title="close modal"
                onClick={changeModalState}
                className="absolute inset-0 grid -z-10 bg-[url(blob_01.jpg)] bg-cover bg-center cursor-pointer opacity-0"></div>
        </div>
    );
};

export default ModalLayout;
