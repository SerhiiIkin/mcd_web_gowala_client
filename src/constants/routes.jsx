import Home from "@pages/Home";
import About from "@pages/About";
import Checkout from "@pages/Checkout";
import Contact from "@pages/Contact";
import Services from "@pages/Services";
import Shop from "@pages/Shop";
import Backoffice from "@pages/backoffice/Backoffice";
import MainLayout from "@layouts/MainLayout";
import BackofficeLayout from "@layouts/BackofficeLayout";
import Products from "@pages/backoffice/Products";
import ProductForm from "@pages/backoffice/components/ProductForm";
import Messages from "@pages/backoffice/Messages";

export const routes = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "shop",
                element: <Shop />,
                name:"Shop"
            },
            {
                path: "services",
                element: <Services />,
                name:"Services"
            },
            {
                path: "about",
                element: <About />,
                name:"Om"
            },
            {
                path: "contact",
                element: <Contact />,
                name:"Kontakt"
            },
            {
                path: "checkout",
                element: <Checkout />,
                name:"Checkout"
            },
        ],
    },

    {
        path: "backoffice",
        element: <BackofficeLayout />,
        children: [
            {
                path: "",
                element: <Backoffice />,
            },
            {
                path: "products",
                element: <Products />,
            },
            {
                path: "products/:id",
                element: <ProductForm />,
            },
            {
                path: "messages",
                element: <Messages />,
            },
        ],
    },
];
