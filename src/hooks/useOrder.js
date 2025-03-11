import { useLocalStorage } from "@uidotdev/usehooks";
const useOrder = (changeModalState) => {
    const [items, saveItems] = useLocalStorage("items", []);

    const changeQuantity = (event, item) => {
        const buttonContent = event.target.textContent;
        if (item.quantity === 1 && buttonContent === "-") {
            openCheckModal();
            return;
        }

        saveItems(
            items.map((i) =>
                i.product === item.product
                    ? {
                          ...i,
                          quantity:
                              buttonContent === "+"
                                  ? i.quantity + 1
                                  : i.quantity - 1,
                      }
                    : i
            )
        );
    };

    const openCheckModal = () => {
        changeModalState();
    };

    const checkModal = ({ state, item }) => {
        changeModalState();
        if (state) {
            saveItems(items.filter((i) => i.product !== item.product));
        }
    };

    return { changeQuantity, openCheckModal, checkModal };
};

export default useOrder;
