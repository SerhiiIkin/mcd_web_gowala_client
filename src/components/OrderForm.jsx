import useOrderForm from "@hooks/useOrderForm";
import Loader from "@components/Loader";

const OrderForm = () => {
    const { formik, mutationAddOrder } = useOrderForm();

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="grid gap-2 p-2 bg-secondary">
            <label className="relative pb-7">
                <input
                    type="text"
                    placeholder="Din email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="email"
                    className="bg-white  py-2 px-5 border placeholder:text-xl placeholder:text-black placeholder:font-display w-full"
                />
                {formik.touched.email && formik.errors.email && (
                    <span className="text-red-600 text-sm absolute bottom-0 left-2 ">
                        {formik.errors.email}
                    </span>
                )}
            </label>

            <button
                disabled={!formik.isValid}
                type="submit"
                className="btn-submit ">
                Afgiv ordre
                {mutationAddOrder.isPending && <Loader />}
            </button>
        </form>
    );
};

export default OrderForm;
