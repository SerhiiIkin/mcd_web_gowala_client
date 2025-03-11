import useOrder from "@hooks/useOrder";
import useModal from "@hooks/useModal";
import ModalLayout from "@layouts/ModalLayout";
import Title from "@components/Title";

const CloseSvg = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none">
            <g clipPath="url(#clip0_108_1018)">
                <path
                    d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM17 15.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59Z"
                    fill="#5E9A13"
                />
            </g>
            <defs>
                <clipPath id="clip0_108_1018">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};
const Order = ({ item }) => {
    const { changeModalState, backdropRef, contentModalRef } = useModal();
    const { changeQuantity, openCheckModal, checkModal } =
        useOrder(changeModalState);
    const modalProps = {
        changeModalState,
        backdropRef,
        contentModalRef,
    };

    return (
        <>
            <button onClick={changeModalState} type="button">
                open modal
            </button>
            <ModalLayout {...modalProps}>
                <div className="grid gap-2 py-8 px-2 text-center bg-secondary min-w-3/4">
                    <Title type="h3" className="break-words">
                        Er du sikker at du vil slette produktet ?
                    </Title>
                    <div className="flex gap-4 justify-self-center">
                        <button
                            className="btn-submit py-2 px-4 rounded"
                            onClick={() => checkModal({ state: true, item })}>
                            Ja
                        </button>
                        <button
                            className="bg-red-500 xl:hover:outline xl:hover:outline-red-500 xl:hover:bg-white xl:hover:text-red-500 xl:duration-700 text-white py-2 px-4 rounded"
                            onClick={() => checkModal({ state: false })}>
                            Nej
                        </button>
                    </div>
                </div>
            </ModalLayout>
            <div
                key={item.title}
                className="grid bg-white p-2 gap-2  min-w-64 w-full">
                {item.image && (
                    <img
                        src={item.image}
                        alt="product img"
                        className="max-w-14 lg:max-w-28 aspect-square object-cover row-span-3 w-full"
                    />
                )}
                <div className="font-medium col-start-2 text-left">
                    {item.title}
                    <p className="text-primary">{item.price},-</p>
                </div>

                <button
                    className="col-start-3 justify-self-end  self-start"
                    onClick={openCheckModal}>
                    <CloseSvg />
                </button>
                <div className="flex gap-2 items-center p-1 ">
                    <button
                        onClick={(event) => changeQuantity(event, item)}
                        className="bg-primary text-white w-6 aspect-square rounded-full">
                        -
                    </button>
                    <p>{item.quantity}</p>
                    <button
                        onClick={(event) => changeQuantity(event, item)}
                        className="bg-primary text-white w-6 aspect-square rounded-full">
                        +
                    </button>
                </div>
                <div className="row-start-3 col-start-3 justify-self-end flex gap-2 ">
                    <span className="text-primary">Total </span>
                    {item.price * item.quantity} ,-
                </div>
            </div>
        </>
    );
};

export default Order;
