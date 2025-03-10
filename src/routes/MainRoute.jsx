import { RouterProvider, createBrowserRouter } from "react-router";
import Home from "@/pages/Home";
import About from "@pages/About";
import Checkout from "@pages/Checkout";
import Contact from "@pages/Contact";
import Services from "@pages/Services";
import Shop from "@pages/Shop";
import Backoffice from "@pages/backoffice/Backoffice";
import MainLayout from "@layouts/MainLayout";
import BackofficeLayout from "@layouts/BackofficeLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Products from "@/pages/backoffice/Products";
import ProductForm from "@/pages/backoffice/components/ProductForm";

const MainRoute = () => {
    const queryClient = new QueryClient();
    const routes = [
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "about",
                    element: <About />,
                },
                {
                    path: "checkout",
                    element: <Checkout />,
                },
                {
                    path: "contact",
                    element: <Contact />,
                },
                {
                    path: "services",
                    element: <Services />,
                },
                {
                    path: "shop",
                    element: <Shop />,
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
            ],
        },
    ];

    const router = createBrowserRouter(routes, {
        future: { v7_startTransition: true, v7_relativeSplatPath: true },
    });

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
};

export default MainRoute;
