import BasketIco from "@components/BasketIco";
import Title from "@components/Title";
import { useLocalStorage } from "@uidotdev/usehooks";
import { toast } from "react-toastify";

const Product = ({ product, slider }) => {
    const [items, saveItems] = useLocalStorage("items", []);

    const addToBasket = () => {
        const productExists = items.find((p) => p.product === product._id);
        if (productExists) {
            toast.info("Produktet findes allerede", `${product.title}`);
            return;
        }

        toast.success(`Produkt tilføjet til kurv: ${product.title}`);
        saveItems([...items, { product: product._id, quantity: 1 }]);
    };

    return (
        <article aria-label="Produkt" className="shadow-md py-2  grid gap-10">
            <div
                aria-label="product container"
                className="bg-secondary pt-11 px-18 pb-4 grid gap-5 justify-items-center relative">
                {product.discount > 0 && (
                    <div className="absolute top-2 right-2 btn-green px-3">
                        {product.discount}%
                    </div>
                )}
                <img src={product.image} alt="product img" />
                <Title type="h4" className="font-semibold">
                    {product.title}
                </Title>
                <Title type="h3" className="font-semibold text-primary">
                    {product.price},-
                </Title>
                {!slider && (
                    <button
                        onClick={addToBasket}
                        className="btn-green py-4 px-9 flex gap-2 items-center min-w-max group">
                        <BasketIco className="fill-white xl:group-hover:fill-primary xl:group-hover:duration-700 " />
                        Tilføj til kurv
                    </button>
                )}
            </div>
        </article>
    );
};

export default Product;